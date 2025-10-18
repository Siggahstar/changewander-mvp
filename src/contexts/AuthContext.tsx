import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/api/supabaseClient';

type User = { id: string; email?: string } | null;

const AuthContext = createContext<{ user: User; loading: boolean }>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const session = (data as any)?.session;
        if (mounted) setUser(session?.user ? { id: session.user.id, email: session.user.email ?? undefined } : null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const listener = supabase.auth.onAuthStateChange((_event: string, sess: any) => {
      if (mounted) setUser(sess?.user ? { id: sess.user.id, email: sess.user.email ?? undefined } : null);
    });

    return () => {
      mounted = false;
      try {
        (listener as any)?.data?.subscription?.unsubscribe?.();
      } catch {
        // ignore
      }
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
