import { NextRequest, NextResponse } from 'next/server';

interface ChatRequest {
  message: string;
  language: 'en' | 'hi' | 'hinglish';
  context?: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, language, context, history = [] } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const languageInstructions: Record<string, string> = {
      en: 'Respond in clear English.',
      hi: 'Respond in Hindi (Devanagari script).',
      hinglish: 'Respond in Hinglish (mix of Hindi and English, using Roman script).',
    };

    const systemPrompt = `You are StudyGenie AI Tutor - a friendly, knowledgeable study assistant for students.

Your traits:
- Patient and encouraging
- Explain concepts step by step
- Use analogies and real-world examples
- Adapt explanations to the student's level
- Provide practice problems when relevant
- ${languageInstructions[language]}

${context ? `Current study context: ${context}` : ''}

Guidelines:
- Keep responses concise but thorough
- Use markdown formatting for better readability
- Include relevant formulas using plain text notation
- Offer to explain further or provide practice questions
- Be motivating and positive`;

    // In production:
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //   messages: [
    //     { role: 'system', content: systemPrompt },
    //     ...history.slice(-10),
    //     { role: 'user', content: message }
    //   ],
    //   max_tokens: 1500,
    //   temperature: 0.7,
    //   stream: true, // Enable streaming for real-time responses
    // });

    const mockResponse = `I'd be happy to help you with that! Let me explain step by step...`;

    return NextResponse.json({
      success: true,
      response: mockResponse,
      metadata: {
        tokensUsed: message.length + mockResponse.length,
        model: 'gpt-4',
        language,
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
