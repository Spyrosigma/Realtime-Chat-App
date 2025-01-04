import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-36 -left-36 w-72 h-72 bg-emerald-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-16 w-64 h-64 bg-emerald-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-36 left-16 w-64 h-64 bg-emerald-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo with navigation */}
        <div 
          onClick={() => navigate('/')} 
          className="flex flex-col items-center mb-8 cursor-pointer group"
          >
          <img src="/xlogo.png" alt="VartaLap Logo" className="h-20 w-20 rounded-full" />
          <span className="text-2xl font-bold text-emerald-500">VartaLap</span>
        </div>
        
        <form onSubmit={handleSubmit} className="backdrop-blur-lg bg-gray-800/50 shadow-2xl rounded-xl px-8 pt-8 pb-8 mb-4 border border-emerald-500/20">
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-500">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          
          <div className="mb-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-emerald-500/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-emerald-500/20 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white 
                         placeholder-emerald-500/50"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-emerald-500/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-gray-900/50 border border-emerald-500/20 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white 
                         placeholder-emerald-500/50"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500/20 text-emerald-500 font-bold py-3 px-4 rounded-lg 
                     hover:bg-emerald-500/30 transition-all duration-200 mb-4 
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          <p className="text-center text-emerald-500/80">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors duration-200"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}