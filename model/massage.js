//创建消息集合
//引入mongoose第三方模块
const mongoose = require('mongoose');
//创建集合规则
const massageSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        //保证邮箱地址在数据库中不重复
        unique: true,
        required: true
    },
    number: {
        type: Number,
        required: true

    },
    massage: {
        type: String,

        minlength: 2,
        maxlength: 20,
    }
});

//创建消息集合
const massage = mongoose.model('massage', massageSchema);

// massage.create({
//     username: 'zzd',
//     email: '1628413456@qq.com',
//     number: 15172387700,
//     massage: '棒棒棒'
// }).then(() => {
//     console.log('用户创建成功')
// }).catch(() => {
//     console.log('用户创建失败');
// });

//将消息集合做为模块成员进行导出
module.exports = {
    massage
}