import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Token is required'
    })
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED)
    console.log(payload)
    req.uid = payload.uid
    req.firstName = payload.firstName
    req.lastName = payload.lastName
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token'
    })
  }

  next()
}
