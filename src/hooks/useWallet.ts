import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/api/supabaseClient';

export function useWallet(userId: string | undefined) {
  return useQuery({
    queryKey: ['wallet', userId],
    queryFn: async () => {
      if (!userId) throw new Error('Missing user id');
      const { data, error } = await supabase.from('wallets').select('*').eq('user_id', userId).single();
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

export default useWallet;
