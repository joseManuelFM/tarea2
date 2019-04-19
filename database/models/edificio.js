const mongoose=require('../connect');
const Schema = mongoose.Schema;

const edificioSchema = Schema({
    nombre:String,
    pisos:Number
});

const edificio = mongoose.model('Edificio', edificioSchema);

module.exports = edificio;
