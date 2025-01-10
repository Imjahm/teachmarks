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
    const { subject, topic, gradeLevel, promptType } = await req.json()

    let systemPrompt = 'You are an experienced teacher creating educational content.'
    let userPrompt = ''

    switch (promptType) {
      case 'lesson':
        userPrompt = `Create a detailed lesson plan for teaching ${topic} in ${subject} for grade ${gradeLevel} students. Include real-world examples and practical applications.`
        break
      case 'examples':
        userPrompt = `Provide real-world examples and applications of ${topic} in ${subject} suitable for grade ${gradeLevel} students.`
        break
      case 'assessment':
        userPrompt = `Create assessment questions for ${topic} in ${subject} suitable for grade ${gradeLevel} students, including both theoretical and practical problems.`
        break
      default:
        userPrompt = `Generate educational content about ${topic} in ${subject} for grade ${gradeLevel} students.`
    }

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
      }),
    })

    const data = await response.json()
    console.log('OpenAI Response:', data)

    return new Response(
      JSON.stringify({ content: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating educational content:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})