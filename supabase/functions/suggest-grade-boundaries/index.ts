import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { examBoard, subject } = await req.json()

    const systemPrompt = `You are an expert in educational assessment frameworks. 
    Based on the exam board and subject provided, suggest appropriate grade boundaries.
    Format your response as a JSON object with grade letters as keys and minimum percentage scores as values.
    Include common grades like A*, A, B, C, D, E, and F.`

    const userPrompt = `Please suggest grade boundaries for ${examBoard} ${subject} that align with typical standards.
    Consider recent trends and maintain high academic standards while being fair to students.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get AI suggestions')
    }

    const data = await response.json()
    const suggestions = JSON.parse(data.choices[0].message.content)

    return new Response(
      JSON.stringify({ suggestions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in suggest-grade-boundaries:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})