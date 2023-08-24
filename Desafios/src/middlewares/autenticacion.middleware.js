const auth = (req, res, next)=> {
  const { user } = req ?? null

  if (!user) return next()

  res.redirect('/api/views/products')
}
  
  module.exports = auth
  
  