import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { readFileSync, writeFileSync } from 'node:fs';

const PATH = "./db.json"

type Db = {
    [key: string]: number[]
}
  
const load = async () => {
    try {
        const tasks =  readFileSync(PATH, "utf-8")
        return tasks
    } catch (error) {
        writeFileSync(PATH, JSON.stringify({
            Easy: [],
            Medium: [],
            Hard: [],
            Creative: []
        }),"utf-8")
        return await load()
    } 
}

const write = async (db: Db) => {
    try {
        writeFileSync(PATH, JSON.stringify(db), "utf-8")
    } catch (error) {
        console.log(error);
    }
}

const run = async () => {
    const rl = readline.createInterface({ input, output });

    console.log(`Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\n`);
    console.log(`Please select the difficulty level:\n1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n.4 Creative (infinite chances)`);

    const answer = await rl.question("Enter your choice (1/2/3): ");

    if (answer !== '1' && answer !== '2' && answer !== '3' && answer !== '4') {
        console.log("Invalid input. Please enter 1, 2, or 3.");
        rl.close();
        return;
    }

    console.log(`\nGreat! You have selected the ${answer === '1' ? 'Easy' : answer === '2' ? 'Medium' : answer === '3' ? 'Hard' : 'Creative'} difficulty level.`);
    console.log("Let's play!\n");

    const chances = answer === '1' ? 10 : answer === '2' ? 5 : answer === '3' ? 3 : Infinity;
    const number = Math.floor(Math.random() * 100) + 1;
    let passed = false
    let i = 0;
    const start = new Date().getTime();
    
    while (i < chances) {
        
        const question = await rl.question("Enter your guess: ");

        const guess = parseInt(question);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            console.log("Invalid input. Please enter a number between 1 and 100.");
            continue;
        }

        if (guess === number) {
            console.log(`Congratulations! You guessed the number in ${i + 1} attempt(s).`);
            passed = true
            const end = new Date().getTime();
            const duration = end - start;
            console.log(`Time elapsed: ${duration / 1000} seconds.`);

            const difficulty = answer === '1' ? 'Easy' : answer === '2' ? 'Medium' : answer === '3' ? 'Hard' : 'Creative';
            
            const db = await load();
            const existingAns = JSON.parse(db) as Db
            
            existingAns[difficulty].push(i+1)
            await write(existingAns)


            const fewerNumberOfAttempts = existingAns[difficulty].sort((a, b) => a - b)[0];

            console.log(`You have the fewest number of attempts: ${fewerNumberOfAttempts} in the ${difficulty} difficulty level.`);

            break;
        } else if (guess > number) {
            console.log(`Incorrect! The number is less than ${guess}.`);
        } else {
            console.log(`Incorrect! The number is greater than the ${guess}.`);
        }

        i++
    }
    !passed ? console.log(`Sorry, you didn't guess the number. The number was ${number}.`) : ""

    rl.close();
}
await run()