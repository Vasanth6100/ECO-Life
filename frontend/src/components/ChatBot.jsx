import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Leaf, RotateCcw } from 'lucide-react';
import api from '../utils/api';

const QUICK_QUESTIONS = [
  '♻️ How do I reduce plastic?',
  '💧 Water saving tips?',
  '⚡ Save energy at home?',
  '🚲 Green transport ideas?',
  '🌳 Why plant trees?',
];

const TypingDot = () => (
  <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: 7, height: 7, borderRadius: '50%', background: '#27AE60',
        animation: `bounce 1.2s ${i * 0.2}s infinite`,
      }} />
    ))}
  </span>
);

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hi! I\'m your **EcoLife AI Assistant**.\n\nAsk me anything about sustainable living, your habits, badges, or eco tips! 🌱' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const endRef = useRef(null);

  useEffect(() => { if (open) { endRef.current?.scrollIntoView({ behavior: 'smooth' }); setUnread(0); } }, [messages, open]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setLoading(true);
    try {
      const res = await api.post('/chat', { message: msg });
      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
      if (!open) setUnread(u => u + 1);
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: '🌿 Sorry, I couldn\'t connect right now. Try again!' }]);
    } finally { setLoading(false); }
  };

  const formatText = (text) =>
    text.split('\n').map((line, i) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} style={{ margin: '2px 0', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: formatted }} />;
    });

  return (
    <>
      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.4);opacity:0} }
      `}</style>

      {/* Floating Button */}
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1000 }}>
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'linear-gradient(135deg, #27AE60, #2ECC71)',
                border: 'none', cursor: 'pointer', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(39,174,96,0.45)',
                position: 'relative',
              }}
            >
              <MessageCircle size={26} />
              {unread > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4, width: 20, height: 20,
                  background: '#EF4444', borderRadius: '50%', fontSize: '0.65rem',
                  fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid white'
                }}>{unread}</span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            style={{
              position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
              width: 380, height: 560,
              background: 'white', borderRadius: 24,
              boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,#27AE60,#16A085)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Leaf size={18} color="white" />
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem' }}>EcoLife AI Assistant</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem' }}>Your eco expert 🌍</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setMessages([{ from: 'bot', text: '👋 Fresh start! Ask me anything about eco-living 🌱' }])}
                  style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RotateCcw size={14} />
                </button>
                <button onClick={() => setOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, background: '#F8FAF8' }}>
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '82%', padding: '10px 14px', borderRadius: m.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: m.from === 'user' ? 'linear-gradient(135deg,#27AE60,#2ECC71)' : 'white',
                    color: m.from === 'user' ? 'white' : '#1a1a2e',
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}>
                    {formatText(m.text)}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div style={{ display: 'flex' }}>
                  <div style={{ background: 'white', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <TypingDot />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick Questions */}
            <div style={{ padding: '8px 12px', borderTop: '1px solid #F0F0F0', display: 'flex', gap: 6, overflowX: 'auto', flexWrap: 'nowrap' }}>
              {QUICK_QUESTIONS.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)}
                  style={{ whiteSpace: 'nowrap', padding: '5px 12px', background: '#F0FFF4', color: '#27AE60', border: '1px solid #BBF7D0', borderRadius: 20, fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid #F0F0F0', display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask about eco-living..."
                style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 12, fontSize: '0.85rem', outline: 'none', background: '#FAFAFA' }}
              />
              <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
                style={{ width: 40, height: 40, background: input.trim() ? 'linear-gradient(135deg,#27AE60,#2ECC71)' : '#E5E7EB', border: 'none', borderRadius: 12, cursor: input.trim() ? 'pointer' : 'default', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}>
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
