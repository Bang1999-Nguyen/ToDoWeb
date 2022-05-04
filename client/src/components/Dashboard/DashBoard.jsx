import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const useStyles = makeStyles({
  bgDashboard: {
    height: "100vh",
    backgroundImage:
      'url("https://media-www.sqspcdn.com/images/pages/tour/overview-websites/blog-features-block/background-1500w.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bgCustom: {
    width: "80%",
    height: "70%",
    backgroundImage:
      'url("https://media-www.sqspcdn.com/images/pages/tour/overview-websites/blog-features-block/blog_ui-2-1500w.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  titleDashboard: {
    width: "100%",
    height: "30%",

    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  typo: {
    fontSize: "44px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "1em",
  },
  description: {
    width: "100%",
    height: "20%",
  },
  btnStyle: {
    width: "100%",
  },
  allSection: {
    width: "90%",
    height: "80%",
  },
  textDashboard: {
    fontSize: "19px",
    fontWeight: "600",
    cursor: "pointer",
  },
});

const DashBoard = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [accessToken, setAccessToken] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    setAccessToken(token);
  }, [token]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={6} className={classes.bgDashboard}>
          <Box className={classes.bgCustom}></Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box className={classes.allSection}>
            <Box className={classes.titleDashboard}>
              <Typography
                gutterBottom
                sx={{ fontSize: "40px", fontWeight: "500" }}
              >
                To-Do List App
              </Typography>
            </Box>
            <Box className={classes.description}>
              <span
                style={{
                  color: "black",
                  lineHeight: "30px",
                  fontSize: "19px",
                  fontWeight: "400",
                }}
              >
                Get a free to-do list from Friday, and sync your calendar to
                always know what's next. Your task list sits alongside your
                daily meetings for clarity on what you need to accomplish next.
              </span>
            </Box>
            <Box className={classes.btnStyle}>
              <span className={classes.textDashboard}>
                {" "}
                {accessToken === null || accessToken === undefined ? (
                  <Link to="/login" style={{ color: "black" }}>
                    GET STARTED
                  </Link>
                ) : (
                  <Link to="/todo" style={{ color: "black" }}>
                    GO TO-DO LIST
                  </Link>
                )}
                <span style={{ margin: "0 5px" }}>→</span>
              </span>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashBoard;
