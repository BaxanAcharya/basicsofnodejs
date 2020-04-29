const EventEmitter=require('events');


class Logger  extends EventEmitter{
     log(message){
        console.log(message )
    
        //Raise an event
    this.emit('messageLogeed',{id:1, url:'url'});
    }
}
module.exports=Logger;


