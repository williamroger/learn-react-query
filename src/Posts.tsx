import { useQuery } from '@tanstack/react-query';

import type { IUser } from './types';
import { sleep } from './sleep';

export function Posts() {
  const { data } = useQuery({
    enabled: true, // Disable automatic fetching
    queryKey: ['users'],
    staleTime: 5000,
    gcTime: 60000,
    queryFn: async (): Promise<IUser[]> => {
      await sleep();
      const response = await fetch('http://localhost:3000/users');
      return response.json();
    }
  });
  
  return (
    <div>
      <h1>Posts</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}