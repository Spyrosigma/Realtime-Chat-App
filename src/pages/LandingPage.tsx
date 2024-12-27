import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Sparkles } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center text-white relative z-10">
        <div className="mb-12">
          <div className="flex justify-center items-center mb-6">
            <MessageSquare className="h-20 w-20 text-white" />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Welcome to ChatApp
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with people around the world in real-time through our modern messaging platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Global Community"
            description="Connect with users worldwide in our vibrant community"
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8" />}
            title="Real-time Chat"
            description="Instant messaging with real-time updates and notifications"
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="User Friendly"
            description="Clean and intuitive interface for the best chat experience"
          />
        </div>

        <div className="space-x-4">
          <button
            onClick={() => navigate('/auth')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-200">
      <div className="flex justify-center mb-4 text-white">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}