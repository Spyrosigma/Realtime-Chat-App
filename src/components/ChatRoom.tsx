import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Send, Users } from 'lucide-react';
import { UserSearch } from './UserSearch';
import { Navbar } from './Navbar';

interface Message {
  id: number;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  sender_email: string;
}

interface ChatUser {
  id: string;
  email: string;
  username: string;
}

export function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
      const subscription = supabase
        .channel('messages')
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `sender_id=eq.${user?.id},receiver_id=eq.${selectedUser.id}`
          }, 
          payload => {
            const newMessage = payload.new as Message;
            setMessages(prev => [...prev, newMessage]);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    if (!selectedUser) return;

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${user?.id},receiver_id.eq.${selectedUser.id}),and(sender_id.eq.${selectedUser.id},receiver_id.eq.${user?.id})`)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedUser) return;

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          content: newMessage,
          sender_id: user.id,
          receiver_id: selectedUser.id,
          sender_email: user.email,
        },
      ]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User search sidebar */}
          <div className="lg:col-span-1 bg-gray-800/50 p-4 rounded-lg border border-emerald-500/20">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-emerald-500 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Find Users
              </h2>
            </div>
            <UserSearch onSelectUser={setSelectedUser} />
          </div>

          {/* Chat area */}
          <div className="lg:col-span-3 bg-gray-800/50 rounded-lg border border-emerald-500/20 flex flex-col h-[calc(100vh-8rem)]">
            {selectedUser ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b border-emerald-500/20">
                  <h3 className="text-lg font-semibold text-emerald-500">
                    Chat with {selectedUser.username}
                  </h3>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender_id === user?.id
                            ? 'bg-emerald-500/20 text-emerald-50'
                            : 'bg-gray-700/50 text-white'
                        }`}
                      >
                        <p className="text-sm font-medium mb-1 opacity-70">
                          {message.sender_email}
                        </p>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input */}
                <form onSubmit={sendMessage} className="p-4 border-t border-emerald-500/20">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-900/50 border border-emerald-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-emerald-500/50"
                      placeholder="Type your message..."
                    />
                    <button
                      type="submit"
                      className="bg-emerald-500/20 text-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-emerald-500/70">
                Select a user to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}