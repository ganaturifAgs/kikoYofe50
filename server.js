const express = require('express');
const { dirname } = require('path');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser');
const mongoose = require('./BD/mongoose-connect')


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'/public'));


app.get('/:invitado', (req, res) => {
    res.render("index",{title:"Bodas de Oro - Kiko y Ofelia",invitado:req.params.invitado})
});

app.get("/audioplayer",(req,res)=>{
    res.render("templates/audioPlayer");
})

app.get('/audioplayer/play', (req, res) => {
    const range = req.headers.range
    const videoPath = `audio/ooooooooofeliaaaaaa.mp3`;
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mp3"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
})


app.post("/confirmacion/nueva",async (req,res)=>{
    try{
        const Confirmaciones = require("./BD/modelos/Confirmaciones")
        const newId = await Confirmaciones.find({},{_id:1})
        let _id = newId.pop()._id+1
        req.body["_id"]=_id
        const nueva = new Confirmaciones(req.body)
        await nueva.save()
        res.json({success:true,msg:"Se ha confirmado su asistencia con exito. Gracias, te esperamos"})
    }catch(error){
        res.json({success:false,msg:"Ocurrio  un error al guardar la confirmación"})
        console.log(error)
    }
})

app.post("/mensajes/nuevo",async (req,res)=>{
    try{
        const Mensajes = require("./BD/modelos/Mensajes")
        const newId = await Mensajes.find({},{_id:1})
        let _id = newId.pop()._id+1
        req.body["_id"]=_id
        const nuevo = new Mensajes(req.body)
        await nuevo.save()
        res.json({success:true,msg:"Su mensaje se envio a los novios correctamente."})
    }catch(error){
        res.json({success:false,msg:"Ocurrio  un error al guardar su mensaje"})
        console.log(error)
    }
})


app.listen(80, () => {
    console.log('Servidor iniciado en http://localhost:80');
});