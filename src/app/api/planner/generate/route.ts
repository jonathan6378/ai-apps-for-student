import { NextRequest, NextResponse } from 'next/server';

interface PlannerRequest {
  examDate: string;
  subjects: string[];
  weakTopics: string[];
  availableHours: number;
  preferences: {
    pomodoroLength: number;
    breakLength: number;
    preferredTime: 'morning' | 'afternoon' | 'evening' | 'night';
    daysPerWeek: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: PlannerRequest = await request.json();
    const { examDate, subjects, weakTopics, availableHours, preferences } = body;

    if (!examDate || !subjects.length || !availableHours) {
      return NextResponse.json(
        { error: 'Exam date, subjects, and available hours are required' },
        { status: 400 }
      );
    }

    // Calculate days until exam
    const daysUntilExam = Math.ceil(
      (new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExam < 1) {
      return NextResponse.json(
        { error: 'Exam date must be in the future' },
        { status: 400 }
      );
    }

    // In production, AI would generate optimal schedule
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //   messages: [
    //     { role: 'system', content: 'You are an expert study planner...' },
    //     { role: 'user', content: `Create a study plan for...` }
    //   ],
    // });

    // Generate mock schedule
    const schedule = subjects.map((subject) => ({
      subject,
      hoursPerDay: Math.round((availableHours / subjects.length) * 10) / 10,
      priority: weakTopics.includes(subject) ? 'high' : 'medium',
      sessions: Math.ceil(daysUntilExam * (availableHours / subjects.length) / preferences.pomodoroLength * 60),
    }));

    return NextResponse.json({
      success: true,
      plan: {
        daysUntilExam,
        totalStudyHours: daysUntilExam * availableHours,
        schedule,
        dailyRoutine: {
          startTime: preferences.preferredTime === 'morning' ? '6:00 AM' : '2:00 PM',
          pomodoroLength: preferences.pomodoroLength,
          breakLength: preferences.breakLength,
          sessionsPerDay: Math.floor((availableHours * 60) / (preferences.pomodoroLength + preferences.breakLength)),
        },
        revisionCycles: [
          { day: 1, type: 'Initial learning' },
          { day: 2, type: 'First revision' },
          { day: 7, type: 'Spaced revision' },
          { day: 14, type: 'Deep revision' },
          { day: daysUntilExam - 1, type: 'Final revision' },
        ],
        tips: [
          'Focus on weak topics during your peak energy hours',
          'Take a 15-minute break every 2 Pomodoro sessions',
          'Review previous day topics for 10 minutes each morning',
          'Get 7-8 hours of sleep for optimal memory consolidation',
        ],
      },
    });
  } catch (error) {
    console.error('Planner generate error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
