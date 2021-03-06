import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import InputUser from "../InputUser";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();

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
      'url("https://media-www.sqspcdn.com/images/pages/tour/overview-websites/customer-quote-block/adrienne-raquel-1500w.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  TextField: {
    width: "700px",
  },
});

const SignIn = () => {
  let navigate = useNavigate();
  const classes = useStyles();
  const { handleSignIn } = useContext(UserContext);

  const handleLogIn = (user) => {
    handleSignIn(user)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Đăng nhập thành công");
          cookies.set("token", res.data.accessToken);
          setTimeout(() => {
            navigate(`/todo`, { replace: true });
          }, 2500);
        } else {
          toast.error("Lỗi đăng nhập");
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
            >
              <Link to="/register">
                <span>CREATE ACCOUNT</span>
              </Link>
            </Grid>
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
                <InputUser page={"login"} handleSignIn={handleLogIn} />
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

export default SignIn;
