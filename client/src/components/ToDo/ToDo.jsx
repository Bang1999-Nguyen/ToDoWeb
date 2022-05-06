import React, { useEffect, useState, useContext } from "react";
import Cookies from "universal-cookie";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import moment from "moment";
import ToDoComponent from "./ToDoComponent";
import { ToDoContext } from "../../contexts/ToDoContext/ToDoContext";
import ToDoForm from "./ToDoForm/ToDoForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSippner from "../Lazy/LoadingSippner";
toast.configure({});

const useStyles = makeStyles({
  todoSection: {
    width: "100%",
    height: "100vh",
    backgroundImage:
      'url("https://media-www.sqspcdn.com/images/pages/tour/overview-websites/blog-features-block/blog_ui-2-1500w.png")',
  },
  todoList: {
    width: "90%",
    height: "90%",
  },
  headerCollapse: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const ToDo = () => {
  const classes = useStyles();
  const cookies = new Cookies();
  const [toDoList, setToDoList] = useState("");
  const token = cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const { getToDoList, createToDoList, updateToDoList, deleteToDoList } =
    useContext(ToDoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [todoCurrent, setTodoCurrent] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditing(false);
  };
  const handleOpenDialogUpdate = (todo) => {
    setOpenModal(true);
    setIsEditing(true);
    setTodoCurrent(todo);
  };

  const fetchToDoList = () => {
    setIsLoading(true);
    getToDoList(token)
      .then((response) => {
        setToDoList(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        return error;
      });
  };

  const handleCreateTodoList = (values) => {
    const bodyData = {
      ...values,
      createDate: moment(values.createDate).format("DD/MM/YYYY"),
    };
    setIsLoading(true);
    createToDoList(bodyData, token)
      .then((res) => {
        setIsLoading(false);
        toast.success("Tạo công việc / nhiệm vụ thành công");
        fetchToDoList();
      })
      .catch((error) => {
        setIsLoading(false);
        return error;
      });
  };

  const handleUpdateToDoList = (todo) => {
    const bodyData = {
      title: todo.title,
      description: todo.description,
      status: todo.status,
      createDate: moment(todo.createDate).format("DD/MM/YYYY"),
    };
    setIsLoading(true);
    updateToDoList(todo._id, bodyData, token)
      .then((res) => {
        setIsLoading(false);
        toast.success("Cập nhật công việc / nhiệm vụ thành công");
        fetchToDoList();
      })
      .catch((error) => {
        setIsLoading(false);
        return error;
      });
  };

  const handleDeleteToDoList = (todo, handleCloseDialog) => {
    deleteToDoList(todo._id, token)
      .then((res) => {
        setIsLoading(false);
        toast.success("Xoá công việc / nhiệm vụ thành công");
        handleCloseDialog();
        fetchToDoList();
      })
      .catch((error) => {
        setIsLoading(false);
        return error;
      });
  };

  useEffect(() => {
    fetchToDoList();
  }, []);

  return (
    <>
      {isLoading ? <LoadingSippner /> : null}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={3}>
            <Box className={classes.todoSection}></Box>
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box className={classes.todoList}>
              <Box className={classes.headerCollapse} sx={{ pb: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    {`To-Do Lists`}
                  </Typography>
                </Box>
                <Button
                  sx={{ height: "40px" }}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleOpenModal}
                >
                  Tạo mới
                </Button>
              </Box>
              {toDoList.length > 0 ? (
                <Box>
                  <ToDoComponent
                    todo={toDoList}
                    handleUpdateToDo={handleOpenDialogUpdate}
                    handleDeleteToDoList={handleDeleteToDoList}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "70%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"
                    alt="empty"
                    width={400}
                    height={300}
                  />
                </Box>
              )}
            </Box>
          </Grid>
          <ToDoForm
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            createToDoList={handleCreateTodoList}
            isEditing={isEditing}
            todoCurrent={todoCurrent}
            handleUpdateToDoList={handleUpdateToDoList}
          />
        </Grid>
      </Box>
    </>
  );
};

export default ToDo;
