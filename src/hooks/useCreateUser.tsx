import { useMutation } from '@tanstack/react-query';
import type { IUser } from '../types';
import { sleep } from './sleep';

export function useCreateUser() {
  return useMutation({
    mutationFn: async(variables: { name: string, email: string, }): Promise<IUser> => {
      const { name, email } = variables;
      // console.log('mutationFn() executou!');
      // throw new Error('Erro ao cadastrar usuário');
      await sleep();

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      return response.json();
    },
    onError: (error, variables) => {
      console.log(`Erro na request.\n${error.toString()}\nVariáveis: ${JSON.stringify(variables)}`);
    },
    onSuccess: (data, variables) => {
      console.log('onSuccess: ', data, variables)
    },
    onSettled: (data, error, variables) => {
      if (data) {
        console.log('Usuário cadastrado com sucesso:', data);
      }
      if (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    }
  });
}