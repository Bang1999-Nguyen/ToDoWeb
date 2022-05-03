import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { purple } from "@mui/material/colors";
import InputToDoForm from "./InputToDoForm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ToDoForm = (props) => {
  const { openModal, handleCloseModal, createToDoList } = props;

  const handleResetForm = () => {
    formik.resetForm();
    handleCloseModal();
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      createDate: "",
      description: "",
      status: true,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Tên công việc không được bỏ trống"),
      createDate: Yup.string().required("Ngày tạo không được bỏ trống"),
    }),
    onSubmit: (values) => {
      createToDoList(values);
      handleResetForm();
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} id="todoForm">
        <BootstrapDialog
          onClose={handleCloseModal}
          open={openModal}
          maxWidth="lg"
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleCloseModal}
            sx={{ fontSize: "18px" }}
          >
            Tạo công việc / nhiệm vụ
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <InputToDoForm formik={formik} />
          </DialogContent>
          <DialogActions sx={{ my: 2, mx: 2 }}>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{
                mr: 1,
                px: 4,
                backgroundColor: purple[500],
                color: "white",
                "&:hover": {
                  backgroundColor: purple[500],
                },
              }}
            >
              Đóng
            </Button>
            <Button
              variant="contained"
              onClick={formik.handleSubmit}
              form="todosForm"
            >
              Lưu
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </>
  );
};

export default ToDoForm;
