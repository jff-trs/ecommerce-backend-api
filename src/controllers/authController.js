const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

module.exports = {
  // Requisito 01: Gerar o token JWT (Login)
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      // Busca o usuário pelo e-mail
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Compara a senha informada com o hash salvo no banco
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Gera o token JWT com validade (ex: 1 dia)
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
        expiresIn: '1d'
      });

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          firstname: user.firstname,
          surname: user.surname,
          email: user.email
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};