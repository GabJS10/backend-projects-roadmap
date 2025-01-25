import { program } from "commander";
import inquirer from "inquirer";
import { Tasks } from "../types";
import { addTask,getAllTasks, updateTask, deleteTasks, getOneTask,getTaskByStatus } from "../actions/actions";
import Table from "cli-table3";
program.version("0.0.1").description("A CLI for managing your notes");  


program.action(async () => {
    inquirer.prompt([
        {
            type: "input",
            name: "Name",
            message: "What is your name?",
        },
    ]).then((answers) => {
        console.log(answers);
    });
})


program.command("list").description("List all notes").action(async() => {
    const res = await getAllTasks();
    const tasks = JSON.parse(res) as Tasks[];
    
    
    const table = new Table({
        head: ['ID', 'Title', 'Description', 'Status'],
        colWidths: [10, 20, 40, 15]
    });

    tasks.forEach((task) => {
        table.push([task.id, task.title, task.description, task.status]);
    });

    console.log(table.toString());

})


program.command("status").description("List all notes by status").action(() => {
    inquirer.prompt([
        {
            type: "select",
            name: "status",
            message: "Select status",
            choices: ["done", "in progress", "todo"]
        },
    ]).then(async ({ status }: { status: Tasks["status"] }) => {
        const tasks = await getTaskByStatus(status);
        const table = new Table({
            head: ['ID', 'Title', 'Description', 'Status'],
            colWidths: [10, 20, 40, 15]
        });

        tasks.forEach((task) => {
            table.push([task.id, task.title, task.description, task.status]);
        });

        console.log(table.toString());
    });
})

program.command("get").description("Get a note").action(() => {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Note id",
        },
    ]).then(async({id}:{id:string}) => {
        try {
            const task = await getOneTask(parseInt(id));


            const table = new Table({
                head: ['ID', 'Title', 'Description', 'Status'],
                colWidths: [10, 20, 40, 15]
            });

            table.push([task.id, task.title, task.description, task.status]);

            console.log(table.toString());

        } catch (error) {
            console.log("Tasks not found");
        }
    });
})

program.command("delete").description("Delete a note").action(() => {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Note id",
        },
    ]).then(({id}:{id:string}) => {
        deleteTasks(parseInt(id));
        console.log("Note deleted");
        
    });
})

program.command("update").description("Update a note").action(() => {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Note id",
        },
        {
            type: "input",
            name: "title",
            message: "Note title",
        },
        {
            type: "input",
            name: "description",
            message: "Note description",
        },
        {
            type: "select",
            name: "status",
            message: "Completed?",
            choices: ["done","in progress","todo"]
        }
    ]).then(async (answers: Pick<Tasks,"title" | "status" | "description" | "id"  >) => {
        try {
            await updateTask(answers.id,answers);
        } catch (error) {
            console.log("Tasks not found");
            
        }
    });
})


program.command("add").description("Add a new note").action(() => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Note title",
        },
        {
            type: "input",
            name: "description",
            message: "Note description",
        },
        {
            type: "select",
            name: "status",
            message: "Completed?",
            choices: ["done","in progress","todo"]
        }
    ]).then((answers: Pick<Tasks,"title" | "status" | "description">) => {
        
        addTask(answers);
    });
    
});


program.parse(process.argv);