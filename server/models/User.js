const {Schema, model, ObjectId} = require('mongoose')

const User = new Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    avatar: {type: String},
    files: [{type: ObjectId, ref: 'File'}],
    diskSpace: { type: Number, default: 1024**3*10 },
    usedSpace: { type: Number, default: 0 }
})

module.exports = model('User', User)