import { create } from 'zustand';

interface UserState {
  user: {
    name: string;
    email: string;
    avatar: string;
    level: number;
    xp: number;
    streak: number;
    totalNotes: number;
    totalAssignments: number;
    totalStudyHours: number;
    plan: 'free' | 'pro' | 'team';
    achievements: string[];
  };
  setUser: (user: Partial<UserState['user']>) => void;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: 'Student',
    email: 'student@studygenie.ai',
    avatar: '🧑‍🎓',
    level: 7,
    xp: 2450,
    streak: 12,
    totalNotes: 47,
    totalAssignments: 23,
    totalStudyHours: 156,
    plan: 'pro',
    achievements: ['first-note', 'streak-7', 'assignments-10'],
  },
  setUser: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),
  addXP: (amount) =>
    set((state) => ({ user: { ...state.user, xp: state.user.xp + amount } })),
  incrementStreak: () =>
    set((state) => ({ user: { ...state.user, streak: state.user.streak + 1 } })),
}));

interface NotesState {
  notes: Array<{
    id: string;
    title: string;
    content: string;
    simplified: string;
    keyPoints: string[];
    flashcards: Array<{ question: string; answer: string }>;
    subject: string;
    createdAt: string;
  }>;
  addNote: (note: NotesState['notes'][0]) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
}));

interface PlannerState {
  tasks: Array<{
    id: string;
    title: string;
    subject: string;
    duration: number;
    completed: boolean;
    date: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  addTask: (task: PlannerState['tasks'][0]) => void;
  toggleTask: (id: string) => void;
}

export const usePlannerStore = create<PlannerState>((set) => ({
  tasks: [
    { id: '1', title: 'Revise Calculus Chapter 5', subject: 'Mathematics', duration: 45, completed: false, date: '2024-01-15', priority: 'high' },
    { id: '2', title: 'Practice Physics Numericals', subject: 'Physics', duration: 60, completed: true, date: '2024-01-15', priority: 'medium' },
    { id: '3', title: 'Read History Chapter 8', subject: 'History', duration: 30, completed: false, date: '2024-01-15', priority: 'low' },
    { id: '4', title: 'Complete Chemistry Lab Report', subject: 'Chemistry', duration: 90, completed: false, date: '2024-01-16', priority: 'high' },
    { id: '5', title: 'English Essay Draft', subject: 'English', duration: 45, completed: true, date: '2024-01-16', priority: 'medium' },
  ],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    })),
}));

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatState {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: "Hey there! 👋 I'm your AI study buddy. Ask me anything - from explaining quantum physics to solving math problems. I can help in English, Hindi, or Hinglish! What are you studying today?",
      timestamp: new Date().toISOString(),
    },
  ],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () =>
    set({ messages: [] }),
}));
