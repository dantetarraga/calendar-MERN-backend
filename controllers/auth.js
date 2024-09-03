import { generateToken } from '../helpers/jwt.js'
import { User } from '../models/User.js'
import bycrypt from 'bcryptjs'

class AuthController {
  static async register (req, res) {
    const { firstName, lastName, email, password } = req.body

    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        ok: false,
        message: 'User already exists'
      })
    }

    user = new User({ firstName, lastName, email, password })

    const salt = bycrypt.genSaltSync()
    user.password = bycrypt.hashSync(password, salt)

    const savedUser = await user.save()

    if (!savedUser) {
      return res.status(500).json({
        ok: false,
        message: 'Internal server error'
      })
    }

    const token = await generateToken(user.id, user.firstName)

    return res.status(201).json({
      ok: true,
      message: 'User registered',
      uid: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      token
    })
  }

  static async login (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'User not found'
      })
    }

    const validPassword = bycrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid password or email'
      })
    }

    const token = await generateToken(user.id, user.firstName)

    return res.json({
      ok: true,
      message: 'User logged in',
      uid: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      token
    })
  }

  static async refreshToken (req, res) {
    const { uid, name } = req

    const token = await generateToken(uid, name)

    res.json({
      ok: true,
      message: 'Refresh token',
      token
    })
  }
}

export default AuthController
