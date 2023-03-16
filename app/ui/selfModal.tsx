import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  text: string;
}

export default function StandardSelfModal({
  isOpen,
  handleClose,
  title,
  text,
}: Props) {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const styleBox = {
    background: "#555555",
    padding: "1rem",
    textAlign: "center",
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={style}
    >
      <Box sx={styleBox}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {title}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
        >
          {text}
        </Typography>
      </Box>
    </Modal>
  );
}
