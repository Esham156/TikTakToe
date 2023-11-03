const prompt = require('prompt-sync')();
const colors = require("ansi-colors");

//functions

function displayBoard(l){
    let p = 0;
    for (let i = 0; i < 3; i++){
        for(let i = 0; i < 3; i++){
            if(l[p] === "[ ]"){
                process.stdout.write(`[${p+1}]`)
            }else if(l[p] === "[o]"){
                process.stdout.write(colors.blue(l[p]));
            }else if (l[p] === "[x]"){
                process.stdout.write(colors.green(l[p]));
            }
            p++;
        }
        process.stdout.write("\n");
    }
    return;
}

//function takes the current state of the board and returns an array with index of empty squares

function checkEmpty(arr1){
    const arr2 = [];
    arr1.forEach((element,index) => {
        if (element === "[ ]"){
            arr2.push(index);
        }
        
    });
    return arr2;
} 

//computer chooses a square among the empty squares 

function compTurn(arr1,arr2) {
    const idx = Math.floor(Math.random()*arr1.length)
    arr2[arr1[idx]]= "[o]" 
}

//checking if anyone wins


function anyWin(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        const [a, b, c] = arr2[i];
        if (arr1[a] !== "[ ]" && arr1[a] === arr1[b] && arr1[b] === arr1[c]) {
            return arr1[a];
        }
    }
    return null;
}


//finding out diiferent outcomes

function whoWon(parameter,arr){
    if (parameter === "[x]"){
        return 101;
    }else if(parameter === "[o]") {
        return 102;
    }else if(parameter === null && !arr.includes("[ ]")){
        return 103;
    }
}

//program

function tikTakToe () {
    let outcome = 0;
    const winCondictions = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[1,4,7],[0,3,6],[2,5,8]];
    let match = 0;
    let userChoice = "";
    let score = 0;
    while(true){
        const board = ["[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]","[ ]"]; //dont chaneg its almost done
        match++;
        displayBoard(board);
        while(true){
        //asking for user input
            do{
                userChoice = prompt("please choose a box between the numbered boxes: ")

            }while(!checkEmpty(board).includes(Number(userChoice)-1))
            board[Number(userChoice)-1] = "[x]";
            outcome = whoWon(anyWin(board,winCondictions),board);
            
            if (outcome === 101){
                console.log("\n");
                displayBoard(board);
                console.log(colors.greenBright("\nYou win!"));
                score++;
                break;
            }else if (outcome === 102){
                console.log("\n");
                displayBoard(board);
                console.log(colors.red("\nYou lose :} "));
                break
            }else if (outcome === 103){
                console.log("\n");
                displayBoard(board);
                console.log(colors.yellowBright("\nit was a draw :[ "));
                break
            }
            //computers choice
            compTurn(checkEmpty(board),board);
            outcome = whoWon(anyWin(board,winCondictions),board);
            if (outcome === 101){
                console.log("\n");
                displayBoard(board);
                console.log(colors.greenBright("\nYou win!"));
                score++;
                break;
            }else if (outcome === 102){
                console.log("\n");
                displayBoard(board);
                console.log(colors.red("\nYou lose :} "));
                break
            }else if (outcome === 103){
                console.log("\n");
                displayBoard(board);
                console.log(colors.yellowBright("\nit was a draw :[ "));
                break
            }
            displayBoard(board);
            //check winning/losing conditions, if condition is met, variable undecided = false;
        }
        //display score
        console.log(`you won ${colors.green(score)} times out of ${colors.blueBright(match)} matches`);
        //ask user if they want to play another match
        let decision = "";
        do{
            decision = prompt("would you like to continue playing? [y/n] ");
        }while(decision !== "y" && decision !== "n");
        if (decision === "n"){
            console.log("\nthank you for playing");
            break;
        }
    }
}

module.exports = tikTakToe;