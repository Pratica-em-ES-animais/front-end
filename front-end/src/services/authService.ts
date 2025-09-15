import { api } from '@/../lib/api';

import { UserCreationPayload } from '@/types/user';

export const authService = {

  register: async (payload: UserCreationPayload): Promise<void> => {
    try {
      await api.post('/createUser', payload);
    } catch (error) {
      console.error("Erro no registro:", error);
      throw new Error('Não foi possível criar o usuário. Tente novamente.');
    }
  }
};