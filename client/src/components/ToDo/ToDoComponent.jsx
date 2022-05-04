import { Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  faCircleArrowDown,
  faCircleArrowUp,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import DialogConfirm from "./ToDoForm/DialogConfirm";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const useStyles = makeStyles(() => ({
  scheduleItem: {
    color: "black",
    border: `1px solid #777777`,
    borderRadius: "8px",
  },

  headerItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textDay: {
    padding: "4px 0",
    whiteSpace: "nowrap",
    width: "80px",
  },
}));

const ToDoComponent = (props) => {
  const classes = useStyles();
  const { todo, handleUpdateToDo, handleDeleteToDoList } = props;
  const [openModule, setOpenModule] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [todoItem, setToDoItem] = useState("");
  const handleOpenDialog = (todo) => {
    setDialog(true);
    setToDoItem(todo);
  };
  const handleCloseDialog = () => {
    setDialog(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, py: 0.5 }}>
        <Box className={classes.scheduleItem}>
          <Box className={classes.headerItem} sx={{ p: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ width: 25, height: 25 }}
                onClick={() => setOpenModule(!openModule)}
              >
                {openModule ? (
                  <FontAwesomeIcon icon={faCircleArrowUp} sx={{ mr: 2 }} />
                ) : (
                  <FontAwesomeIcon icon={faCircleArrowDown} sx={{ mr: 2 }} />
                )}
              </IconButton>
              <Typography variant="subtitle1" sx={{ mx: 2 }}>
                {todo.title}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                component="span"
                color="inherit"
                sx={{ width: 34, height: 34 }}
                onClick={() => handleUpdateToDo(todo)}
              >
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ fontSize: "16px", color: "#999999" }}
                />
              </IconButton>
              <IconButton
                component="span"
                color="inherit"
                onClick={() => handleOpenDialog(todo)}
                sx={{ width: 34, height: 34 }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ fontSize: "16px", color: "#999999" }}
                />
              </IconButton>
            </Box>
          </Box>

          <Collapse
            in={openModule}
            sx={{ px: 1, borderTop: `1px solid #777777` }}
          >
            <Box sx={{ flexGrow: 1, pl: 4, py: 1 }}>
              <Box container sx={{ display: "flex", py: 0.5 }}>
                <Grid
                  item
                  sx={{
                    typography: "body2",
                    color: "black",
                    fontWeight: "600",
                  }}
                  xs={4}
                  sm={3}
                  md={3}
                >
                  <span>Tên công việc/nhiệm vụ</span>
                </Grid>
                <Grid item width="100%">
                  <span>{todo.title}</span>
                </Grid>
              </Box>

              <Box container sx={{ display: "flex", py: 0.5 }}>
                <Grid
                  item
                  sx={{
                    typography: "body2",
                    color: "black",
                    fontWeight: "600",
                  }}
                  xs={4}
                  sm={3}
                  md={3}
                >
                  <span>Mức độ hoàn thành</span>
                </Grid>
                <Grid item width="100%">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "-10px",
                    }}
                  >
                    <Checkbox
                      checked={Boolean(todo.status)}
                      //   onChange={(e) => {
                      //     handleCheckedDayWork(index, day);
                      //   }}
                    />
                    <span>
                      {todo.status ? "Đã hoàn thành" : "Chưa hoàn thành"}
                    </span>
                  </Box>
                </Grid>
              </Box>
              <Box container sx={{ display: "flex", py: 0.5 }}>
                <Grid
                  item
                  sx={{
                    typography: "body2",
                    color: "black",
                    fontWeight: "600",
                  }}
                  xs={4}
                  sm={3}
                  md={3}
                >
                  <span>Ngày tạo</span>
                </Grid>
                <Grid item width="100%">
                  <span>{todo.createDate}</span>
                </Grid>
              </Box>

              <Box container sx={{ display: "flex", py: 0.5 }}>
                <Grid
                  item
                  sx={{
                    typography: "body2",
                    color: "black",
                    fontWeight: "600",
                  }}
                  xs={4}
                  sm={3}
                  md={3}
                >
                  <span>Mô tả</span>
                </Grid>
                <Grid item width="100%">
                  <span>{todo.description}</span>
                </Grid>
              </Box>
            </Box>
          </Collapse>
        </Box>
        <DialogConfirm
          dialog={dialog}
          handleCloseDialog={handleCloseDialog}
          todoItem={todoItem}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </Box>
    </>
  );
};

export default ToDoComponent;
