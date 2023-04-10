const express = require('express')
const morgan = require("morgan");
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');


const app = express();
app.use(morgan("tiny"));

// connect to db
require("./db/connection");

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// BodyParser
app.use(express.urlencoded({ extended: false}))

// Express session middleware
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Connect Flash
app.use(flash())

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next()
})

// ROUTES
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 4000;

app.listen(PORT,
    console.log(`Server started on port ${PORT}`));
