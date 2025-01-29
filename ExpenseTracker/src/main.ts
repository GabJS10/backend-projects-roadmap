import { program } from "commander";
import { Budget, Spent  } from "./types";
import { addExpense, deleteExpense, getAllExpenses, getExpensesByCategorie, addBudget } from "./db";
import Table  from "cli-table3";
program.version("1.1.1").description("A CLI for managing your expenses");


program
  .command("add")
  .description("Add a new expense")
  .option("-d, --description <description>", "Expense description")
  .option("-a, --amount <amount>", "Expense amount")
  .option("-c, --categorie <categorie>", "Expense category")
  .action(async (options: Pick<Spent, "description" | "amount" | "categorie">) => {
    const { description, amount, categorie } = options;
    
    if (!description || !amount || !categorie) {
      console.error("Please provide all required options.");
      return;
    }

    if (isNaN(parseInt(amount.toString()))) {
        console.error("Amount must be a number.");
        return
    }    

    try {
        await addExpense({ description, amount, categorie });
        console.log("Expense added successfully!");

    } catch (error:unknown) {
        
        console.error("Budget exceeded!");
    }
  });


program.command("budget").description("Add a new budget").option("-m, --month <month>", "Budget month").option("-a, --amount <amount>", "Budget amount").action(async (options:Budget) => {
    const { month, amount } = options;  


    if (!month || !amount) {
        console.error("Please provide all required options.");
        return;
    }


    const m = parseInt(month.toString());
    const amo = parseInt(amount.toString());

    

  
    if (isNaN(amo)) {
        console.error("Amount must be a number.");
        return
    }

    if (isNaN(m)) {
        console.error("Month must be a number.");
        return
    }

    if (m > 12 || m < 1) {
        console.error("Month must be between 1 and 12.");
        return
    }

    await addBudget({ month:month.padStart(2, '0'), amount: parseInt(amount.toString())});
    console.log("Budget added successfully!");

})

program.command("list").description("List all expenses").action(async() => {
    const res = await getAllExpenses();
    const expenses = res as Spent[];

    const table = new Table({
        head: ['ID', 'Description', 'Amount', 'Category', 'Date'],
        colWidths: [10, 20, 15, 15, 15]
    });

    expenses.forEach((expense,index) => {
        table.push([expense.id, expense.description, `$${expense.amount}`, expense.categorie, expense.date]);
    });

    console.log(table.toString());
})


program.command("summary").description("Summary of expenses").option("-m, --month <month>", "Expense month").action(async (options) => {
    const res = await getAllExpenses();

    const { month } = options;
    
    const summary = res.reduce((acc, expense) => {
        if (month && month.toString().padStart(2, '0') !== expense.date.split("-")[1]) {
            return acc
        }


        acc+= expense.amount;
        return acc;
    }, 0);


    console.log(`Total expenses: $${summary}`);
})


program.command("category").description("Get Expenses by category").option("-c, --category <category>", "Expense category").action(async (options) => {
  const { category } = options;

  if (!category) {
    console.error("Please provide a category.");
    return;
  }

  const res = await getExpensesByCategorie(category);

  const table = new Table({
    head: ['ID', 'Description', 'Amount', 'Category', 'Date'],
    colWidths: [10, 20, 15, 15, 15]
  });

  res.forEach((expense) => {
    table.push([expense.id, expense.description, `$${expense.amount}`, expense.categorie, expense.date]);
  });

  console.log(table.toString());
  

})

program.command("delete").description("Delete an expense").option("-i, --id <id>", "Expense id").action(async (options) => {
    const { id } = options
    if (!id) {
        console.error("Please provide an expense id.");
        return;
    }
    const res = await deleteExpense(parseInt(id));
    console.log(res ? "Expense deleted successfully!" : "Expense not found.");
})



program.parse(process.argv);