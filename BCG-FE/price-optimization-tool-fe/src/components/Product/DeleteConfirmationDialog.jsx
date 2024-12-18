import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

// A dialog for a confirmation before deleting the product
const DeleteConfirmationDialog = ({
  deleteModal,
  handleDeleteModal,
  handleDelete,
}) => {
  return (
    <Dialog
      open={deleteModal}
      onClose={handleDeleteModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this product?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Note : Once product is deleted it cannot be recovered by any means.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteModal}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
