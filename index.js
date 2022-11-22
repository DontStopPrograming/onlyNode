const express = require('express')
const morgan = require('morgan')
const app = express()

const products = [
    {
        id: 1,
        name: 'pc Gamer',
        price: 3000
    }
]

app.use(morgan('dev'))
app.use(express.json())

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/products/:id', (req, res) => {
    const productsFound = products.find((products) =>
        products.id === parseInt(req.params.id)
    )
    if(!productsFound) return res.status(404).json({
        message: 'Product not found'
    })
    console.log(productsFound)
    res.json(productsFound)
})

app.post('/products', (req, res) => {
    const newProducts = {...req.body, id: products.length + 1}
    products.push(newProducts)
    res.send(newProducts)
})

app.put('/products', (req, res) => {
    res.send('Actualizando productos')
})

app.delete('/products', (req, res) => {
    res.send('Eliminando productos')
})

app.get('/profile', (req, res) => {
    res.send('Profile page')
})

app.use((req, res, next) => {
    if(req.query.login === 'usuario@gmail.com'){
        next()
    } else {
        res.send('No autorizado')
    }
})

app.use('/dashboard',(req, res) => {
    res.send('DASHBOARD PAGE')
})


app.listen(3000)
console.log(`Server runling in port ${3000}`)