import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const routePath = formData.get('routePath') as string

    if (!file) {
      throw new Error('No file uploaded')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const filePath = `${crypto.randomUUID()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    // Get file URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('images')
      .getPublicUrl(filePath)

    // Use OpenAI's GPT-4 Vision to extract text from image
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Please extract and return all the text you can see in this image." },
            { type: "image_url", image_url: publicUrl }
          ]
        }
      ],
      max_tokens: 500
    })

    const extractedText = response.data.choices[0]?.message?.content || ''

    // Save result to database
    const { error: dbError } = await supabaseClient
      .from('ocr_results')
      .insert({
        file_name: file.name,
        file_path: filePath,
        extracted_text: extractedText,
        status: 'completed',
        route_path: routePath,
        teacher_id: (await supabaseClient.auth.getUser()).data.user?.id
      })

    if (dbError) {
      throw dbError
    }

    return new Response(
      JSON.stringify({ success: true, extractedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error processing OCR:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})