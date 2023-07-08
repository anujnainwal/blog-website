import React from "react";
import { Alert, Snackbar } from "@mui/material";

const Notification = ({
  type,
  message,
  open,
  onClose,
  severity = "success",
  autoHideDuration = 5000,
}) => {
  const getNotification = () => {
    switch (type) {
      case "success":
        return (
          <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
          >
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>
        );
      case "error":
        return (
          <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
          >
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>
        );
      // Add more cases for other notification types if needed
      default:
        return null;
    }
  };

  return getNotification();
};

export default Notification;
