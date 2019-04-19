const express=require('express');
const route=express.Router();

const Edificio=require('../database/models/edificio.js');

route.get('/',function(req,res,next){
    Edificio.find().exec().then(resultado=>{
      if(resultado.length==0){
        res.json({
          message:"no existen edificios en la bd"
        });
      }else{
        res.json(resultado);
      }
    }).catch(err=>{
      res.status(500).json({
        message:err
      });
    });
});

route.post('/',function(req,res,next){
    console.log(req.body);
    var datos={
      nombre:req.body.nombre,
      pisos:req.body.pisos
    };
    var Ins=new Edificio(datos);
    Ins.save().then(()=>{
      res.json({
        message:"edificio insertado en bd"
      });
    }).catch(err=>{
      res.status(500).json({
        message:err
      });
    });
});

route.patch('/:id',function(req,res,next){
  var id=req.params.id;
  var datos={
    nombre:req.body.nombre,
    pisos:req.body.pisos
  };
  Edificio.findByIdAndUpdate(id,datos).exec().then(()=>{
    res.json({
      message:"Edificio actualizado"
    });
  }).catch(err=>{
    res.status(500).json({
      message:err
    });
  });
});

route.delete('/:id',function(req,res){
    let idD=req.params.id;
    Edificio.findByIdAndDelete(idD).exec().then(()=>{
      res.json({
        message:"Edificio eliminado"
      });
    }).catch(err=>{
      res.status(500).json({
        message:err
      });
    });
});


module.exports=route;
