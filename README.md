# StudyGenie - AI-Powered Student Productivity Platform

> Study Smarter with AI Superpowers. Simplify notes, generate assignments, plan study schedules, and ace your exams.

## Features

### AI Notes Simplifier
- Upload PDFs, images, or paste notes
- OCR for handwritten notes
- 6 output formats: Bullet Summary, Key Points, Flashcards, ELI10, Quiz, Formulas
- Multi-language: English, Hindi, Hinglish

### AI Assignment Writer
- Human-like assignment generation
- Auto citations & references
- Multiple writing tones
- Export to PDF/DOCX/PPT
- Plagiarism reduction

### AI Study Planner
- Smart personalized timetables
- Pomodoro timer with SVG animation
- Progress tracking & streaks
- Calendar schedule view
- Burnout prevention

### AI Tutor Chat
- 24/7 AI doubt solving
- Step-by-step explanations
- Voice interaction
- Multi-language support

### Gamification
- XP points & levels
- Achievement system
- Daily streaks
- Leaderboards

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS, Framer Motion
- **State**: Zustand
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4, Claude API
- **Auth**: Clerk
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Install dependencies: `npm install`
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── dashboard/    # Dashboard pages
│   └── page.tsx      # Landing page
├── components/
│   ├── dashboard/    # Dashboard components
│   ├── landing/      # Landing page sections
│   └── ui/           # Reusable UI components
└── lib/
    ├── database/     # Schema & types
    ├── ai.ts         # AI integration
    ├── constants.ts  # App constants
    ├── store.ts      # Zustand stores
    ├── supabase.ts   # Database client
    └── utils.ts      # Utilities
```

## License

MIT
