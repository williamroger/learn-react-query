import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { sleep } from './sleep';
import type { IUser } from './types';

export function Posts() {
  const queryClient = useQueryClient();
  
  function handleMouseOver() {
    queryClient.prefetchQuery({
      queryKey: ['users'],
      queryFn: async (): Promise<IUser[]> => {
        await sleep();
        const response = await fetch('http://localhost:3000/users');
        // throw new Error('Erro ao buscar usuários');
        return response.json();
      }
    })
  }

  return (
    <div>
      <h1>Posts</h1>
      <Link to="/" onMouseOver={handleMouseOver}>Ir para os usuários</Link>
    </div>
  )
}