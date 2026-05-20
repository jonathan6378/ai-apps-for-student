import { NextRequest, NextResponse } from 'next/server';

interface AssignmentRequest {
  topic: string;
  subject: string;
  educationLevel: string;
  wordCount: number;
  tone: string;
  additionalInstructions?: string;
  options: {
    citations: boolean;
    humanizer: boolean;
    tables: boolean;
    diagrams: boolean;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: AssignmentRequest = await request.json();
    const { topic, subject, educationLevel, wordCount, tone, additionalInstructions, options } = body;

    if (!topic || !subject || !educationLevel) {
      return NextResponse.json(
        { error: 'Topic, subject, and education level are required' },
        { status: 400 }
      );
    }

    if (wordCount > 5000) {
      return NextResponse.json(
        { error: 'Maximum word count is 5000' },
        { status: 400 }
      );
    }

    // Build AI prompt
    const prompt = `Write a ${wordCount}-word assignment on the topic: "${topic}"
    
Subject: ${subject}
Education Level: ${educationLevel}
Writing Tone: ${tone}
${options.citations ? 'Include proper academic citations (APA format).' : ''}
${options.tables ? 'Include relevant tables where appropriate.' : ''}
${additionalInstructions ? `Additional instructions: ${additionalInstructions}` : ''}

Requirements:
- Write in a natural, human-like style
- Include proper headings and subheadings
- Structure with introduction, body, and conclusion
- ${options.humanizer ? 'Vary sentence length and structure to appear human-written' : ''}
`;

    // In production, call AI API:
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //   messages: [
    //     { role: 'system', content: 'You are an expert academic writer...' },
    //     { role: 'user', content: prompt }
    //   ],
    //   max_tokens: wordCount * 2,
    //   temperature: 0.8,
    // });

    const mockResult = `Generated assignment on "${topic}" (${wordCount} words)`;

    return NextResponse.json({
      success: true,
      result: mockResult,
      metadata: {
        topic,
        subject,
        wordCount,
        tone,
        citationsIncluded: options.citations,
        tokensUsed: wordCount * 2,
        processingTime: '3.5s',
        plagiarismScore: '2%',
      },
    });
  } catch (error) {
    console.error('Assignment generate error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
