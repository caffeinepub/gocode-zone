import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Contact } from '../backend';

export function useGetAllContacts() {
  const { actor, isFetching } = useActor();

  return useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      emailAddress,
      message,
    }: {
      name: string;
      emailAddress: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.onContact(name, emailAddress, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}
