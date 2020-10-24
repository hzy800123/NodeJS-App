const mongoose = require('mongoose')


// (1) 连接数据库 MongoDB
mongoose.connect('mongodb://localhost:27017/datatest', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection; // 数据库的连接对象
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => { console.log('MongoDB connect OK !!!') })


// (2) schema 对象
// 每个schema都会映射到一个 MongoDB collection，
// 并定义这个collection里的文档的构成。

// 创建 一个和集合相关的 schema对象，类似“表头”（字段名列表）
const Schema = mongoose.Schema

// 注意：需要操作几个“表”(collection)，就需要创建几个schema对象(e.g.userSchema)
// 获取schema对象
const userSchema = new Schema({
  userName : {type:String, required:true},  
  age : {type:Number, required:true}
})

// (3) 将 schema对象 转换为 数据模型
// 该 schema数据对象 和 集合关联collection ('集合名', schema对象)
const userModel = mongoose.model('users', userSchema)


module.exports = userModel