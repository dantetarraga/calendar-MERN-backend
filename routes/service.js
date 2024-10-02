import { Router } from 'express'

const serviceRouter = Router()

serviceRouter.post('/', (req, res) => {
  const data = req.body

  res.json({
    resp: data,
    message: 'Service POST'
  })
})

serviceRouter.get('/', (req, res) => {
  res.json({
    message: 'Service GET'
  })
})

export default serviceRouter
