import { useQuery } from '@tanstack/react-query';
import type { IUser } from '../types';
import { sleep } from '../sleep';

export function useUsers() {
  const { data, isLoading, refetch, isPending, isFetching, error } = useQuery({
    enabled: true, 
    queryKey: ['users'],
    queryFn: async (): Promise<IUser[]> => {
      await sleep();
      const response = await fetch('http://localhost:3000/users');
      // throw new Error('Erro ao buscar usuários');
      return response.json();
    }
  });

  return { 
    users: data ?? [], 
    isLoading, 
    refetch, 
    isPending, 
    isFetching, 
    error 
  };
}