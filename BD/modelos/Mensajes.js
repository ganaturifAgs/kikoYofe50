const mongoose = require('mongoose')
const esquemaMsg = mongoose.Schema({
    _id:Number,
    invitado:String,
    mensaje:String,
    fecha:String
})

const Mensajes = mongoose.model("mensajes",esquemaMsg)

module.exports = Mensajes