import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Leaf, RotateCcw, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../utils/api';

const QUICK_QUESTIONS = [
  { label: '♻️ Reduce plastic', q: 'How can I reduce plastic usage?' },
  { label: '💧 Save water',     q: 'What are the best water conservation tips?' },
  { label: '⚡ Save energy',    q: 'How can I save energy at home?' },
  { label: '🚲 Green transport',q: 'What are eco-friendly transport options?' },
  { label: '🌳 Plant trees',    q: 'Why is planting trees important?' },
  { label: '🥗 Eco diet',       q: 'How does diet affect my carbon footprint?' },
  { label: '🏅 My badges',      q: 'How do I earn badges on EcoLife?' },
  { label: '🔥 Streaks',        q: 'How does the streak system work?' },
];

function formatText(text) {
  return text.split('\n').map((line, i) => {
    const html = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <p key={i} style={{ margin: '3px 0', lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Welcome to **EcoLife AI Assistant**!\n\nI\'m here to help you with all things eco-friendly. Ask me about sustainable habits, how to reduce your carbon footprint, water conservation, energy saving, and more!\n\n🌱 What would you like to know today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setLoading(true);
    try {
      const res = await api.post('/chat', { message: msg });
      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: '🌿 Sorry, I couldn\'t connect right now. Please try again!' }]);
    } finally { setLoading(false); }
  };

  const reset = () => setMessages([{ from: 'bot', text: '🌱 Chat cleared! Ask me anything about eco-living.' }]);

  return (
    <div style={{ display: 'flex', background: '#F8F9FA', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ flex: 1, marginLeft: 260, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '24px 36px', background: 'linear-gradient(135deg,#1a6b3c,#27AE60)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={24} color="white" />
            </div>
            <div>
              <h1 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>EcoLife AI Assistant</h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', margin: '3px 0 0' }}>🌍 Your personal sustainable living expert</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 20 }}>
              <Sparkles size={14} color="white" />
              <span style={{ color: 'white', fontSize: '0.78rem', fontWeight: 600 }}>Smart Eco AI</span>
            </div>
            <button onClick={reset} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, padding: '8px 14px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 600 }}>
              <RotateCcw size={14} /> Clear Chat
            </button>
          </div>
        </div>

        {/* Quick Question Chips */}
        <div style={{ padding: '12px 36px', background: '#F0FFF4', borderBottom: '1px solid #BBF7D0', display: 'flex', gap: 8, overflowX: 'auto', flexWrap: 'nowrap', flexShrink: 0 }}>
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q.q)}
              style={{ whiteSpace: 'nowrap', padding: '7px 16px', background: 'white', color: '#27AE60', border: '1.5px solid #BBF7D0', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', flexShrink: 0, transition: '0.2s' }}>
              {q.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 16, background: '#F8FAF8' }}>
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start', gap: 10, alignItems: 'flex-start' }}>
                {m.from === 'bot' && (
                  <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#27AE60,#1a6b3c)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                    <Leaf size={16} color="white" />
                  </div>
                )}
                <div style={{
                  maxWidth: '65%', padding: '14px 18px', borderRadius: m.from === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: m.from === 'user' ? 'linear-gradient(135deg,#27AE60,#1a6b3c)' : 'white',
                  color: m.from === 'user' ? 'white' : '#1a1a2e', fontSize: '0.9rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                }}>
                  {formatText(m.text)}
                </div>
                {m.from === 'user' && (
                  <div style={{ width: 36, height: 36, background: '#F0FFF4', border: '2px solid #27AE60', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4, fontSize: '1rem' }}>
                    👤
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#27AE60,#1a6b3c)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={16} color="white" />
              </div>
              <div style={{ background: 'white', padding: '14px 18px', borderRadius: '20px 20px 20px 4px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                  {[0, 1, 2].map(j => (
                    <span key={j} style={{ width: 8, height: 8, borderRadius: '50%', background: '#27AE60', animation: `bounce 1.2s ${j * 0.2}s infinite` }} />
                  ))}
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '16px 36px', background: 'white', borderTop: '1px solid #E5E7EB', display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask anything about eco-living, habits, badges, sustainability…"
            style={{ flex: 1, padding: '14px 18px', border: '1.5px solid #E5E7EB', borderRadius: 14, fontSize: '0.9rem', outline: 'none', background: '#FAFAFA', transition: '0.2s' }}
          />
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
            style={{ width: 48, height: 48, background: input.trim() ? 'linear-gradient(135deg,#27AE60,#1a6b3c)' : '#E5E7EB', border: 'none', borderRadius: 14, cursor: input.trim() ? 'pointer' : 'default', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', flexShrink: 0 }}>
            <Send size={18} />
          </button>
        </div>
      </main>

      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}
