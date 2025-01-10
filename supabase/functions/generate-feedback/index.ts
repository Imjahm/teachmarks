import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

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
    const { rubric, marks } = await req.json()
    
    const prompt = `As an experienced teacher, analyze this student's performance and provide constructive feedback.
    
    Rubric Details:
    Title: ${rubric.title}
    Total Marks: ${rubric.total_marks}
    Marks Achieved: ${marks}
    Criteria: ${JSON.stringify(rubric.criteria)}
    
    Please provide:
    1. Overall performance analysis
    2. Specific feedback for each criterion
    3. Suggestions for improvement
    
    Keep the feedback constructive, specific, and actionable.`

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
          { role: 'system', content: 'You are an experienced teacher providing detailed feedback on student work.' },
          { role: 'user', content: prompt }
        ],
      }),
    })

    const data = await response.json()
    console.log('OpenAI API Response:', data)

    return new Response(
      JSON.stringify({ feedback: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating feedback:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})