const createError = require('http-errors')
const User = require('../Models/User.model')
const { authSchema } = require('../helpers/validation_schema')
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt_helper')

module.exports = {
  register: async (req, res, next) => {
    try {
      
      const result = await authSchema.validate(req.body)
      if(result.error){
        res.status(422).send({
          'status' : 422,
          'message' : result.error.message ,
        })
      }

      const doesExist = await User.findOne({ email: result.email })
      if (doesExist)
        throw createError.Conflict(`${result.email} is already been registered`)

      const user = new User(result);
      const savedUser = await user.save()
      const accessToken = await signAccessToken(savedUser.id)
      const refreshToken = await signRefreshToken(savedUser.id)

      res.send({ accessToken, refreshToken })
    } catch (error) {
      console.log(' Registratio failed due to schema 2: ',error);
      res.status(500).send({
        'status' : 500,
        'message' : 'Internal Server Error Occured' ,
      })
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authSchema.validate(req.body);
      if(result.error){
        res.status(422).send({
          'status' : 422,
          'message' : result.error.message ,
        })
      }

      const user = await User.findOne({ email: result.email })
      if (!user) throw createError.NotFound('User not registered')

      const isMatch = await user.isValidPassword(result.password)
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid')

      const accessToken = await signAccessToken(user.id)
      const refreshToken = await signRefreshToken(user.id)

      res.send({ accessToken, refreshToken })
    } catch (error) {
      console.log(' Login failed due to : ',error);
      res.status(500).send({
        'status' : 500,
        'message' : 'Internal Server Error Occured' ,
      })
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
          throw createError.InternalServerError()
        }
        console.log(val)
        res.sendStatus(204)
      })
    } catch (error) {
      console.log(' Logout failed due to : ',error);
      res.status(500).send({
        'status' : 500,
        'message' : 'Internal Server Error Occured' ,
      })
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await signAccessToken(userId)
      const refToken = await signRefreshToken(userId)
      res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  },

}
