

export type Budget = {
    month: string
    amount: number
}


export type Spent = {
    id: number;
    date: string;
    description: string;
    amount: number;
    categorie: string;
}

export type Expenses = {
    budget : Budget[]
    expenses: Spent[]
}
