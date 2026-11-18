const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares de Segurança e Configuração
app.use(helmet());
app.use(cors());
app.use(express.json());

// Registrando as rotas
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;