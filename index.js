const pser = require('./models/db');
const express = require('express');
const handlebars = require('handlebars');
const expresshandlebars = require('express-handlebars');
const path = require('path');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const UserController = require('./controllers/userController');
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname + '/public')));
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', expresshandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + '/views/layouts/'
})
);
app.set('view engine', 'hbs');
app.use('/',UserController)
app.listen('3000', () => {
    console.log("server started");
})