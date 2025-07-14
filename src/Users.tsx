import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { IUser } from './types';
import { sleep } from './sleep';

export function Users() {
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, refetch, isPending, isFetching } = useQuery({
    enabled: shouldFetch, // Disable automatic fetching
    queryKey: ['users'],
    staleTime: 5000,
    queryFn: async (): Promise<IUser[]> => {
      await sleep();
      const response = await fetch('http://localhost:3000/users');
      return response.json();
    }
  });
 
  function handleClick() {
    setShouldFetch(true);
    refetch();
  }

  return (
    <div className='p-4'>
      <button className='bg-blue-500 text-white p-2 rounded' onClick={handleClick}>
        Logar
      </button>
      {isLoading && <h3>Carregando...</h3>}
      {!isLoading && isFetching && <small>Atualizando...</small>}
      {data?.map((user) => (
      <div key={user.id}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    ))}
    </div>
  )
}