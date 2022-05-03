const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://bangnguyen:bang2269@todoweb.hc1es.mongodb.net/ToDoWeb?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

// auth router
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

const PORT = 5000;

app.listen(PORT, () => console.log("Server is running"));
