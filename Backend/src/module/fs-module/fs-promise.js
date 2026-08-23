import fs from "node:fs/promises"

const data = await fs.readFile("test.txt", "utf-8");

console.log(data);