// These are all the main that are mostly used in node

// file System
const fs = require('fs');


const path = require('path')
const os = require('os')

console.log('Nodejs: ', process.versions.node)
console.log('V8: ', process.versions.v8)
console.log('Libuv: ', process.versions.uv)
console.log("--------------------------------")
console.log('platform', process.platform)
console.log("--------------------------------")

console.log('CPU', os.cpus()[0]) // show only one other wise it will show all cores details
console.log('CPU Model:', os.cpus()[0].model);
console.log('CPU logical cores', os.cpus().length)

/*  IMP concept

NodeJS is V8engine⚙️ + LibUV🦖

* V8 engine ⚙️*
JavaScript is an interpreted langauge so it uses JIT(Just In Time) compiler 
which is V8 engine by Google open sourced now 
Compare to compile time langauges interpreted language are slower 
V8 engine manages: Heap & Call-Stack
V8 engine knows nothing about Files, Network or timers 

* Libuv 🦖*
Libuv is a C library 
It manages: eventloops, Threadpool, OS level async I/O, DNS lookup, etc   

* Behind the Scene 👀*
Nodejs Bindings (C++): Bridege between the JS and Libuv
we write operation is JS but the Nodejs binds the bridge and gives the code to Liduv in C++ and returns
the value back to us in JS 


*/

console.log(typeof global)
console.log(typeof globalThis)
