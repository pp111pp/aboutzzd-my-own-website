//引入express框架
const express = require('express');
//导入消息集合构造函数
const { massage } = require('../model/massage');
//引入joi模块
const Joi = require('joi');
//创建博客展示页面路由
const home = express.Router();
home.get('/default', (req, res) => {
    res.render('home/default');
});
// 实现发送消息功能路由
home.post('/default', async(req, res) => {
    // 定义对象的验证规则
    const schema = Joi.object({
        username: Joi.string().min(1).max(5).required().error(new Error('name不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱不符合规则')),
        number: Joi.number().required().error(new Error('电话不符合规则')),
        message: Joi.string().min(0).max(10000)
    });
    try {
        //实施验证
        await schema.validateAsync(req.body);

    } catch (e) {
        //验证没有通过
        //  e.message
        //重定向回用户添加页面
        return res.redirect(`/home/default?message=${e.message}`)

    }
    //console.log(req.body);

    //根据邮箱地址查询用户是否存在
    let user = await massage.findOne({ email: req.body.email });
    //如果用户已经存在 邮箱地址已经被别人占用
    if (user) {
        return res.redirect(`/home/default?message=邮箱已经被占用`);
    }
    // res.send(req.body);
    // // 接受请求参数
    // const { name, email, number, message } = req.body;
    // // 如果用户没有输入邮件地址
    // if (name.trim().length == 0 || email.trim().length == 0 || number.trim().length == 0) return res.status(400).send('<h4>电话或邮件地址或电话错误</h4>');
    //将用户信息添加到数据库中
    await massage.create(req.body);

});
// 将路由对象作为模块成员进行导出
module.exports = home;