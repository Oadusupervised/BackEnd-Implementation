import express from 'express'
import { apiRouter } from './apiRouter.js'
import { PORT } from './port/Config.js'
import {engine} from 'express-handlebars'
import {Server as SocketIOServer} from 'socket.io'
import { FileManager } from './operators/FileManager.js'

const productManager = new FileManager('./database/Productos.json')
const app = express()

app.use('/api',apiRouter)

app.engine('handlebars',engine())
app.set('views','./views')
app.set('view engine','handlebars')
app.use(express.static('./public'))

const httpServer = app.listen(PORT,()=>{
    console.log(`escuchando en puerto ${PORT}`)
})

const io = new SocketIOServer(httpServer)

io.on('connection', async clienteSocket =>{
    clienteSocket.on('nuevoProducto',async productoNuevo=>{
        await productManager.guardarproductos(productoNuevo)
        const productos = await productManager.mostrarTodosProductos()
        const productosParaFront = productos.map(m=>({...m,fecha:new Date(m.timestamp).toLocaleTimeString()}))
        io.sockets.emit('actualizarProducto',productosParaFront)     
    })

    clienteSocket.on('nuevoUsuario', async nombreProducto=>{
        clienteSocket.broadcast.emit('nuevoUsuario',nombreProducto)
    })
        const productos = await productManager.mostrarTodosProductos()
        const productosParaFront = productos.map(m=>({...m,fecha:new Date(m.timestamp).toLocaleTimeString()}))
        io.sockets.emit('actualizarProducto',productosParaFront)      
})


app.use((error,req,res,next)=>{
    switch(error.message){

        case 'id no encontrado':
            res.status(404)
            break
        
        case 'falta un argumento':
            res.status(400)
            break

        default:
            res.status(500)
    }
    res.json({message:error.message})
})

