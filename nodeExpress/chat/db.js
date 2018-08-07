let mongoose = require('mongoose');
let db = mongoose.connection;

mongoose.connect('mongodb://localhost/m_data');

db.once('open', ()=>{
   console.log('连接成功');
})

let Schema = mongoose.Schema;
let userSchema = new Schema({
   username: String,
   password: String
})

module.exports = mongoose.model('user', userSchema);