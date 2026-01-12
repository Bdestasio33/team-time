import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "../api";

export interface Proposal {
  id: number;
  proposedAt: string;
  proposerId: number;
  proposerName: string;
  upvotes: number;
  downvotes: number;
  userVote: number | null;
}

export interface Event {
  id: number;
  name: string;
  description: string | null;
  state: "voting" | "finalized";
  creatorId: number;
  creatorName: string;
  finalizedTimeId: number | null;
  createdAt: string;
  proposals: Proposal[];
}

interface EventsResponse {
  events: Event[];
}

interface EventResponse {
  event: Event;
}

interface CreateEventInput {
  name: string;
  description?: string;
  proposedTimes: string[];
}

interface ProposeTimeInput {
  eventId: number;
  proposedAt: string;
}

interface VoteInput {
  eventId: number;
  proposalId: number;
  vote: 1 | -1;
}

interface FinalizeInput {
  eventId: number;
  proposalId: number;
}

interface DeleteVoteInput {
  eventId: number;
  proposalId: number;
}

export function useEvents(includePast = false) {
  return useQuery({
    queryKey: ["events", { includePast }],
    queryFn: () =>
      apiCall<EventsResponse>(
        `/events${includePast ? "?includePast=true" : ""}`,
      ),
    select: (data) => data.events,
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => apiCall<EventResponse>(`/events/${id}`),
    select: (data) => data.event,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateEventInput) =>
      apiCall("/events", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useProposeTime() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, proposedAt }: ProposeTimeInput) =>
      apiCall(`/events/${eventId}/proposals`, {
        method: "POST",
        body: JSON.stringify({ proposedAt }),
      }),
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    },
  });
}

export function useVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, proposalId, vote }: VoteInput) =>
      apiCall(`/events/${eventId}/proposals/${proposalId}/vote`, {
        method: "POST",
        body: JSON.stringify({ vote }),
      }),
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    },
  });
}

export function useDeleteVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, proposalId }: DeleteVoteInput) =>
      apiCall(`/events/${eventId}/proposals/${proposalId}/vote`, {
        method: "DELETE",
      }),
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    },
  });
}

export function useFinalizeEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, proposalId }: FinalizeInput) =>
      apiCall(`/events/${eventId}/finalize`, {
        method: "PATCH",
        body: JSON.stringify({ proposalId }),
      }),
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    },
  });
}
