const Tarea=require('../database/models/esquemaTarea');
const express=require('express');
var sha1 = require('sha1');

const router=express.Router();
/////////////////////////////////////-----------------PRIMERA PARTE

router.get('/primera/:datos',(req,res,next)=>{
    console.log("estos son los datos rescatados en postman "+req.params.datos);
    const str=req.params.datos;
    const vec=str.split('-');
    console.log("este es el vector con los datos a procesar"+vec);
    //realizar su codigo
    next();
});


router.post('/segunda',(req,res,next)=>{
    const matriz=req.body.matriz;
    console.log(matriz);
    // la longitud puede variar dependiendo del tamaño de matriz q le envies
    for(var i=0;i<2;i++){
      for(var j=0;j<3;j++){
        console.log(matriz[i][j]);
      }
    }
    //realizar su codigo
    next();
});

router.get('/tercera/:datos',(req,res,next)=>{
    console.log("datos enviados "+req.params.datos);
    const str=req.params.datos;
    const separar=str.split(' ');
    const a=separar[0].split('-');
    const b=separar[1].split('-');
    //vectores ya separados y listos para hacer operaciones
    console.log(a+" | "+b);
    //implementar codigo para resolver la tarea

    next();
});


//////////////////////////----------------------------------SEGUNDA PARTE

/////////////////////////////-------------------------- esta incompleta solo falta insertar otro tipo de datos
///////////////////////////---------------para la contraseña sha1("tuContraseña")

router.get('/',function(req,res,next){
    Tarea.find().exec().then(resultado=>{
      if(resultado.length==0){
        res.json({
          message:"no existen users en la bd"
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

router.post('/',function(req,res,next){
    console.log(req.body);
    var datos={
      nombre:req.body.nombre,
    };
    var Ins=new Tarea(datos);
    Ins.save().then(()=>{
      res.json({
        message:"User insertado en bd"
      });
    }).catch(err=>{
      res.status(500).json({
        message:err
      });
    });
});

router.patch('/:id',function(req,res,next){
  var id=req.params.id;
  var datos={
    nombre:req.body.nombre,
    updateDate:Date.now()
  };
  Tarea.findByIdAndUpdate(id,datos).exec().then(()=>{
    res.json({
      message:"User actualizado"
    });
  }).catch(err=>{
    res.status(500).json({
      message:err
    });
  });
});

router.delete('/:id',function(req,res){
    let idD=req.params.id;
    Tarea.findByIdAndDelete(idD).exec().then(()=>{
      res.json({
        message:"User eliminado"
      });
    }).catch(err=>{
      res.status(500).json({
        message:err
      });
    });
});
module.exports=router;
