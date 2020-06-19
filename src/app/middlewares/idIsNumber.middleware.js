export default function idIsNumber(req, res, next) {

  const id = req.params.id
 
  if (isNaN(parseInt(id))) {
    return res
      .status(400)
      .send({ error: "Bad request.", message: "ID must be a number." })
  }
 
  console.log('ID is number!!!')
  return next()

}