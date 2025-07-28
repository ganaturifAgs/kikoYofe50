const mongoose = require('mongoose')
const esquemaConf = mongoose.Schema({
    _id:Number,
    invitado:String,
    fecha:String
})

const Confirmaciones = mongoose.model("confirmaciones",esquemaConf)

module.exports = Confirmaciones