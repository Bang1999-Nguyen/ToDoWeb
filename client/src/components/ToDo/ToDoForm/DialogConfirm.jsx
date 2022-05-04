import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import React from "react";

Dialog.propTypes = {
  fullWidth: PropTypes.string,
  maxWidth: PropTypes.string,
};

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <>
      <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{
              right: 2,
              top: 2,
              color: "red",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    </>
  );
};

const DialogConfirm = (props) => {
  const { dialog, handleCloseDialog, todoItem, handleDeleteToDoList } = props;
  return (
    <>
      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={dialog}
        onClose={handleCloseDialog}
      >
        <BootstrapDialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textTransform: "none",
            px: 3,
            py: 2,
          }}
        >
          {`Xóa công việc / nhiệm vụ ${todoItem.title}`}
        </BootstrapDialogTitle>

        <DialogContent sx={{ px: 3, py: 0 }}>
          <DialogContentText>{`Các thông tin của công việc sẽ mất, bạn có chắc chắn muốn xoá?`}</DialogContentText>
        </DialogContent>

        <DialogActions sx={{ mb: 2, mt: 1, px: 3 }}>
          <Button
            sx={{
              mr: 1,
              px: 3,
              py: 1,
              backgroundColor: "#002884",
              color: "white",
              "&:hover": {
                backgroundColor: "#002884",
              },
            }}
            onClick={handleCloseDialog}
          >
            Đóng
          </Button>
          <Button
            sx={{ px: 6, py: 1 }}
            variant="contained"
            color="error"
            onClick={() => handleDeleteToDoList(todoItem)}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogConfirm;
