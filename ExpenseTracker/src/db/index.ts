import { readFileSync, writeFileSync } from "fs"
import { Expenses, Spent, Budget } from "../types"
const PATH = "./Expenses.json"

const load = async () => {
    try {
        const Expense =  readFileSync(PATH, "utf-8")
        return Expense

    } catch (error) {
        writeFileSync(PATH, JSON.stringify({
            budget: [],
            expenses: []
        }),"utf-8")
        return await load()
    } 

    
}

const write = async (Expense: Expenses) => {
    try {
        writeFileSync(PATH, JSON.stringify(Expense), "utf-8")
    } catch (error) {
        console.log(error);
    }
}


export const addExpense = async (Expense: Pick<Spent, "description" | "amount" | "categorie"> ) => {
    const data = await load()
    const parsed = JSON.parse(data) as Expenses

    const date = new Date()

    const amount = parseInt(Expense.amount.toString())

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')


    const findBudget = parsed.budget.find((budget) => budget["month"] === month)



    if (findBudget) {
        
        
            const expensesWithSameMonth = parsed.expenses.filter((expense) => expense.date.split("-")[1] === month)    
        
            const summary = expensesWithSameMonth.reduce((acc, expense, index) => {

                acc+= expense.amount;
                
                return acc;
            }, 0);
            
            if ((summary+amount) > findBudget["amount"]) {
                

                

                throw new Error("Budget exceeded")
                
            }

    }
    
    parsed.expenses.push({
        ...Expense,
        amount,
        date: `${year}-${month}-${day}`,
        id: parsed.expenses.length === 0 ? 1 : parsed.expenses[parsed.expenses.length - 1].id + 1
    })

    await write(parsed)


}

//reprogramar budget
export const addBudget = async (budget: Budget) => {
    const data = await load()
    const parsed = JSON.parse(data) as Expenses

    const findBudget = parsed.budget.find((budget) => budget["month"] === budget.month)
    
    if (findBudget) {
        findBudget["amount"] = budget.amount
    }else{
        parsed.budget.push(budget)
    }


    await write(parsed)
}

export const getAllExpenses = async () => {
    const data = await load()
    const parsed = JSON.parse(data) as Expenses
    return parsed.expenses
}


export const getExpensesByCategorie = async (category: Spent["categorie"]) => {
    const expenses = await getAllExpenses()
    return expenses.filter((expense) => expense.categorie === category)
}

export const deleteExpense = async (id: number) => {
    const data = await load()
    const parsed = JSON.parse(data) as Expenses


    const expenses = parsed.expenses

    const expenseIndex = expenses.findIndex((expense) => expense.id === id)

    if (expenseIndex === -1) {
        return false
    }

    parsed.expenses.splice(expenseIndex, 1)

    await write(parsed)

    return true
}