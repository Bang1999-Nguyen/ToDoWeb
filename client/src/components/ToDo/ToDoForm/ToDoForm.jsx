import React, { useState, useEffect } from "react";
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
import moment from "moment";

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
const initalState = {
  title: "",
  createDate: "",
  description: "",
  status: true,
};

const ToDoForm = (props) => {
  const {
    openModal,
    handleCloseModal,
    createToDoList,
    isEditing,
    todoCurrent,
    handleUpdateToDoList,
  } = props;

  const handleResetForm = () => {
    formik.resetForm();
    handleCloseModal();
  };
  const [toDoState, setToDoState] = useState(initalState);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: toDoState,
    validationSchema: Yup.object({
      title: Yup.string().required("T??n c??ng vi???c kh??ng ???????c b??? tr???ng"),
      createDate: Yup.string().required("Ng??y t???o kh??ng ???????c b??? tr???ng"),
    }),
    onSubmit: (values) => {
      if (isEditing) {
        handleUpdateToDoList(values);
      } else {
        createToDoList(values);
      }

      handleResetForm();
    },
  });
  let parsed = moment(todoCurrent.createDate, "MMMM Do YYYY, h:mm:ss a");

  useEffect(() => {
    if (isEditing) {
      setToDoState({
        ...todoCurrent,
        createDate: parsed.format(),
      });
    } else {
      setToDoState(initalState);
    }
  }, [isEditing]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} id="todoForm">
        <BootstrapDialog
          onClose={handleResetForm}
          open={openModal}
          maxWidth="lg"
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleResetForm}
            sx={{ fontSize: "18px" }}
          >
            {isEditing
              ? "Ch???nh s???a c??ng vi???c / nhi???m v???"
              : " T???o c??ng vi???c / nhi???m v???"}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <InputToDoForm formik={formik} />
          </DialogContent>
          <DialogActions sx={{ my: 2, mx: 2 }}>
            <Button
              variant="contained"
              onClick={handleResetForm}
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
              ????ng
            </Button>
            <Button
              variant="contained"
              onClick={formik.handleSubmit}
              form="todosForm"
            >
              L??u
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </>
  );
};

export default ToDoForm;
