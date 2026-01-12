import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useProposeTime } from "../hooks/useEvents";

interface ProposeTimeDialogProps {
  eventId: number;
  open: boolean;
  onClose: () => void;
}

export function ProposeTimeDialog({
  eventId,
  open,
  onClose,
}: ProposeTimeDialogProps) {
  const [datetime, setDatetime] = useState("");
  const proposeMutation = useProposeTime();

  const handleSubmit = () => {
    if (!datetime) return;

    proposeMutation.mutate(
      { eventId, proposedAt: new Date(datetime).toISOString() },
      {
        onSuccess: () => {
          setDatetime("");
          onClose();
        },
      },
    );
  };

  const handleClose = () => {
    setDatetime("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Propose a Time</DialogTitle>
      <DialogContent>
        <TextField
          type="datetime-local"
          fullWidth
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          sx={{ mt: 1 }}
          inputProps={{
            min: new Date().toISOString().slice(0, 16),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!datetime || proposeMutation.isPending}
        >
          Propose
        </Button>
      </DialogActions>
    </Dialog>
  );
}
