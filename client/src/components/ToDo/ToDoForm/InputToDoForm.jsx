import React from "react";
import { Box, OutlinedInput, Typography, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateFnsUtils from "@date-io/date-fns";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Checkbox from "@mui/material/Checkbox";

function InputToDoForm(props) {
  const { formik } = props;

  const handleChangeDateTime = (datetime) => {
    formik.setFieldValue("createDate", datetime);
  };
  const handleCheckedStatus = (e) => {
    formik.setFieldValue("status", !formik.values.status);
  };
  const handleChangeDescription = (e) => {
    formik.setFieldValue("description", e.target.value);
  };
  return (
    <>
      <Box style={{ padding: "15px 20px" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle4" sx={{ fontSize: "14px" }}>
              Tên công việc / nhiệm vụ *
            </Typography>
            <OutlinedInput
              fullWidth
              size="small"
              id="title"
              name="title"
              variant="outlined"
              autoFocus={true}
              sx={{ my: 1, py: 0.3, width: "400px" }}
              placeholder="Nhập tên công việc"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title && (
              <Box sx={{ color: "red", fontSize: "0.75rem" }}>
                <span>{formik.errors.title}</span>
              </Box>
            )}
          </Box>

          <Box sx={{ mb: 2, ml: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle4" sx={{ fontSize: "14px" }}>
              Ngày tạo *
            </Typography>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                size="small"
                disablePast
                minDate={new Date()}
                value={formik.values.createDate}
                onChange={(newValue) => handleChangeDateTime(newValue)}
                inputProps={{
                  sx: {
                    height: "45px",
                    paddingTop: 0,
                    paddingBottom: 0,
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "100%", mt: 1, width: "400px" }}
                    {...params}
                    error={Boolean(false)}
                    helperText={null}
                  />
                )}
              />
            </LocalizationProvider>
            {formik.errors.createDate && formik.touched.createDate && (
              <Box sx={{ color: "red", fontSize: "0.75rem", mt: 1 }}>
                <span>{formik.errors.createDate}</span>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle4" sx={{ fontSize: "14px" }}>
            Mức độ hoàn thành *
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <Checkbox
              checked={formik.values.status}
              onChange={(e) => {
                handleCheckedStatus(e);
              }}
            />

            <span style={{ fontSize: "15px" }}>
              {formik.values.status ? "Đã hoàn thành" : "Chưa hoàn thành"}
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",

            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle4" sx={{ fontSize: "14px" }}>
            Mô tả *
          </Typography>

          <TextareaAutosize
            maxRows={40}
            placeholder="Nhập mô tả..."
            style={{
              width: "100%",
              margin: "10px 0",
              padding: "5px 0",
              height: "250px",
            }}
            value={formik.values.description}
            onChange={(e) => handleChangeDescription(e)}
          />
        </Box>
      </Box>
    </>
  );
}

export default InputToDoForm;
