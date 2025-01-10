import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, topic, yearGroup, duration, type } = await req.json();

    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'lesson-plan') {
      systemPrompt = 'You are an experienced teacher who creates detailed lesson plans. Include clear learning objectives, activities, timings, resources needed, and assessment methods.';
      userPrompt = `Create a detailed lesson plan for ${subject} on the topic of ${topic} for ${yearGroup} students. The lesson duration is ${duration}.`;
    } else {
      systemPrompt = 'You are an experienced teacher who creates comprehensive schemes of work. Include unit objectives, progression of topics, assessment opportunities, and cross-curricular links.';
      userPrompt = `Create a detailed scheme of work for ${subject} focusing on ${topic} for ${yearGroup} students over ${duration}.`;
    }

    console.log('Generating content with prompt:', userPrompt);

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
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log('Generated content successfully');

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-lesson-plan function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});