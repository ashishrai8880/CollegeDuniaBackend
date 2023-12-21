const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
  phone : Joi.string().min(9).max(14).required(),
  city : Joi.string().min(1).required(),
  course : Joi.string().min(1).required(),
})

module.exports = {
  authSchema,
}
