// AI Integration Layer for StudyGenie
// Supports OpenAI GPT-4, Claude, and fallback models

interface AIConfig {
  provider: 'openai' | 'anthropic';
  model: string;
  apiKey: string;
  maxTokens?: number;
  temperature?: number;
}

interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  tokensUsed: number;
  model: string;
  finishReason: string;
}

// Default configuration
const defaultConfig: AIConfig = {
  provider: 'openai',
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY || '',
  maxTokens: 2000,
  temperature: 0.7,
};

/**
 * Generate AI completion
 * In production, this connects to actual AI providers
 */
export async function generateCompletion(
  messages: AIMessage[],
  config: Partial<AIConfig> = {}
): Promise<AIResponse> {
  const finalConfig = { ...defaultConfig, ...config };

  if (finalConfig.provider === 'openai') {
    return callOpenAI(messages, finalConfig);
  } else if (finalConfig.provider === 'anthropic') {
    return callAnthropic(messages, finalConfig);
  }

  throw new Error(`Unknown AI provider: ${finalConfig.provider}`);
}

async function callOpenAI(messages: AIMessage[], config: AIConfig): Promise<AIResponse> {
  // In production:
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${config.apiKey}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     model: config.model,
  //     messages,
  //     max_tokens: config.maxTokens,
  //     temperature: config.temperature,
  //   }),
  // });
  // const data = await response.json();
  // return {
  //   content: data.choices[0].message.content,
  //   tokensUsed: data.usage.total_tokens,
  //   model: data.model,
  //   finishReason: data.choices[0].finish_reason,
  // };

  return {
    content: 'AI response placeholder - connect OpenAI API key in production',
    tokensUsed: 0,
    model: config.model,
    finishReason: 'stop',
  };
}

async function callAnthropic(messages: AIMessage[], config: AIConfig): Promise<AIResponse> {
  // In production:
  // const response = await fetch('https://api.anthropic.com/v1/messages', {
  //   method: 'POST',
  //   headers: {
  //     'x-api-key': config.apiKey,
  //     'Content-Type': 'application/json',
  //     'anthropic-version': '2023-06-01',
  //   },
  //   body: JSON.stringify({
  //     model: config.model,
  //     max_tokens: config.maxTokens,
  //     messages: messages.filter(m => m.role !== 'system'),
  //     system: messages.find(m => m.role === 'system')?.content,
  //   }),
  // });
  // const data = await response.json();

  return {
    content: 'AI response placeholder - connect Anthropic API key in production',
    tokensUsed: 0,
    model: config.model,
    finishReason: 'end_turn',
  };
}

/**
 * Helper: Generate notes simplification
 */
export async function simplifyNotes(
  content: string,
  format: string,
  language: string
): Promise<string> {
  const systemPrompt = getNotesSystemPrompt(format, language);
  const response = await generateCompletion([
    { role: 'system', content: systemPrompt },
    { role: 'user', content },
  ]);
  return response.content;
}

/**
 * Helper: Generate assignment
 */
export async function generateAssignment(params: {
  topic: string;
  subject: string;
  wordCount: number;
  tone: string;
  level: string;
}): Promise<string> {
  const response = await generateCompletion([
    { role: 'system', content: `You are an expert academic writer. Write naturally and include proper formatting.` },
    { role: 'user', content: `Write a ${params.wordCount}-word ${params.tone} assignment on "${params.topic}" for ${params.level} level in ${params.subject}.` },
  ], { maxTokens: params.wordCount * 2 });
  return response.content;
}

/**
 * Helper: Chat with AI tutor
 */
export async function chatWithTutor(
  message: string,
  history: AIMessage[],
  language: string
): Promise<string> {
  const systemMessage: AIMessage = {
    role: 'system',
    content: `You are StudyGenie AI Tutor - a friendly, patient study companion. Explain concepts clearly with examples. Respond in ${language}. Use markdown formatting.`,
  };
  
  const response = await generateCompletion([
    systemMessage,
    ...history.slice(-10),
    { role: 'user', content: message },
  ]);
  return response.content;
}

function getNotesSystemPrompt(format: string, language: string): string {
  const formats: Record<string, string> = {
    summary: 'Create a concise bullet-point summary. Focus on main ideas.',
    keypoints: 'Extract the 5-10 most important key points. Number each one.',
    flashcards: 'Create Q&A flashcards for study. Format: **Q:** question **A:** answer',
    eli10: 'Explain like teaching a 10-year-old. Use simple words and fun analogies.',
    quiz: 'Create a 5-question multiple choice quiz. Mark correct answers with ✅',
    formulas: 'Extract all formulas, equations, and key numerical values.',
  };

  const languages: Record<string, string> = {
    en: 'Respond in English.',
    hi: 'Respond in Hindi.',
    hinglish: 'Respond in Hinglish (Hindi-English mix in Roman script).',
  };

  return `${formats[format] || formats.summary} ${languages[language] || languages.en}`;
}
