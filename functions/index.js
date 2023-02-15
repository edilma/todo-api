import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { getAllTasks,addTask,updateTask } from "./src/task.js";

const app = express();
app.use(cors())
app.use(express.json())

app.get("/tasks", getAllTasks)
app.post("/tasks", addTask)
app.patch("/tasks/:taksId", updateTask)

export const api= functions.https.onRequest(app)