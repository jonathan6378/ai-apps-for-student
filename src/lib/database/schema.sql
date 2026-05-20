-- StudyGenie Database Schema
-- Database: PostgreSQL (via Supabase)
-- Created for AI-powered student productivity platform

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  education_level VARCHAR(100),
  preferred_language VARCHAR(20) DEFAULT 'en',
  plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'team')),
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- GAMIFICATION
-- ============================================

CREATE TABLE user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active_date DATE,
  total_notes INTEGER DEFAULT 0,
  total_assignments INTEGER DEFAULT 0,
  total_study_hours DECIMAL(10,2) DEFAULT 0,
  total_quizzes INTEGER DEFAULT 0,
  total_chat_messages INTEGER DEFAULT 0,
  total_pomodoro_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_key VARCHAR(100) NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_key)
);

CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  xp_earned INTEGER DEFAULT 0,
  rank INTEGER,
  UNIQUE(user_id, week_start)
);

-- ============================================
-- NOTES
-- ============================================

CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500),
  original_content TEXT NOT NULL,
  simplified_content TEXT,
  output_format VARCHAR(50) NOT NULL,
  language VARCHAR(20) DEFAULT 'en',
  subject VARCHAR(100),
  source_type VARCHAR(20) DEFAULT 'paste' CHECK (source_type IN ('paste', 'pdf', 'image', 'ocr')),
  file_url TEXT,
  tokens_used INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty VARCHAR(20) DEFAULT 'medium',
  times_reviewed INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  next_review_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ASSIGNMENTS
-- ============================================

CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic VARCHAR(500) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  education_level VARCHAR(100),
  word_count INTEGER,
  tone VARCHAR(50),
  generated_content TEXT,
  citations TEXT[],
  options JSONB DEFAULT '{}',
  tokens_used INTEGER DEFAULT 0,
  plagiarism_score DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STUDY PLANNER
-- ============================================

CREATE TABLE study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  exam_date DATE,
  subjects TEXT[] NOT NULL,
  weak_topics TEXT[],
  available_hours DECIMAL(4,2),
  preferences JSONB DEFAULT '{}',
  generated_plan JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE study_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES study_plans(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  subject VARCHAR(100),
  duration INTEGER NOT NULL, -- minutes
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  scheduled_date DATE,
  scheduled_time TIME,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE pomodoro_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES study_tasks(id) ON DELETE SET NULL,
  duration INTEGER NOT NULL, -- seconds
  type VARCHAR(20) DEFAULT 'work' CHECK (type IN ('work', 'break', 'long_break')),
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- AI CHAT
-- ============================================

CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  subject VARCHAR(100),
  language VARCHAR(20) DEFAULT 'en',
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PAYMENTS & SUBSCRIPTIONS
-- ============================================

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255),
  plan VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  feature VARCHAR(50) NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- REFERRALS
-- ============================================

CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES users(id) ON DELETE SET NULL,
  referral_code VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'signed_up', 'converted')),
  reward_given BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_created_at ON notes(created_at DESC);
CREATE INDEX idx_assignments_user_id ON assignments(user_id);
CREATE INDEX idx_study_tasks_user_date ON study_tasks(user_id, scheduled_date);
CREATE INDEX idx_study_tasks_plan ON study_tasks(plan_id);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_usage_logs_user_date ON usage_logs(user_id, date);
CREATE INDEX idx_leaderboard_week ON leaderboard(week_start, xp_earned DESC);
CREATE INDEX idx_user_stats_streak ON user_stats(streak DESC);

-- ============================================
-- ROW LEVEL SECURITY (Supabase)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own stats" ON user_stats FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own notes" ON notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own assignments" ON assignments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own plans" ON study_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own tasks" ON study_tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own chats" ON chat_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own messages" ON chat_messages FOR ALL USING (auth.uid() = user_id);
