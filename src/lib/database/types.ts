// Database types for StudyGenie
// Auto-generated from schema - keep in sync with schema.sql

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  education_level?: string;
  preferred_language: 'en' | 'hi' | 'hinglish';
  plan: 'free' | 'pro' | 'team';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  xp: number;
  level: number;
  streak: number;
  longest_streak: number;
  last_active_date: string;
  total_notes: number;
  total_assignments: number;
  total_study_hours: number;
  total_quizzes: number;
  total_chat_messages: number;
  total_pomodoro_sessions: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_key: string;
  unlocked_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  title?: string;
  original_content: string;
  simplified_content?: string;
  output_format: 'summary' | 'keypoints' | 'flashcards' | 'eli10' | 'quiz' | 'formulas';
  language: 'en' | 'hi' | 'hinglish';
  subject?: string;
  source_type: 'paste' | 'pdf' | 'image' | 'ocr';
  file_url?: string;
  tokens_used: number;
  is_favorite: boolean;
  created_at: string;
}

export interface Flashcard {
  id: string;
  note_id: string;
  user_id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  times_reviewed: number;
  last_reviewed_at?: string;
  next_review_at?: string;
  created_at: string;
}

export interface Assignment {
  id: string;
  user_id: string;
  topic: string;
  subject: string;
  education_level?: string;
  word_count?: number;
  tone?: string;
  generated_content?: string;
  citations?: string[];
  options: {
    citations: boolean;
    humanizer: boolean;
    tables: boolean;
    diagrams: boolean;
  };
  tokens_used: number;
  plagiarism_score?: number;
  created_at: string;
}

export interface StudyPlan {
  id: string;
  user_id: string;
  title?: string;
  exam_date?: string;
  subjects: string[];
  weak_topics?: string[];
  available_hours?: number;
  preferences: {
    pomodoroLength: number;
    breakLength: number;
    preferredTime: 'morning' | 'afternoon' | 'evening' | 'night';
    daysPerWeek: number;
  };
  generated_plan?: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
}

export interface StudyTask {
  id: string;
  plan_id?: string;
  user_id: string;
  title: string;
  subject?: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
  scheduled_date?: string;
  scheduled_time?: string;
  completed: boolean;
  completed_at?: string;
  created_at: string;
}

export interface PomodoroSession {
  id: string;
  user_id: string;
  task_id?: string;
  duration: number;
  type: 'work' | 'break' | 'long_break';
  completed: boolean;
  started_at: string;
  ended_at?: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title?: string;
  subject?: string;
  language: 'en' | 'hi' | 'hinglish';
  message_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  user_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokens_used: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id?: string;
  plan: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  current_period_start?: string;
  current_period_end?: string;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id?: string;
  referral_code: string;
  status: 'pending' | 'signed_up' | 'converted';
  reward_given: boolean;
  created_at: string;
}
