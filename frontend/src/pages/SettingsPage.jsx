import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Bell, Trash2, User, Lock, Save, Camera, CheckCircle, XCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Toast = ({ msg, type }) => (
  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
    style={{ position: 'fixed', top: 24, right: 24, zIndex: 999, padding: '14px 22px', borderRadius: 14, background: type === 'success' ? '#D1FAE5' : '#FEE2E2', color: type === 'success' ? '#065F46' : '#B91C1C', fontWeight: 700, boxShadow: '0 4px 20px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 8 }}>
    {type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />} {msg}
  </motion.div>
);

export default function SettingsPage() {
  const { user: authUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: '', email: '', bio: '', avatar: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [notifications, setNotifications] = useState({ dailyStreaks: true, newBadges: true, communityNews: false, impactAlerts: true });
  const fileRef = useRef(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    api.get('/user/stats').then(res => {
      setProfile({ name: res.data.name || '', email: res.data.email || '', bio: res.data.bio || '', avatar: res.data.avatar || '' });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/user/update', { name: profile.name, email: profile.email, bio: profile.bio });
      showToast('Profile updated successfully!');
    } catch (err) { showToast(err.response?.data?.message || 'Update failed', 'error'); }
    finally { setSaving(false); }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const res = await api.post('/user/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setProfile(prev => ({ ...prev, avatar: res.data.avatar }));
      showToast('Profile picture updated!');
    } catch (err) { showToast(err.response?.data?.message || 'Upload failed', 'error'); }
    finally { setUploading(false); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) return showToast('New passwords do not match', 'error');
    if (passwords.newPassword.length < 6) return showToast('Password must be at least 6 characters', 'error');
    setChangingPw(true);
    try {
      await api.put('/user/password', { currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Password changed successfully!');
    } catch (err) { showToast(err.response?.data?.message || 'Password change failed', 'error'); }
    finally { setChangingPw(false); }
  };

  const avatarSrc = profile.avatar
    ? (profile.avatar.startsWith('/uploads') ? `http://localhost:5000${profile.avatar}` : profile.avatar)
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name || 'eco'}`;

  if (loading) return (
    <div style={{ display: 'flex', background: '#F8F9FA', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#27AE60', fontSize: '1.1rem' }}>🌱 Loading settings…</div>
      </main>
    </div>
  );

  return (
    <div style={{ display: 'flex', background: '#F8F9FA', minHeight: '100vh' }}>
      <Sidebar />
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} />}</AnimatePresence>

      <main style={{ flex: 1, marginLeft: 260, padding: '36px 40px', overflowY: 'auto' }}>
        <header style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a6b3c', margin: 0 }}>Account Settings</h1>
          <p style={{ color: '#888', marginTop: 6 }}>Manage your eco-profile and preferences.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Profile Section */}
            <section style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 24px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 10, color: '#1a1a2e' }}>
                <User size={20} color="#27AE60" /> Profile Information
              </h3>

              {/* Avatar Upload */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
                <div style={{ position: 'relative' }}>
                  <img src={avatarSrc} alt="avatar"
                    style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid #27AE60', objectFit: 'cover', background: '#F0FFF4' }} />
                  <button
                    onClick={() => fileRef.current?.click()}
                    style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, background: '#27AE60', border: '2px solid white', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Camera size={13} />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a2e' }}>{profile.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginTop: 2 }}>{profile.email}</div>
                  <button onClick={() => fileRef.current?.click()}
                    style={{ marginTop: 8, padding: '5px 14px', background: '#F0FFF4', color: '#27AE60', border: '1.5px solid #BBF7D0', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                    {uploading ? 'Uploading…' : '📷 Change Photo'}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 6, color: '#444' }}>Display Name</label>
                    <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                      style={{ width: '100%', padding: '12px 14px', background: '#F8F9FA', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: '0.9rem', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 6, color: '#444' }}>Email Address</label>
                    <input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                      style={{ width: '100%', padding: '12px 14px', background: '#F8F9FA', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: '0.9rem', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 6, color: '#444' }}>Bio</label>
                  <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={3} placeholder="Tell the community about your eco journey..."
                    style={{ width: '100%', padding: '12px 14px', background: '#F8F9FA', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: '0.9rem', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" disabled={saving}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: saving ? '#86EFAC' : 'linear-gradient(135deg,#27AE60,#2ECC71)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, cursor: saving ? 'default' : 'pointer', alignSelf: 'flex-start', fontSize: '0.9rem' }}>
                  <Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </form>
            </section>

            {/* Password Section */}
            <section style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 24px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 10, color: '#1a1a2e' }}>
                <Lock size={20} color="#27AE60" /> Security & Password
              </h3>
              <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 400 }}>
                {[
                  { label: 'Current Password', key: 'currentPassword', placeholder: 'Enter current password' },
                  { label: 'New Password',     key: 'newPassword',     placeholder: 'Min 6 characters' },
                  { label: 'Confirm New',      key: 'confirmPassword', placeholder: 'Repeat new password' },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 6, color: '#444' }}>{label}</label>
                    <input type="password" value={passwords[key]} onChange={e => setPasswords(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder}
                      style={{ width: '100%', padding: '12px 14px', background: '#F8F9FA', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: '0.9rem', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <button type="submit" disabled={changingPw}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: changingPw ? '#86EFAC' : '#1a6b3c', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, cursor: changingPw ? 'default' : 'pointer', alignSelf: 'flex-start', fontSize: '0.9rem', marginTop: 4 }}>
                  <Shield size={16} /> {changingPw ? 'Updating…' : 'Update Password'}
                </button>
              </form>
            </section>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Notifications */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8, color: '#1a1a2e' }}>
                <Bell size={18} color="#27AE60" /> Notifications
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {Object.entries({ dailyStreaks: 'Daily Streaks', newBadges: 'New Badges', communityNews: 'Community News', impactAlerts: 'Impact Alerts' }).map(([key, label]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#1a1a2e' }}>{label}</span>
                    <div onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                      style={{ width: 44, height: 24, background: notifications[key] ? '#27AE60' : '#D1D5DB', borderRadius: 20, position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
                      <div style={{ position: 'absolute', width: 18, height: 18, background: 'white', borderRadius: '50%', top: 3, left: notifications[key] ? 23 : 3, transition: '0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Stats */}
            <div style={{ background: 'linear-gradient(135deg,#27AE60,#1a6b3c)', borderRadius: 20, padding: 28, color: 'white' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1rem', color: 'white' }}>🌍 Your Impact</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.9, margin: '0 0 20px' }}>You're making a real difference for the planet every single day.</p>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Member Since</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: 4 }}>
                  {authUser ? new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #FEE2E2' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '1rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Trash2 size={18} /> Danger Zone
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#888', margin: '0 0 16px' }}>Once you delete your account, there is no going back.</p>
              <button style={{ padding: '10px 20px', background: '#FEE2E2', color: '#EF4444', border: '1.5px solid #FECACA', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
