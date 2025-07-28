import { useCreateUser } from './hooks/useCreateUser';
import { useUsers } from './hooks/useUsers';

export function Users() {
  const { users, isLoading, refetch, isFetching, error } = useUsers();

  const { mutateAsync, isPending, data } = useCreateUser();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const elements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
    };
    const name = elements.name.value;
    const email = elements.email.value;

    try {
      const data = await mutateAsync({ name, email });
      
      if (data) {
        console.log(`Redirecionando o usuário para: /users/${data?.id}`);
      }
    } catch (error) {
      console.log(error)
    } finally {
      console.log('terminou de rodar...')
    }

  }

  function handleClick() {
    // setShouldFetch(true);
    refetch();
  }

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Digite seu nome"
            className='outline-none p-1 rounded-md text-zinc-900'
          />
          <input
            name="email"
            type="email"
            placeholder="Digite seu email"
            className='outline-none p-1 rounded-md text-zinc-900'
          />
          <button className='bg-blue-400 py-2 text-zinc-900 rounded-md'>
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
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