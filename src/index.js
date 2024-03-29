const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

const {database} = require('./keys');

//Inicializacion de la app
const app = express();

//Ajustes
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs( {
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middleware
app.use(session({
    secret: 'proyectosession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});
//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use( '/links', require('./routes/links'));

//public
app.use(express.static(path.join(__dirname, 'public')));
//starting the server
app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});