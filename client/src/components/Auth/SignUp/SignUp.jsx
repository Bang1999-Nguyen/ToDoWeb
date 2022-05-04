import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import InputUser from "../InputUser";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
toast.configure({});

const useStyles = makeStyles({
  bgSection: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  customText: {
    fontWeight: "600",
    fontSize: "14px",
  },
  imgSec: {
    width: "100%",
    height: "100%",
    backgroundImage:
      'url("https://images.unsplash.com/photo-1556741533-411cf82e4e2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")',
    backgroundSize: "100%",
    backgroundPosition: "100%",
    backgroundRepeat: "no-repeat",
  },
  TextField: {
    width: "700px",
  },
});

export const SignUp = () => {
  const classes = useStyles();
  const { handleSignUp } = useContext(UserContext);
  let navigate = useNavigate();

  const handleRegister = (user) => {
    handleSignUp(user)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Đăng ký tài khoản thành công");

          setTimeout(() => {
            navigate(`/login`, { replace: true });
          }, 2500);
        } else {
          toast.error("Lỗi đăng ký tài khoản");
        }
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <>
      <Box className={classes.bgSection}>
        <Box sx={{ width: "90%", height: "90%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6} className={classes.customText}>
              <span style={{ margin: "0 5px" }}>←</span>
              <span>BACK</span>
            </Grid>
            <Grid
              item
              xs={6}
              className={classes.customText}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            ></Grid>
          </Grid>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container sx={{ height: "80%", width: "100%" }}>
              <Grid item xs={6}>
                <InputUser page={"register"} handleRegister={handleRegister} />
              </Grid>

              <Grid item xs={6} sx={{ height: "100%" }}>
                <Box className={classes.imgSec}></Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
