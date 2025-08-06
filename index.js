require('dotenv').config();
const express = require('express');
const { errorHandler, notFound } = require('./src/middlewares/errorHandler.js');
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
app.use('/api/auth', require('./src/routes/auth.routes.js'));
app.use('/api/users', require('./src/routes/user.routes.js'));
app.use('/api/clients', require('./src/routes/client.routes.js'));
app.use('/api/products', require('./src/routes/product.routes.js'));
app.use('/api/additions', require('./src/routes/product_additions.routes.js'));
app.use('/api/promotions', require('./src/routes/promotions.routes.js'));
app.use('/api/mesas', require('./src/routes/mesas.routes.js'));
app.use('/api/combos', require('./src/routes/combos.routes.js'));
app.use('/api/combo_product', require('./src/routes/combo_product.routes.js'));
app.use('/api/pedido', require('./src/routes/pedido.routes.js'));
app.use('/api/expenses', require('./src/routes/expenses.routes.js'));
app.use('/api/type-of-expense', require('./src/routes/type_expenses.routes.js'));
app.use('/api/ventas', require('./src/routes/ventas.routes.js'));
app.use('/api/factura', require('./src/routes/factura.routes.js'));
app.use('/api/inventarios', require('./src/routes/inventario.routes.js'));
app.use('/api/returns', require('./src/routes/returns.routes.js'));
app.use('/api/configuration', require('./src/routes/configuration.routes.js'));
app.use('/api/categories', require('./src/routes/categorias.routes.js'));
app.use('/api/finance', require('./src/routes/finance.routes.js'));

app.get('/health', (_, res) => res.send({ status: 'UP' }));

app.use(notFound);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(process.env.PORT, () =>
    console.log(`Server running at PORT: ${process.env.PORT}`)
);
