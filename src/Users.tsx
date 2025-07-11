import { useQuery } from '@tanstack/react-query';
import type { IUser } from './types';

export function Users() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<IUser[]> => {
      const response = await fetch('http://localhost:3000/users');
      return response.json();
    }
  });

  return (
    <div>
      {data?.map((user) => (
      <div key={user.id}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    ))}
    </div>
  )
}