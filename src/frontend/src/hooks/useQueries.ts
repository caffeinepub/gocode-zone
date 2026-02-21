import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Contact, CourseUnit, Announcement, Lesson, Member } from '../backend';
import { Principal } from '@dfinity/principal';

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

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCourseUnits() {
  const { actor, isFetching } = useActor();

  return useQuery<CourseUnit[]>({
    queryKey: ['courseUnits'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCourseUnits();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateCourseContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      unitId,
      title,
      description,
      topics,
    }: {
      unitId: bigint;
      title: string;
      description: string;
      topics: string[];
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateCourseContent(unitId, description, title, topics);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseUnits'] });
    },
  });
}

export function useGetAllAnnouncements() {
  const { actor, isFetching } = useActor();

  return useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePublishAnnouncement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.publishAnnouncement(title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export function useGetAllLessons() {
  const { actor, isFetching } = useActor();

  return useQuery<Lesson[]>({
    queryKey: ['lessons'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLessons();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddLesson() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      unitId,
      title,
      content,
      order,
    }: {
      unitId: bigint;
      title: string;
      content: string;
      order: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addLesson(unitId, title, content, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
}

export function useGetVIPMembers() {
  const { actor, isFetching } = useActor();

  return useQuery<Member[]>({
    queryKey: ['vipMembers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVIPMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateVIPStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      principal,
      isVIP,
    }: {
      principal: Principal;
      isVIP: boolean;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateVIPStatus(principal, isVIP);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vipMembers'] });
    },
  });
}
