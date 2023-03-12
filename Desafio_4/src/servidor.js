import express from 'express'
import { apiRouter } from './apiRouter.js'
import { PORT } from './Config.js'

const app = express()

app.use('/api',apiRouter)

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

app.listen(PORT,()=>{
    console.log(`escuchando en puerto ${PORT}`)
})


