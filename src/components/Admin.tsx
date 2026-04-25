import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  const [form, setForm] = useState({ title: '', year: '', img: '', desc: '' });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:8000/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      onRefresh();
      navigate('/');
    });
  };

  const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#fff',
    outline: 'none',
    fontSize: '1rem'
  };

  return (
    <div style={{ 
      backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', padding: '20px' 
    }}>
      <div style={{ 
        background: '#1e293b', padding: '40px', borderRadius: '24px', 
        width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' 
      }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>Kino Qo'shish</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input placeholder="Kino nomi" style={inputStyle} onChange={e => setForm({...form, title: e.target.value})} required />
          <input placeholder="Yili" style={inputStyle} onChange={e => setForm({...form, year: e.target.value})} required />
          <input placeholder="Rasm URL" style={inputStyle} onChange={e => setForm({...form, img: e.target.value})} required />
          <textarea placeholder="Kino haqida qisqacha..." style={{...inputStyle, height: '100px'}} onChange={e => setForm({...form, desc: e.target.value})} required />
          <button type="submit" style={{ 
            padding: '15px', borderRadius: '8px', border: 'none', 
            backgroundColor: '#38bdf8', color: '#000', fontWeight: 'bold', 
            fontSize: '1rem', cursor: 'pointer', transition: '0.3s' 
          }}>
            Kino qo'shish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;