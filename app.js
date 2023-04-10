const express = require('express')
const morgan = require("morgan");
const expressLayouts = require('express-ejs-layouts');
const path = require('path')



const app = express();
app.use(morgan("tiny"));

require("./db/connection");

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// BodyParser
app.use(express.urlencoded({ extended: false}))


// ROUTES
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 4000;

app.listen(PORT,
    console.log(`Server started on port ${PORT}`));
