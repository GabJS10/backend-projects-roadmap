# Expense Tracker CLI

This repository contains a Command Line Interface (CLI) tool for managing personal expenses. With this tool, you can set budgets, track expenses, and view summaries, all from the command line.

## Features

- **Add Budget:** Define a monthly budget.
- **Add Expense:** Add and categorize expenses.
- **View Expenses:** List all your expenses in a table format.
- **Filter by Category:** Get expenses filtered by category.
- **Monthly Summary:** View total expenses for a specific month.
- **Delete Expense:** Remove an expense by its ID.

## Installation

1. Clone the repository:  
   \`\`\`  
   git clone https://github.com/your-username/expense-tracker-cli.git  
   \`\`\`

2. Navigate to the project directory:  
   \`\`\`  
   cd expense-tracker-cli  
   \`\`\`

3. Install dependencies:  
   \`\`\`  
   npm install  
   \`\`\`

## Usage

Run the CLI using the following command:  
\`\`\`  
node index.js [command] [options]  
\`\`\`

### Commands

1. **Add a New Expense**  
   Add an expense with description, amount, and category:  
   \`\`\`  
   node index.js add -d "Lunch" -a 15 -c "Food"  
   \`\`\`

2. **Add a Budget**  
   Define a budget for a specific month:  
   \`\`\`  
   node index.js budget -m 01 -a 1000  
   \`\`\`

3. **List All Expenses**  
   View all tracked expenses:  
   \`\`\`  
   node index.js list  
   \`\`\`

4. **View Monthly Summary**  
   Check the total expenses for a specific month:  
   \`\`\`  
   node index.js summary -m 01  
   \`\`\`

5. **Filter by Category**  
   View expenses filtered by category:  
   \`\`\`  
   node index.js category -c "Food"  
   \`\`\`

6. **Delete an Expense**  
   Remove an expense by its ID:  
   \`\`\`  
   node index.js delete -i 1  
   \`\`\`

## Project Structure

- **types.ts:** Defines types for budget and expenses.
- **db.ts:** Contains functions for reading, writing, and managing expense data.
- **index.ts:** Entry point for the CLI.

## Data Storage

The data is stored in a JSON file named \`Expenses.json\`, which contains:

- **Budget:** An array of monthly budgets.
- **Expenses:** An array of expenses with details like description, amount, category, and date.

## Future Enhancements

- Add support for exporting data to CSV.
- Implement recurring expenses.
- Add more analytics features for expense tracking.

## License

This project is licensed under the MIT License.

---

Happy tracking and budgeting!
