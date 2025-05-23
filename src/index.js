require('dotenv').config();
const express = require('express');
const {errorHandler, notFound} = require('./middlewares/errorHandler');
const cors = require('cors');
const app = express();

app.use(express.json());

// Establecer origin cors
let front = process.env.FRONTEND_URLs;
// Configurar múltiples orígenes para CORS
const allowedOrigins = front.split(',');
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
};

app.use(cors(corsOptions));

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/clients', require('./routes/client.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/additions', require('./routes/product_additions.routes'));
app.use('/api/promotions', require('./routes/promotions.routes'));
app.use('/api/mesas', require('./routes/mesas.routes'));
app.use('/api/combos', require('./routes/combos.routes'));
app.use('/api/combo_product', require('./routes/combo_product.routes'));
app.use('/api/pedido', require('./routes/pedido.routes'));
app.use('/api/expenses', require('./routes/expenses.routes'));
app.use('/api/ventas', require('./routes/ventas.routes.js'));
app.use('/api/inventarios', require('./routes/inventario.routes.js'));
app.use('/api/returns', require('./routes/returns.routes'));

app.get('/health', (_, res) => res.send({ status: 'UP' }));

app.use(notFound);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}`)
);
