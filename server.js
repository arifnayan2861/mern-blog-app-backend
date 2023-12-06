import express from "express";
import dotnev from "dotenv";
import connectToDB from "./config/db.js";

// routes
import userRoutes from "./routes/userRoutes.js";

dotnev.config();

connectToDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("sever is running");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
