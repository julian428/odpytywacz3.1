"use client";
import { Modal, Box, Typography } from "@mui/material";
import { ReactNode, RefObject, useEffect, useState } from "react";

interface Props {
  label: Element | string;
  title: string;
  buttonStyle: string;
  children?: ReactNode;
}

export default function StandardModal({
  label,
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
    background: "#d3d3d3",
    padding: "1rem",
    textAlign: "center",
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
      >
        {label}
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
            className="text-60"
          >
            {title}
          </Typography>
          {children}
        </Box>
      </Modal>
    </>
  );
}