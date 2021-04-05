const express = require('express') // импорт Express, библиотека, модуль
const exphbs = require('express-handlebars') //Установка HTML пакета
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access') //  Установка npm install @handlebars/allow-prototype-access
const mongoose = require('mongoose') //Подключение Mongoose
const app = express() // Аналогия сервера
const path = require('path') // Работа с путями фaйлов
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')

const hbs = exphbs.create({
    defaultLayout:'main',
    extreme:'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

app.set('view engine', 'hbs') // Использование
app.set('views', 'views') // 2. параметр это папка где хранятся шаблоны

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = `mongodb+srv://Mikhail:46DH2q0VHGLfNmj1@cluster0.xxtd1.mongodb.net/NodeShop?retryWrites=true&w=majority`
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false
        })
            
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error); 
    }
   
}

start()


