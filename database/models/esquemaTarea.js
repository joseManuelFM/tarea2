const mongoose=require('../connect');
const Schema=mongoose.Schema;

const tarea=Schema({
    name:String,
    registerDate: {
       type:Date,
       default:Date.now()
    },
    updateDate: Date
});

const tareamodel=mongoose.model('Tarea',tarea);

module.exports=tareamodel;
