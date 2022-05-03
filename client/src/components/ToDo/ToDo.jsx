import React, { useEffect, useState, useContext } from "react";
import Cookies from "universal-cookie";
import ToDoService from "../../services/ToDo/todo.service";
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
  const { getToDoList, createToDoList } = useContext(ToDoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
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
    createToDoList(bodyData, token)
      .then((res) => {
        toast.success("Tạo công việc / nhiệm vụ thành công");
        fetchToDoList();
      })
      .catch((error) => {
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
                  {toDoList.map((todo) => (
                    <ToDoComponent key={todo.id} todo={todo} />
                  ))}
                </Box>
              ) : null}
            </Box>
          </Grid>
          <ToDoForm
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            createToDoList={handleCreateTodoList}
          />
        </Grid>
      </Box>
    </>
  );
};

export default ToDo;