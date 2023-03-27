"use client";
import { Modal, Box, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  Label?: React.ElementType;
  textLabel: string;
  title: string;
  buttonStyle: string;
  children?: JSX.Element;
}

export default function StandardModal({
  Label,
  textLabel,
  title,
  children,
  buttonStyle,
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
    maxHeight: "90vh",
    maxWidth: "85vw",
  };
  const [open, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!open);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={handleOpen}
        className={buttonStyle}
        type="button"
      >
        {(Label && <Label />) || textLabel}
      </button>
      <Modal
        open={open}
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
          {children}
        </Box>
      </Modal>
    </>
  );
}
