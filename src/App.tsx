import { useQuery, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
interface IUser {
  id: string;
  name: string;
  email: string;
}

export function App() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<IUser[]> => {
      const response = await fetch('http://localhost:3000/users');
      return response.json();
    }
  }, queryClient);

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