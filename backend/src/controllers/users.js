const userModel = require('../models/user')

const usersController = {}
// OBTENER TODOS LOS USUARIOS
usersController.getUsers = async (req, res, next) => {
    const users = await userModel.find()
    res.json(users)
}
// CREAR UN USUARIO
usersController.createUser = async (req, res, next) => {
    const { username } = req.body
    const user = new userModel({username})
    const newUser = await user.save()
    res.json(newUser)
}
// ELIMINAR USUARIO
usersController.deleteUser = async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.params.id)
    res.json(user)
}

module.exports = usersController