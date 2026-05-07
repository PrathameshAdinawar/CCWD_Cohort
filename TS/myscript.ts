
// it is improve the development experince TS is made 
// both parameters a & b should be number 
// function expects string return
function addi(a: number, b: number): string {
    return a.toString() + b.toString()
}

// result we need is in number but function returns string so we parse it
const result: number = parseInt(addi(1, 2))

//12 number
console.log(result)

// We deploy the .ts file to server and store there, convert the .ts to .js and use that .js and remove the .ts file from server  