import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

import InputUser from "../InputUser";

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
  const classes = useStyles();
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
              <span>CREATE ACCOUNT</span>
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
                <InputUser />
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
