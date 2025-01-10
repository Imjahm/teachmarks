import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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
    const { fileName, fileType, resourceType } = await req.json()

    const prompt = resourceType === 'teaching' 
      ? `Analyze this teaching resource: "${fileName}". Provide a JSON response with these fields:
         1. subject: The main subject area
         2. topic: Specific topic or unit
         3. keySkills: Array of key skills covered
         4. suggestedYearGroup: Recommended year group`
      : `Analyze this student work: "${fileName}". Provide a JSON response with these fields:
         1. suggestedGrade: Estimated grade level
         2. strengths: Array of key strengths
         3. areasForImprovement: Array of areas to improve
         4. feedbackSummary: Brief constructive feedback`;

    console.log('Sending prompt to OpenAI:', prompt)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an experienced teacher analyzing educational resources and student work.' },
          { role: 'user', content: prompt }
        ],
      }),
    })

    const data = await response.json()
    console.log('OpenAI API Response:', data)

    return new Response(
      JSON.stringify({ analysis: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing resource:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})