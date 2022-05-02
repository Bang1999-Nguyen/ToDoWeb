import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

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
    height: "70%",
  },
  allSection: {
    width: "90%",
    height: "90%",
  },
});

const DashBoard = () => {
  const classes = useStyles();
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
              <Link to="/login">GET STARTED</Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashBoard;
