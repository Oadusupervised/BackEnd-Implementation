import fs from 'fs/promises'
import mongoose, { mongo } from 'mongoose'

export const schemaMessages = new mongoose.Schema({
    user:{type:String,required:true},
    message:{type:String,required:true}
},{versionKey:false})

export class messagesManager{
    #mensajes

    constructor(){
        this.#mensajes=mongoose.model('messages',schemaMessages)
    }

    async mostrarMensajes() {
        const mensajes = await this.#mensajes.find().lean()
        return mensajes
      }


    async guardarMensajes(mensajes) {
        const mensjaes= new this.#mensajes(mensajes)
        await mensjaes.save()
        return mensjaes    
    }

      
    async reset() {
        await this.#mensajes.deleteMany({}).exec()
    }


}
export const mensajesManager = new messagesManager()