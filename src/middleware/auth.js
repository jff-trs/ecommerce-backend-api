const jwt = require('jsonwebtoken');

// Chave para assinar o token 
const SECRET = process.env.JWT_SECRET || 'chave_secreta';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o token foi enviado no header Authorization (Bearer token)
  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token malformatted' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }

    // Salva o ID do usuário na requisição para uso futuro, se necessário
    req.userId = decoded.id;
    return next();
  });
};

module.exports.SECRET = SECRET;