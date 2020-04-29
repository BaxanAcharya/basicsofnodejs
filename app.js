const path= require('path');
const os= require('os');
const fs=require('fs');
const EventEmitter=require('events');
const Logger=require('./logger')

const logger=new Logger();
//Register a listener
logger.on('messageLogeed', (e)=>{
    console.log('Listener call',e)
})

logger.log('message')

var pathObj=path.parse(__filename);
console.log(pathObj)

var freemen=os.freemem()
var totalMem=os.totalmem()

fs.readdir('./', function(err,files){
    if(err){
        console.log('Error', err)
    }else{
        console.log('Result',files)
    }
});





//console.log("Total Memory :"+totalMem)

//Template String
//ES6 or ES2015 :> ECMAScript 6 or 2015
console.log(`Total Memory : ${totalMem}`)
console.log("Free Memory :"+ freemen)
