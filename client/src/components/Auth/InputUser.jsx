import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
// import UserService from "../../services/Users/user.services";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#69a5a4",
  "&:hover": {
    backgroundColor: "#69a5a4",
  },
  width: "100%",
  padding: "12px 0",
  margin: "25px 0",
  cursor: "pointer",
  fontSize: "16px",
}));

const InputUser = (props) => {
  const { page, handleSignIn, handleRegister } = props;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Tên tài khoản không được bỏ trống"),
      password: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
          "Mật khẩu tối thiểu 6 kí tự, một chữ hoa, một chữ thường, một số và một ký tự viết hoa đặc biệt"
        ),
    }),
    onSubmit: (values) => {
      if (page === "login") {
        handleSignIn(values);
      } else {
        handleRegister(values);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} id="userForm">
      <Box>
        {page === "login" ? (
          <h2 style={{ color: "black", fontSize: "30px" }}>
            Log into To-Do List App
          </h2>
        ) : (
          <h2 style={{ color: "black", fontSize: "30px" }}>Create a Account</h2>
        )}

        <Box sx={{ height: "100%", width: "80%" }}>
          <Box sx={{ py: 2 }}>
            <Typography
              gutterBottom
              sx={{
                py: 1,
                color: "rgb(110, 110, 110)",
                letterSpacing: "1.75px",
                fontSize: "13px",
              }}
            >
              USERNAME
            </Typography>
            <TextField
              fullWidth
              label="Username"
              id="username"
              variant="filled"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username && formik.touched.username && (
              <Box sx={{ color: "red", fontSize: "0.75rem", mt: 1 }}>
                <span>{formik.errors.username}</span>
              </Box>
            )}
          </Box>
          <Box sx={{ py: 2 }}>
            <Typography
              gutterBottom
              sx={{
                py: 1,
                color: "rgb(110, 110, 110)",
                letterSpacing: "1.75px",
                fontSize: "13px",
              }}
            >
              PASSWORD
            </Typography>
            <TextField
              fullWidth
              label="Password"
              id="password"
              variant="filled"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <Box sx={{ color: "red", fontSize: "0.75rem", mt: 1 }}>
                <span>{formik.errors.password}</span>
              </Box>
            )}
          </Box>
          <ColorButton
            variant="contained"
            onClick={formik.handleSubmit}
            form="userForm"
          >
            {page === "login" ? "SIGN IN" : "SIGN UP"}
          </ColorButton>
        </Box>
      </Box>
    </form>
  );
};

export default InputUser;
