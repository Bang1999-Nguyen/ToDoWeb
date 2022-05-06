import { Box, IconButton } from "@mui/material";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogConfirm from "./ToDoForm/DialogConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

const ToDoComponent = (props) => {
  const { todo, handleUpdateToDo, handleDeleteToDoList } = props;
  const [dataTable, setDataTable] = useState([]);

  const [dialog, setDialog] = useState(false);

  const [todoItem, setToDoItem] = useState("");

  const handleOpenDialog = (todo) => {
    setDialog(true);
    setToDoItem(todo);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const fetchToDoStatus = () => {
    const rows = [
      todo.map((item) => {
        const title = item.title;
        const createDate = item.createDate;
        const description = item.description;
        const status = item.status;
        const _id = item._id;
        return { title, createDate, description, status, _id, checked: false };
      }),
    ];
    setDataTable(rows[0]);
  };

  const handleCheckedAction = (todo) => {
    const dataRow = [...dataTable];
    let itemChecked = dataRow.findIndex((item) => item._id === todo._id);
    dataRow[itemChecked] = {
      ...dataRow[itemChecked],
      checked: !todo.checked,
    };
    setDataTable(dataRow);
  };

  useEffect(() => {
    fetchToDoStatus();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Tên công việc/nhiệm vụ</TableCell>
              <TableCell align="left">Ngày tạo</TableCell>
              <TableCell align="left">Mô tả</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="left">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox
                    checked={row.checked}
                    onChange={(e) => {
                      handleCheckedAction(row);
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.title}
                </TableCell>
                <TableCell align="leftr">{row?.createDate}</TableCell>
                <TableCell align="left">{row?.description}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: row.status ? "#C8E2B1" : "#FCDAD5",
                      padding: "5px 10px",
                      width: row.status ? "70%" : "80%",
                      borderRadius: "30px",
                      textAlign: "center",
                      fontSize: "13px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{
                        fontSize: "8px",
                        color: row.status ? "#006600" : "#FF3300",
                        marginRight: "4px",
                      }}
                    />
                    {row?.status ? "Đã hoàn thành" : "Chưa hoàn thành"}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      component="span"
                      color="inherit"
                      // sx={{ width: 34, height: 34 }}
                      sx={{
                        width: 34,
                        height: 34,
                        pointerEvents: `${row.checked ? "auto" : "none"}`,
                      }}
                      onClick={() => handleUpdateToDo(row)}
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{
                          fontSize: "16px",
                          color: `${row.checked ? "#363636" : "#C2C2C2"}`,
                        }}
                      />
                    </IconButton>
                    <IconButton
                      component="span"
                      color="inherit"
                      sx={{
                        width: 34,
                        height: 34,
                        pointerEvents: `${row.checked ? "auto" : "none"}`,
                      }}
                      onClick={() => handleOpenDialog(row)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          fontSize: "16px",
                          color: `${row.checked ? "#363636" : "#C2C2C2"}`,
                        }}
                      />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogConfirm
          dialog={dialog}
          handleCloseDialog={handleCloseDialog}
          todoItem={todoItem}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </TableContainer>
    </>
  );
};

export default ToDoComponent;
