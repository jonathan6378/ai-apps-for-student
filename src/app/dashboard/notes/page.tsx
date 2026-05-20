'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { LANGUAGES, SUBJECTS } from '@/lib/constants';

type OutputMode = 'summary' | 'keypoints' | 'flashcards' | 'eli10' | 'quiz' | 'formulas';
type InputMode = 'paste' | 'upload' | 'image';

const outputModes: { id: OutputMode; label: string; icon: string; desc: string }[] = [
  { id: 'summary', label: 'Bullet Summary', icon: '📋', desc: 'Concise bullet points' },
  { id: 'keypoints', label: 'Key Points', icon: '🎯', desc: 'Most important concepts' },
  { id: 'flashcards', label: 'Flashcards', icon: '🃏', desc: 'Q&A study cards' },
  { id: 'eli10', label: 'Explain Like I\'m 10', icon: '🧒', desc: 'Super simple explanation' },
  { id: 'quiz', label: 'Generate Quiz', icon: '❓', desc: 'Test your knowledge' },
  { id: 'formulas', label: 'Key Formulas', icon: '📐', desc: 'Important formulas & equations' },
];

const sampleResults: Record<OutputMode, string> = {
  summary: `## Bullet Summary: Quantum Mechanics

• **Wave-Particle Duality**: All matter exhibits both wave and particle properties
• **Heisenberg Uncertainty Principle**: Cannot simultaneously know exact position and momentum
• **Schrödinger Equation**: Describes how quantum state changes over time
• **Quantum Superposition**: Particles exist in multiple states until measured
• **Quantum Entanglement**: Particles can be correlated regardless of distance
• **Planck's Constant (h)**: Fundamental constant relating energy to frequency (6.626 × 10⁻³⁴ J·s)`,
  keypoints: `## Key Points

1. **Core Concept**: Quantum mechanics governs behavior at atomic/subatomic scales
2. **Key Difference from Classical**: Probabilistic rather than deterministic
3. **Measurement Problem**: Observation affects the system being measured
4. **Applications**: Lasers, semiconductors, MRI, quantum computing
5. **Key People**: Planck, Bohr, Heisenberg, Schrödinger, Dirac`,
  flashcards: `## Flashcards

**Q: What is wave-particle duality?**
A: The concept that all matter and energy exhibit both wave-like and particle-like properties.

**Q: State Heisenberg's Uncertainty Principle**
A: It's impossible to simultaneously know the exact position and momentum of a particle. Δx·Δp ≥ ℏ/2

**Q: What is quantum superposition?**
A: A quantum system can exist in multiple states simultaneously until it is measured.

**Q: What is Planck's constant?**
A: h = 6.626 × 10⁻³⁴ J·s, the fundamental constant relating photon energy to frequency.`,
  eli10: `## Explain Like I'm 10 🧒

Imagine you have a magic marble. In the normal world, your marble is either in your left pocket or right pocket. But in the quantum world, the marble is in BOTH pockets at the same time! 🤯

When you look to check which pocket it's in, THEN it picks one. That's called **superposition**.

Also, these magic marbles can be "linked" with a friend's marble. If yours turns blue, your friend's instantly turns red - even if they're on the other side of the world! That's called **entanglement**.

The rules of this tiny world are very different from the big world we see every day. Scientists use math (like Schrödinger's equation) to predict what these tiny particles will probably do.`,
  quiz: `## Quiz: Quantum Mechanics

**1. What does Heisenberg's Uncertainty Principle state?**
a) Energy is always conserved
b) You cannot know exact position and momentum simultaneously ✅
c) Light always travels in straight lines
d) Atoms are indivisible

**2. What is quantum superposition?**
a) Particles move faster than light
b) Particles exist in multiple states until measured ✅
c) Two particles merge into one
d) Energy can be created from nothing

**3. Who proposed the wave equation for quantum systems?**
a) Einstein
b) Heisenberg
c) Schrödinger ✅
d) Newton`,
  formulas: `## Key Formulas

**Planck's Energy Equation:**
E = hf (Energy = Planck's constant × frequency)

**de Broglie Wavelength:**
λ = h/p (wavelength = Planck's constant / momentum)

**Heisenberg Uncertainty:**
Δx · Δp ≥ ℏ/2

**Schrödinger Equation (time-dependent):**
iℏ ∂Ψ/∂t = ĤΨ

**Photoelectric Effect:**
E_k = hf - φ (kinetic energy = photon energy - work function)`,
};

export default function NotesPage() {
  const [inputMode, setInputMode] = useState<InputMode>('paste');
  const [inputText, setInputText] = useState('');
  const [outputMode, setOutputMode] = useState<OutputMode>('summary');
  const [language, setLanguage] = useState('en');
  const [subject, setSubject] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setShowResult(false);
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setResult(sampleResults[outputMode]);
    setShowResult(true);
    setIsProcessing(false);
  };

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">📝</span> AI Notes Simplifier
        </h1>
        <p className="text-dark-400 text-sm mt-1">
          Upload or paste your notes and let AI simplify them for you
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Input mode tabs */}
          <div className="glass-card !p-2">
            <div className="flex gap-1">
              {[
                { id: 'paste' as InputMode, label: 'Paste Text', icon: '📄' },
                { id: 'upload' as InputMode, label: 'Upload PDF', icon: '📎' },
                { id: 'image' as InputMode, label: 'Image/OCR', icon: '📸' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setInputMode(mode.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    inputMode === mode.id
                      ? 'bg-brand-500/20 text-white border border-brand-500/30'
                      : 'text-dark-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{mode.icon}</span>
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="glass-card !p-5 space-y-4">
            {inputMode === 'paste' && (
              <Textarea
                label="Paste your notes here"
                placeholder="Paste your lecture notes, textbook content, or any study material here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="!min-h-[250px]"
              />
            )}
            {inputMode === 'upload' && (
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-brand-500/30 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">📎</div>
                <p className="text-white font-medium mb-1">Drop your PDF here</p>
                <p className="text-dark-400 text-sm">or click to browse (max 10MB)</p>
                <input type="file" accept=".pdf" className="hidden" />
                <button
                  onClick={() => setInputText('Sample notes from uploaded PDF: Quantum Mechanics is the branch of physics that deals with the behavior of matter and light on atomic and subatomic scales.')}
                  className="mt-4 text-sm text-brand-400 hover:text-brand-300"
                >
                  Try with sample PDF →
                </button>
              </div>
            )}
            {inputMode === 'image' && (
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-brand-500/30 transition-colors cursor-pointer">
                <div className="text-4xl mb-3">📸</div>
                <p className="text-white font-medium mb-1">Upload image of handwritten notes</p>
                <p className="text-dark-400 text-sm">Supports JPG, PNG, HEIC (OCR powered)</p>
                <input type="file" accept="image/*" className="hidden" />
                <button
                  onClick={() => setInputText('OCR extracted text: Quantum Mechanics fundamentals including wave-particle duality, uncertainty principle, and quantum superposition.')}
                  className="mt-4 text-sm text-brand-400 hover:text-brand-300"
                >
                  Try with sample image →
                </button>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Language"
                options={LANGUAGES.map((l) => ({ value: l.code, label: l.name }))}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
              <Select
                label="Subject"
                options={[{ value: '', label: 'Auto-detect' }, ...SUBJECTS.map((s) => ({ value: s, label: s }))]}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Process button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleProcess}
              loading={isProcessing}
              disabled={!inputText.trim()}
            >
              {isProcessing ? 'AI is thinking...' : '✨ Simplify Notes'}
            </Button>
          </div>
        </motion.div>

        {/* Output Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Output mode selector */}
          <div className="glass-card !p-4">
            <p className="text-xs font-medium text-dark-400 mb-3 uppercase tracking-wider">Output Format</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {outputModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setOutputMode(mode.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    outputMode === mode.id
                      ? 'bg-brand-500/20 text-white border border-brand-500/30'
                      : 'text-dark-400 hover:text-white bg-white/5 border border-transparent'
                  }`}
                >
                  <span>{mode.icon}</span>
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result display */}
          <div className="glass-card !p-6 min-h-[400px] relative">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-4 animate-pulse">
                    <span className="text-3xl animate-bounce-slow">🧠</span>
                  </div>
                  <p className="text-white font-medium">AI is simplifying your notes...</p>
                  <p className="text-dark-400 text-sm mt-1">This usually takes 2-5 seconds</p>
                  <div className="flex gap-1 mt-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-brand-500"
                      />
                    ))}
                  </div>
                </motion.div>
              ) : showResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <span>{outputModes.find((m) => m.id === outputMode)?.icon}</span>
                      {outputModes.find((m) => m.id === outputMode)?.label}
                    </h3>
                    <div className="flex gap-2">
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-dark-300 hover:text-white hover:bg-white/10 transition-all">
                        📋 Copy
                      </button>
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-dark-300 hover:text-white hover:bg-white/10 transition-all">
                        💾 Save
                      </button>
                    </div>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-dark-200 leading-relaxed font-sans">
                      {result}
                    </pre>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="text-5xl mb-4">✨</div>
                  <p className="text-white font-medium mb-1">Ready to Simplify</p>
                  <p className="text-dark-400 text-sm max-w-xs">
                    Paste or upload your notes on the left, choose an output format above, and hit &ldquo;Simplify Notes&rdquo;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
