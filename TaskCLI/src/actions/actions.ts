import { Tasks } from "../types"
import { writeFileSync, readFileSync } from "fs"

const PATH = "./tasks.json"

const loadTasks = async () => {
    try {
        const tasks =  readFileSync(PATH, "utf-8")
        return tasks

    } catch (error) {
        writeFileSync(PATH, JSON.stringify([]),"utf-8")
        return await loadTasks()
    } 

    
}

const writeTasks = async (tasks: Tasks[]) => {
    try {
        writeFileSync(PATH, JSON.stringify(tasks), "utf-8")
    } catch (error) {
        console.log(error);
    }
}


const getAllTasks = async () => {
    return await loadTasks()
}


const addTask = async (task: Pick<Tasks,"title" | "status" | "description">) => {
    const load = await loadTasks()
    

    const tasks = JSON.parse(load) as Tasks[]
    console.log(task.status);
    
    tasks.push({
        id: tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1,
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: new Date().toISOString(),
    })
    

    await writeTasks(tasks)
}


const updateTask = async (id: number, task: Partial<Tasks>) => {
    const load = await loadTasks()

    const tasks = JSON.parse(load) as Tasks[]

    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id.toString()))

    if (taskIndex === -1) {
        throw new Error("Task not found")
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: task.title || tasks[taskIndex].title,
        description: task.description || tasks[taskIndex].description,
        status: task.status || tasks[taskIndex].status,
        updatedAt: new Date().toISOString(),
    }


    await writeTasks(tasks)
}



const getOneTask = async (id: number) => {
    const load = await loadTasks()

    const tasks = JSON.parse(load) as Tasks[]

    const task = tasks.find((task) => task.id === id)

    if (!task) {
        throw new Error("Task not found")
    }

    return task
}


const deleteTasks = async (id: number) => {
    const load = await loadTasks()

    const tasks = JSON.parse(load) as Tasks[]

    const taskIndex = tasks.findIndex((task) => task.id === id)

    if (taskIndex === -1) {
        throw new Error("Task not found")
    }

    tasks.splice(taskIndex, 1)

    await writeTasks(tasks)
}


const getTaskByStatus = async (status: Tasks["status"]) => {
    const load = await loadTasks()

    const tasks = JSON.parse(load) as Tasks[]

    return tasks.filter((task) => task.status === status)
}

export { addTask, getAllTasks, updateTask, getOneTask, deleteTasks, getTaskByStatus }