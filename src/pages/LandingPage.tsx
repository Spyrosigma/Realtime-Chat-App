import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Sparkles } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-12 px-3 sm:px-5 lg:px-6 relative overflow-hidden">
      {/* Reduced background blob sizes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-36 -left-36 w-72 h-72 bg-emerald-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-16 w-64 h-64 bg-emerald-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-36 left-16 w-64 h-64 bg-emerald-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-3xl mx-auto text-center text-white relative z-10 space-y-6">
        {/* Reduced hero section sizes */}
        <div className="space-y-6">
          <div className="flex justify-center items-center">
            <MessageSquare className="h-14 w-14 sm:h-16 sm:w-16 text-emerald-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 px-3">
            Welcome to VartaLap
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/70 max-w-xl mx-auto px-3">
            Connect with people around the world in real-time through our modern messaging platform.
          </p>
        </div>

        {/* Reduced button sizes */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:space-x-3 px-3">
          <button
            onClick={() => navigate('/auth')}
            className="w-full sm:w-auto bg-emerald-500/20 text-emerald-500 px-6 py-3 rounded-lg font-semibold 
                     hover:bg-emerald-500/30 transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transform hover:scale-105"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="w-full sm:w-auto bg-transparent border-2 border-emerald-500/50 text-emerald-500 px-6 py-3 
                     rounded-lg font-semibold hover:bg-emerald-500/10 transition-all duration-200 
                     transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            Login
          </button>
        </div>

        {/* Reduced feature card sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-3">
          <FeatureCard
            icon={<Users className="h-7 w-7" />}
            title="Global Community"
            description="Connect with users worldwide in our vibrant community"
          />
          <FeatureCard
            icon={<Sparkles className="h-7 w-7" />}
            title="Real-time Chat"
            description="Instant messaging with real-time updates and notifications"
          />
          <FeatureCard
            icon={<MessageSquare className="h-7 w-7" />}
            title="User Friendly"
            description="Clean and intuitive interface for the best chat experience"
          />
        </div>
      </div>
    </div>
  );
}

// Updated FeatureCard with smaller padding and text
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="backdrop-blur-lg bg-gray-800/50 p-5 rounded-xl border border-emerald-500/20 
                    hover:bg-gray-800/70 transition-colors duration-200 flex flex-col items-center h-full">
      <div className="flex justify-center mb-3 text-emerald-500">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-emerald-500">{title}</h3>
      <p className="text-sm text-emerald-100/70 text-center">{description}</p>
    </div>
  );
}