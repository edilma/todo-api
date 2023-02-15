import { getFirestoreInstance } from "./utils.js";
import { FieldValue } from "firebase-admin/firestore";

export function getAllTasks(req, res){
    const db = getFirestoreInstance();
    console.log("Got connected")

    db.collection("tasks").sortBy("created At","desc").get()
    .then(collection =>{
        const tasks = collection.docs.map(doc =>({taskId: doc.id, ...doc.data()
        }))
        res.send(tasks)
    })
    .catch(err => res.status(500).json({error: err.message}))

}

export async function addTask(req,res){
    const {task} = req.body;
    const newTask = {task, createdAt:FieldValue.serverTimestamp() }
    db = await getFirestoreInstance();
    db.collection("tasks").add(newTask)
    //if it is successful just call the alltasks.  They contain the new one
    //and is faster because react has the old ones
    .then(()=> getAllTasks(req,res))
    .catch(err => res.status(500).send({error: err.message}))
}

export async function updateTask (req,res){
    const {done} = req.body;
    const {taskId} = req.params
    const db = await getFirestoreInstance();
    db.collection("taks").doc(taskId).update({done})
        .then(()=>getAllTasks(req,res))
        .catch(err => res.status(500).send({error: err.message}))
}