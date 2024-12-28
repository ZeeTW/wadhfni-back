const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next()
  }
  return res.status(403).send({ msg: 'Access Denied: Admins Only' })
}

module.exports = verifyAdmin
