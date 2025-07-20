import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Close as CloseIcon, Error, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const BounceDialog = ({ open, onClose, isSuccess, message, buttonText, onAction }) => {
  const fullScreen = useMediaQuery("(max-width:600px)");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{
        component: MotionBox,
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 },
        transition: { type: "spring", stiffness: 300, damping: 20 },
        sx: {
          borderRadius: 4,
          width: 350,
          p: 2,
          textAlign: "center",
        },
      }}
    >
      <Box position="relative">
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {isSuccess ? (
            <CheckCircle fontSize="large" color="success" />
          ) : (
            <Error fontSize="large" color="error" />
          )}
        </DialogTitle>

        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {isSuccess ? "🎉 Registration Successful!" : "⚠️ Oops!"}
          </Typography>
          <Typography>{message}</Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={onAction}
            variant="contained"
            color={isSuccess ? "success" : "error"}
            sx={{ borderRadius: 2, px: 4 }}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default BounceDialog;
