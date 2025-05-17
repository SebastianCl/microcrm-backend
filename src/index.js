require('dotenv').config();
const express = require('express');
const {errorHandler, notFound} = require('./middlewares/errorHandler');
const app = express();

app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/clients', require('./routes/client.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/additions', require('./routes/product_additions.routes'));
app.use('/api/promotions', require('./routes/promotions.routes'));

app.get('/health', (_, res) => res.send({ status: 'UP' }));

app.use(notFound);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}`)
);
