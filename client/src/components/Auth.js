import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/result_reducer';
import bcrypt from 'bcryptjs';
import '../styles/Auth.css';

const SALT_ROUNDS = 10;

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateForm = () => {
        if (!username.trim()) {
            setError('Username is required');
            return false;
        }

        if (!isLogin && !email.trim()) {
            setError('Email is required');
            return false;
        }

        if (!password.trim()) {
            setError('Password is required');
            return false;
        }

        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            if (isLogin) {
                await handleLogin();
            } else {
                await handleSignup();
            }
        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username);
        
        if (!user) throw new Error('User not found');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');
        
        // Set session
        localStorage.setItem('user', JSON.stringify({ 
            username: user.username,
            email: user.email,
            lastLogin: new Date().toISOString()
        }));
        
        dispatch(setUserId(user.username));
        navigate('/main');
    };

    const handleSignup = async () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.some(u => u.username === username)) {
            throw new Error('Username already exists');
        }
        
        if (users.some(u => u.email === email)) {
            throw new Error('Email already registered');
        }
        
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        
        const newUser = { 
            username, 
            email, 
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto-login after signup
        localStorage.setItem('user', JSON.stringify({
            username,
            email,
            lastLogin: new Date().toISOString()
        }));
        
        dispatch(setUserId(username));
        navigate('/main');
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        // In a real app, this would send a reset email
        alert(`Password reset link would be sent to ${email}`);
        setShowReset(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>{showReset ? 'Reset Password' : isLogin ? 'Login' : 'Sign Up'}</h2>
                
                {error && <div className="error-message">{error}</div>}
                
                {showReset ? (
                    <form onSubmit={handlePasswordReset}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-button" disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                        <p className="toggle-auth" onClick={() => setShowReset(false)}>
                            Back to login
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleAuth}>
                        {!isLogin && (
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6"
                            />
                        </div>
                        
                        {!isLogin && (
                            <div className="form-group">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        
                        <button type="submit" className="auth-button" disabled={isLoading}>
                            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
                        </button>
                        
                        <div className="auth-links">
                            <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                            </p>
                            
                            {isLogin && (
                                <p className="toggle-auth" onClick={() => setShowReset(true)}>
                                    Forgot password?
                                </p>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}