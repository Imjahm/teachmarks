import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  subject: string
  topic: string
  gradeLevel: number
  promptType: 'lesson' | 'examples' | 'assessment'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { subject, topic, gradeLevel, promptType }: RequestBody = await req.json()
    console.log(`Generating ${promptType} content for ${subject} - ${topic} (Grade ${gradeLevel})`)

    let systemPrompt = 'You are an experienced educator creating curriculum-aligned educational content.'
    let userPrompt = ''

    switch (promptType) {
      case 'lesson':
        userPrompt = `Create a detailed lesson plan for teaching ${topic} in ${subject} for grade ${gradeLevel} students. Include:
          1. Learning objectives
          2. Required materials
          3. Step-by-step teaching activities
          4. Assessment methods
          5. Differentiation strategies`
        break
      case 'examples':
        userPrompt = `Provide 3-5 engaging real-world examples and applications of ${topic} in ${subject} suitable for grade ${gradeLevel} students. For each example:
          1. Describe the real-world scenario
          2. Explain how it connects to ${topic}
          3. Include discussion questions
          4. Suggest related activities`
        break
      case 'assessment':
        userPrompt = `Create a varied assessment package for ${topic} in ${subject} suitable for grade ${gradeLevel} students. Include:
          1. Multiple choice questions
          2. Short answer questions
          3. Application problems
          4. Higher-order thinking questions
          5. Rubric for evaluation`
        break
      default:
        throw new Error('Invalid prompt type')
    }

    console.log('Sending request to OpenAI')
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
        max_tokens: 1500,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      throw new Error(error.error?.message || 'Failed to generate content')
    }

    const data = await response.json()
    console.log('Content generated successfully')

    return new Response(
      JSON.stringify({ content: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-educational-content:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Please try again or contact support if the issue persists'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})