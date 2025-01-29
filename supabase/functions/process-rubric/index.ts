import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { content } = await req.json()
    
    // Return mock processed content
    const mockProcessedContent = {
      grade_boundaries: {
        "A*": 90,
        "A": 80,
        "B": 70,
        "C": 60,
        "D": 50,
        "E": 40,
        "F": 30
      },
      criteria: [
        "Understanding of key concepts",
        "Application of knowledge",
        "Analysis and evaluation",
        "Communication and presentation"
      ]
    }

    return new Response(
      JSON.stringify(mockProcessedContent),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing content:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})