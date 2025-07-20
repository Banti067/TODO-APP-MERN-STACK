import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Slide,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const PopupDialog = ({ open, handleClose, message, isSuccess, buttonText }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 4, // square-ish shape
          width: 350,
          padding: 2,
          textAlign: "center",
        },
      }}
    >
      <Box position="relative">
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {isSuccess ? (
            <CheckCircleIcon fontSize="large" color="success" />
          ) : (
            <ErrorIcon fontSize="large" color="error" />
          )}
        </DialogTitle>

        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {isSuccess ? "Registration Successful!" : "Something Went Wrong"}
          </Typography>
          <Typography>{message}</Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color={isSuccess ? "success" : "error"}
            onClick={handleClose}
            sx={{ borderRadius: 2, px: 4 }}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default PopupDialog;
