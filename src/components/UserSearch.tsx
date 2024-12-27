import { useState, useEffect } from 'react';
import { Search, User, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

interface User {
  id: string;
  email: string;
  username: string;
}

interface UserSearchProps {
  onSelectUser: (user: User) => void;
}

export function UserSearch({ onSelectUser }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    if (searchTerm.length >= 2) {
      searchUsers();
    } else {
      setUsers([]);
    }
  }, [searchTerm]);

  const searchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, username')
        .or(`email.ilike.%${searchTerm}%,username.ilike.%${searchTerm}%`)
        .neq('id', currentUser?.id) // Exclude current user
        .limit(5);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-emerald-500/50" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by username or email..."
          className="w-full pl-10 pr-3 py-2 bg-gray-900/50 border border-emerald-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white placeholder-emerald-500/50"
        />
      </div>

      {searchTerm.length >= 2 && (
        <div className="absolute w-full mt-2 bg-gray-900/90 border border-emerald-500/20 rounded-lg shadow-xl z-10">
          {loading ? (
            <div className="p-4 text-emerald-500/70">Searching...</div>
          ) : users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <button
                    onClick={() => onSelectUser(user)}
                    className="w-full px-4 py-3 text-left hover:bg-emerald-500/10 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-emerald-500" />
                        <span className="text-white font-medium">{user.username}</span>
                      </div>
                      <div className="flex items-center text-emerald-500/70 text-sm">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-emerald-500/70">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}