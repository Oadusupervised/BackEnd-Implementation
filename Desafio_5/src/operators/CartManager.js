import fs from 'fs/promises'
import { FileManager } from './FileManager.js'

export class CartManager {
    #productos
    #ruta
    #productosManager

    constructor(ruta) {
        this.#ruta = ruta
        this.#productos = []
        this.productosManager = new FileManager('./database/Productos.json')

    }

    async #leer() {
        const json = await fs.readFile(this.#ruta, 'utf-8')
        this.#productos = JSON.parse(json)
    }

    async #escribir() {
        const nuevoJson = JSON.stringify(this.#productos, null, 2)
        await fs.writeFile(this.#ruta, nuevoJson)
    }

    async guardarCarrito(productos) {
        await this.#leer()
        this.#productos.push(productos)
        await this.#escribir()
        return productos
    }

    async mostrarCarrito(lim) {
        await this.#leer()
        return this.#productos.splice(0,(lim+1))
    }

    async buscarCosas() {
        await this.#leer()
        return this.#productos
    }

    async buscarCaractProducto(idProduct) {
        await this.#leer()
        const buscada = this.#productos.find(p => p.idProduct === idProduct)
        if (!buscada) {
            throw new Error('id no encontrado')
        }

        try {
            let productoAgregadoCarrito
            const quantity=1
            productoAgregadoCarrito = await this.#productosManager.buscarproductosSegunId(idProduct)
            productoAgregadoCarrito = productoAgregadoCarrito.title
            productoAgregadoCarrito= {productoAgregadoCarrito,quantity}
            return productoAgregadoCarrito
        } catch (error) {
            error
            }
    }


    async buscarCarritoSegunId(idCarrito) {
        await this.#leer()
        const buscada = this.#productos.find(p => p.idCarrito === idCarrito)
        if (!buscada) {
            throw new Error('id no encontrado')
        }
        return buscada
    }

    async reemplazarProductosdeCarrito(id, nuevaproductos) {
        await this.#leer()
        const indiceBuscado = this.#productos.findIndex(p => p.id === id)
        if (indiceBuscado === -1) {
            throw new Error('id no encontrado')
        }
        this.#productos[indiceBuscado] = nuevaproductos
        await this.#escribir()
        return nuevaproductos
    }

    async borrarCarritoSegunId(id) {
        await this.#leer()
        const indiceBuscado = this.#productos.findIndex(p => p.id === id)
        if (indiceBuscado === -1) {
            throw new Error('id no encontrado')
        }
        const [borrado] = this.#productos.splice(indiceBuscado, 1)
        await this.#escribir()
        return borrado
    }



    async reset() {
        this.#productos = []
        await this.#escribir()
    }
}
