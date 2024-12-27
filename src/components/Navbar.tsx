import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, User } from 'lucide-react';

export function Navbar() {
  const { signOut, user } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/50 backdrop-blur-lg border-b border-emerald-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <span className="text-emerald-500 font-bold text-xl">ChatApp</span>
            <div className="flex items-center text-emerald-400/70 text-sm">
              <User className="h-4 w-4 mr-2" />
              <span>{user.user_metadata.username || user.email}</span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}