import { useState } from 'react';
import { useUsers } from './hooks/useUsers';

export function Users() {
  // const [shouldFetch, setShouldFetch] = useState(false);

  const { users, isLoading, refetch, isPending, isFetching, error } = useUsers();
 
  function handleClick() {
    // setShouldFetch(true);
    refetch();
  }

  return (
    <div className='p-4'>
      <button className='bg-blue-500 text-white p-2 rounded' onClick={handleClick}>
        Logar
      </button>
      {isLoading && <h3>Carregando...</h3>}
      {!isLoading && isFetching && <small>Atualizando...</small>}
      {error && <h3 className='text-red-500'>{error.toString()}</h3>}

      {users.map((user) => (
      <div key={user.id}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    ))}
    </div>
  )
}