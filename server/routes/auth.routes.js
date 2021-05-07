const Route = require('express')
const User = require('../models/User')
const File = require('../models/File')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')

const route = new Route()

route.post(
    '/registration', 
    [
        check('email', 'Не корректный email').isEmail(),
        check('password', 'Не корректный пароль').isLength({min: 3, max: 12})
    ], 
    async (req, res) => {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Не корректные данные', errors})
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if(candidate){
                return res.status(400).json({message: 'Пользователь с таким email уже существует'})
            }

            const hashPassword = await bcrypt.hash(password, 8)

            const user = new User({email, password: hashPassword})
            await user.save()

            await fileService.createDir(new File({user:user.id, name: ''}))

            return res.json({message: 'Пользователь успешно создан'})

        }catch(e){
            console.log(e);
            res.status(400).json({message: 'Error'})
        }
    }
)

route.post(
    '/login',
    async (req, res) => {
        try{

            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user){
                return res.status(404).json({message: 'Пользователь не найден'})
            }

            const isValidPassword = bcrypt.compareSync(password, user.password)

            if(!isValidPassword){
                return res.status(400).json({message: 'не коректный пароль'})
            }

            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace
                }
            })

        }catch(e){
            console.log(e);
            res.status(400).json({message: 'Error'})
        }
    }
)

route.get('/auth', authMiddleware, async (req, res) => {
    try{

        const user = await User.findOne({_id: req.user.id})
  
        const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
  
        return res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            diskSpace: user.diskSpace,
            usedSpace: user.usedSpace,
            avatar: user.avatar
          }
        })
  
      }catch (e){
        console.log(e);
        res.send({message: 'Server error'})
      }
})

route.get('/', async (req, res) => {
  try{

    return res.json({message: 'Hello world!'})

  }catch (e){
    console.log(e);
    res.send({message: 'Server error'})
  }
})


module.exports = route