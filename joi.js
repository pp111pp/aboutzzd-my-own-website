//引入joi模块
const Joi = require('joi');
//定义对象的验证规则
const schema = {
    name: Joi.string().min(1).max(5).required().error(new Error('name没有通过验证')),
    number:Joi.number().error(new Error('电话没有通过验证')),
    email:Joi.string()

};
//实施验证
Joi.validate({}, schema);