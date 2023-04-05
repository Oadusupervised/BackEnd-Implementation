import express from 'express'
import { apiRouter } from '../routers/api.Router.js'
import { PORT } from '../config/sevidor.config.js'
import { engine } from 'express-handlebars'
import {Server as SocketIOServer} from 'socket.io'
import { conectar } from '../../database/mongoose.js'
import { routerVistas } from '../routers/views.router.js'

await conectar()

const app = express()


const httpServer = app.listen(PORT,()=>{
    console.log(`escuchando en puerto ${PORT}`)
})

const io = new SocketIOServer(httpServer)

io.on('connection', async socket => {
    console.log('cliente nuevo conectado')
})
app.use((req, res, next) => {
    req['io'] = io
    next()
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

app.engine('handlebars',engine())
app.set('views','./views')
app.set('view engine','handlebars')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api',apiRouter)
app.use('/views',routerVistas)


