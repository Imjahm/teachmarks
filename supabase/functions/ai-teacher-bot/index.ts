import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TeacherBotRequest {
  query: string
  context?: {
    subject?: string
    gradeLevel?: number
    previousInteractions?: Array<{
      query: string
      response: string
      feedback?: number
    }>
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query, context }: TeacherBotRequest = await req.json()
    console.log('Processing teacher bot request:', { query, context })

    let systemPrompt = 'You are an experienced teaching assistant helping teachers with their educational needs.'
    if (context?.subject) {
      systemPrompt += ` You specialize in ${context.subject}`
      if (context.gradeLevel) {
        systemPrompt += ` for grade ${context.gradeLevel}`
      }
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(context?.previousInteractions?.map(interaction => [
        { role: 'user', content: interaction.query },
        { role: 'assistant', content: interaction.response }
      ]).flat() || []),
      { role: 'user', content: query }
    ]

    console.log('Sending request to OpenAI with messages:', messages)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      throw new Error(error.error?.message || 'Failed to generate response')
    }

    const data = await response.json()
    console.log('Generated response successfully')

    return new Response(
      JSON.stringify({ response: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in ai-teacher-bot:', error)
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