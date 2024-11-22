const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const DatabaseConnect = require("./Db");

DatabaseConnect(); // Database fn call

app.get("/", (req, res) => {
    res.send("Welcome");
});

// Routes
const userRouter = require("./Routes/userRoutes");
const postRouter = require("./Routes/postRoutes");
app.use(express.json()); //? to use json
app.use("/user", userRouter);
// app.use("/post", postRouter);
// Routes

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
