import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Users } from './Users';
import { Posts } from './Posts';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Usuários</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}