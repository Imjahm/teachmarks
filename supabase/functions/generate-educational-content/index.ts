import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1"

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

    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    let systemPrompt = 'You are an experienced teacher creating educational content.'
    let userPrompt = ''

    switch (promptType) {
      case 'lesson':
        userPrompt = `Create a detailed lesson plan for teaching ${topic} in ${subject} for grade ${gradeLevel} students. Include learning objectives, activities, and assessment methods.`
        break
      case 'examples':
        userPrompt = `Provide engaging real-world examples and applications of ${topic} in ${subject} suitable for grade ${gradeLevel} students.`
        break
      case 'assessment':
        userPrompt = `Create varied assessment questions for ${topic} in ${subject} suitable for grade ${gradeLevel} students. Include both theoretical understanding and practical application questions.`
        break
      default:
        userPrompt = `Generate educational content about ${topic} in ${subject} for grade ${gradeLevel} students.`
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    return new Response(
      JSON.stringify({ content: completion.data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})