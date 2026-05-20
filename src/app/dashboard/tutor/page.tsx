'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useChatStore } from '@/lib/store';
import { generateId } from '@/lib/utils';

const suggestedQuestions = [
  { icon: '🧮', text: 'Explain integration by parts' },
  { icon: '⚛️', text: 'What is quantum entanglement?' },
  { icon: '🧬', text: 'How does DNA replication work?' },
  { icon: '📊', text: 'Explain supply and demand curves' },
  { icon: '💻', text: 'What is Big O notation?' },
  { icon: '🌍', text: 'Explain plate tectonics simply' },
];

const aiResponses: Record<string, string> = {
  default: `Great question! Let me break this down for you step by step.

**Here's the concept explained simply:**

Think of it like building blocks. Each piece connects to the next in a logical way. The key things to remember are:

1. **Foundation** - Start with the basic definition
2. **Building Up** - Add complexity gradually  
3. **Connections** - See how it links to what you already know
4. **Practice** - Try applying it to simple problems first

Would you like me to:
- Explain with a real-world analogy? 🌍
- Give you practice problems? 📝
- Explain in Hindi/Hinglish? 🇮🇳
- Create flashcards for revision? 🃏`,
  'Explain integration by parts': `## Integration by Parts 🧮

**Formula:** ∫u dv = uv - ∫v du

**Think of it like this:** It's the "product rule" but for integrals, running in reverse!

### How to choose u and v (LIATE Rule):
Pick **u** in this priority order:
1. **L**ogarithmic (ln x)
2. **I**nverse trig (arctan x)
3. **A**lgebraic (x², x³)
4. **T**rigonometric (sin x, cos x)
5. **E**xponential (eˣ)

### Example:
∫ x·eˣ dx

- Let u = x → du = dx
- Let dv = eˣ dx → v = eˣ

**Result:** x·eˣ - ∫eˣ dx = x·eˣ - eˣ + C = **eˣ(x-1) + C** ✅

### Pro Tip 💡
If you need to apply integration by parts twice, consider using the **tabular method** - it's much faster!

Want me to give you practice problems? 📝`,
  'What is quantum entanglement?': `## Quantum Entanglement ⚛️

**Simple explanation:**
Imagine you have two magic coins. No matter how far apart they are, when you flip one and get heads, the other INSTANTLY becomes tails. Always. Every time. 🪙

That's basically quantum entanglement!

### The Science:
When two particles become "entangled," their quantum states become linked. Measuring one particle **instantly** determines the state of the other, regardless of distance.

### Key Points:
- Einstein called it "spooky action at a distance" 👻
- It doesn't transfer information faster than light
- It's the basis of **quantum computing** and **quantum cryptography**
- Particles must interact first to become entangled

### Real-world applications:
1. 🖥️ Quantum computers
2. 🔐 Unbreakable encryption
3. 📡 Quantum teleportation (of information, not matter!)

### Formula:
|Ψ⟩ = (1/√2)(|01⟩ + |10⟩) — This is a Bell State!

Want me to explain quantum computing next? 🤖`,
};

export default function TutorPage() {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    addMessage({
      id: generateId(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    });
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = aiResponses[messageText] || aiResponses.default;
    addMessage({
      id: generateId(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    });
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] lg:h-[calc(100vh-4rem)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4 shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Study Tutor</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-dark-400">Online • Responds instantly</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-dark-300 focus:outline-none"
          >
            <option value="English">🇺🇸 English</option>
            <option value="Hindi">🇮🇳 Hindi</option>
            <option value="Hinglish">🇮🇳 Hinglish</option>
          </select>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-dark-300 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Chat area */}
      <div className="flex-1 glass-card !p-4 overflow-y-auto scrollbar-hide mb-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-sm">🤖</span>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-brand-500/20 border border-brand-500/30 text-white'
                    : 'bg-white/5 border border-white/10 text-dark-200'
                }`}
              >
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                  {message.content}
                </pre>
                <span className="text-[10px] text-dark-500 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-pink flex items-center justify-center shrink-0 mt-1">
                  <span className="text-sm">🧑‍🎓</span>
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                  <span className="text-sm">🤖</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                        className="w-2 h-2 rounded-full bg-dark-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested questions (show when few messages) */}
      {messages.length <= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 shrink-0"
        >
          <p className="text-xs text-dark-400 mb-2 font-medium">✨ Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q.text}
                onClick={() => handleSend(q.text)}
                className="text-xs px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-dark-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {q.icon} {q.text}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0"
      >
        <div className="glass-card !p-3 flex items-end gap-3">
          {/* Attachment button */}
          <button className="p-2.5 rounded-xl bg-white/5 text-dark-400 hover:text-white hover:bg-white/10 transition-all shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          
          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything... (Press Enter to send)"
              rows={1}
              className="w-full bg-transparent text-white placeholder-dark-500 text-sm resize-none focus:outline-none py-2.5 max-h-32"
              style={{ minHeight: '40px' }}
            />
          </div>

          {/* Voice button */}
          <button className="p-2.5 rounded-xl bg-white/5 text-dark-400 hover:text-white hover:bg-white/10 transition-all shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>

          {/* Send button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className={`p-2.5 rounded-xl shrink-0 transition-all ${
              input.trim()
                ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25'
                : 'bg-white/5 text-dark-500'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
