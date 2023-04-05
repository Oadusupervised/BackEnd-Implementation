import fs from 'fs/promises'
import mongoose from 'mongoose'

export const schemaProducts = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], required: true },
    id: { type: String, required: true },
    status: { type: String, required: true }
  }, { versionKey: false });

export class FileManager {
    #productos

    constructor() {
        this.#productos= mongoose.model('products',schemaProducts)
    }


    async guardarproductos(productos) {
        const producto= new this.#productos(productos)
        await producto.save()
        return producto 
    }

    async mostrarproductos(lim) {
        const products = await this.#productos.find().limit(lim).lean().exec()
        return products
    }
     
    async mostrarTodosProductos() {
        const products = await this.#productos.find().lean().exec()
        return products
    }

    async buscarproductosSegunId(id) {
        const productoId = await this.#productos.findById(id).lean().exec()
        if (!productoId) {
            throw new Error('id no encontrado')
        }else{
        return productoId
        }        
    }


    async reemplazarproductos(id, nuevaproductos) {
        const productoActualizado = await this.#productos.findOneAndUpdate(
          { id: id }, 
          nuevaproductos,
          { new: true } // Para que devuelva el objeto actualizado
        ).exec()
        if (!productoActualizado) {
          throw new Error('id no encontrado')
        }
        return productoActualizado
      }
      

    async borrarproductosSegunId(id) {
        const borrado = await this.#productos.findOneAndDelete({ id: id }).exec()
        if (!borrado) {
          throw new Error('id no encontrado')
        }else{
        return borrado
        }
    }
      
      async reset() {
        await this.#productos.deleteMany({}).exec()
      }
      
}

export const fileManager = new FileManager()