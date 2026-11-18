const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  // Requisito 01: Obter informações do usuário pelo ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ['id', 'firstname', 'surname', 'email']
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Requisito 02: Cadastro de usuário
  async create(req, res) {
    try {
      const { firstname, surname, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        firstname,
        surname,
        email,
        password: hashedPassword
      });

      return res.status(201).json({
        id: newUser.id,
        firstname: newUser.firstname,
        surname: newUser.surname,
        email: newUser.email
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Requisito 04: Atualizar usuário
  async update(req, res) {
    try {
      const { id } = req.params;
      const { firstname, surname, email } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.update({ firstname, surname, email });

      // O requisito pede status 204 No Content
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Requisito 05: Deletar usuário
  async remove(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();

      // O requisito pede status 204 No Content
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};