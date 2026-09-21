import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthStore {
  session: Session | null;
  user: User | null;
  loading: boolean;
  initialized: boolean;
  initialize: () => () => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  user: null,
  loading: true,
  initialized: false,
  initialize: () => {
    if (!supabase) {
      set({ loading: false, initialized: true });
      return () => undefined;
    }
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active) set({ session: data.session, user: data.session?.user ?? null, loading: false, initialized: true });
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null, loading: false, initialized: true });
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  },
  signOut: async () => {
    if (supabase) await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));
