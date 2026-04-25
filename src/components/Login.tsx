import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        fetch(`http://localhost:8000/users`)
            .then(res => res.json())
            .then((users: any[]) => {
                const foundUser = users.find(
                    (u) => u.username === username && String(u.password) === String(password)
                );

                if (foundUser) {
                    localStorage.setItem('isAdmin', 'true');
                    navigate('/admin');
                } else {
                    alert("Login yoki parol xato! (admin / 123 ni sinab ko'ring)");
                }
            })
            .catch(err => {
                console.error("Backend ulanishda xato:", err);
                alert("Backend bilan aloqa yo'q! (json-server ishlayotganini tekshiring)");
            });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'inline-block', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>Admin Kirish</h2>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Login"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{ padding: '8px', width: '200px' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="password"
                            placeholder="Parol"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ padding: '8px', width: '200px' }}
                            required
                        />
                    </div>
                    <button type="submit" style={{ padding: '8px 20px', cursor: 'pointer', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
                        Kirish
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;