import CheckIcon from "@mui/icons-material/Check";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  useDeleteVote,
  useEvent,
  useFinalizeEvent,
  useVote,
} from "../hooks/useEvents";
import { ProposeTimeDialog } from "./ProposeTimeDialog";

interface EventDetailProps {
  eventId: number;
  open: boolean;
  onClose: () => void;
}

export function EventDetail({ eventId, open, onClose }: EventDetailProps) {
  const { user } = useAuth();
  const [proposeDialogOpen, setProposeDialogOpen] = useState(false);

  const { data: event, isLoading } = useEvent(eventId);
  const voteMutation = useVote();
  const deleteVoteMutation = useDeleteVote();
  const finalizeMutation = useFinalizeEvent();

  const isCreator = user?.id === event?.creatorId;
  const isFinalized = event?.state === "finalized";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleVote = (proposalId: number, vote: 1 | -1) => {
    voteMutation.mutate({ eventId, proposalId, vote });
  };

  const handleRemoveVote = (proposalId: number) => {
    deleteVoteMutation.mutate({ eventId, proposalId });
  };

  const handleFinalize = (proposalId: number) => {
    finalizeMutation.mutate({ eventId, proposalId }, { onSuccess: onClose });
  };

  if (isLoading || !event) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent
          sx={{ display: "flex", justifyContent: "center", py: 4 }}
        >
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{event.name}</Typography>
            <Chip
              label={isFinalized ? "Finalized" : "Voting"}
              color={isFinalized ? "success" : "primary"}
              size="small"
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {event.description && (
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {event.description}
            </Typography>
          )}

          <Typography variant="caption" color="text.secondary" display="block">
            Created by {event.creatorName}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Proposed Times
          </Typography>

          <List disablePadding>
            {event.proposals.map((proposal) => {
              const isWinner = proposal.id === event.finalizedTimeId;
              const netVotes = proposal.upvotes - proposal.downvotes;

              return (
                <ListItem
                  key={proposal.id}
                  sx={{
                    bgcolor: isWinner ? "success.light" : "grey.50",
                    borderRadius: 1,
                    mb: 1,
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <ListItemText
                      primary={formatDate(proposal.proposedAt)}
                      secondary={`Proposed by ${proposal.proposerName}`}
                    />
                    {isWinner && (
                      <Chip
                        icon={<CheckIcon />}
                        label="Selected"
                        color="success"
                        size="small"
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    {!isFinalized && (
                      <>
                        <IconButton
                          size="small"
                          color={
                            proposal.userVote === 1 ? "primary" : "default"
                          }
                          onClick={() =>
                            proposal.userVote === 1
                              ? handleRemoveVote(proposal.id)
                              : handleVote(proposal.id, 1)
                          }
                        >
                          <ThumbUpIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color={proposal.userVote === -1 ? "error" : "default"}
                          onClick={() =>
                            proposal.userVote === -1
                              ? handleRemoveVote(proposal.id)
                              : handleVote(proposal.id, -1)
                          }
                        >
                          <ThumbDownIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                    <Typography
                      variant="body2"
                      color={
                        netVotes > 0
                          ? "success.main"
                          : netVotes < 0
                            ? "error.main"
                            : "text.secondary"
                      }
                    >
                      {netVotes > 0 ? "+" : ""}
                      {netVotes} ({proposal.upvotes} up, {proposal.downvotes}{" "}
                      down)
                    </Typography>

                    {isCreator && !isFinalized && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        sx={{ ml: "auto" }}
                        onClick={() => handleFinalize(proposal.id)}
                        disabled={finalizeMutation.isPending}
                      >
                        Select
                      </Button>
                    )}
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          {!isFinalized && (
            <Button onClick={() => setProposeDialogOpen(true)}>
              Propose Time
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <ProposeTimeDialog
        eventId={eventId}
        open={proposeDialogOpen}
        onClose={() => setProposeDialogOpen(false)}
      />
    </>
  );
}
