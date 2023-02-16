import { getFirestoreInstance } from "./utils.js";
import { FieldValue } from "firebase-admin/firestore";

export function getAllTasks(req, res){
    const db = getFirestoreInstance();
    console.log("Got connected")

    db.collection("tasks").orderBy("createdAt","desc").get()
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
    const db = await getFirestoreInstance();
    db.collection("tasks")
    //if it is successful just call the alltasks.  They contain the new one
    //and is faster because react has the old ones
        .add(newTask)
        .then(()=> getAllTasks(req,res))
        .catch(err => res.status(500).send({error: err.message}))
}

export async function updateTask (req,res){
    const {taskId} = req.params;
    const {task} = req.body
    const db = await getFirestoreInstance();
    db.collection("tasks")
        .doc(taskId)
        .update({task})
        .then(()=>getAllTasks(req,res))
        .catch(err => res.status(500).send({error: err.message}))
}

export async function deleteTask(req, res){

    const {taskId} = req.params
    const db = await getFirestoreInstance()

    db.collection("tasks")
        .doc(taskId)
        .delete()
        .then(() => getAllTasks(req, res))
        .catch(err => res.status(500).send({error: err.message}))
}

