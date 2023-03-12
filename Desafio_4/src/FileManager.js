import fs from 'fs/promises'

export class FileManager {
    #productos
    #ruta

    constructor(ruta) {
        this.#ruta = ruta
        this.#productos = []
    }

    async #leer() {
        const json = await fs.readFile(this.#ruta, 'utf-8')
        this.#productos = JSON.parse(json)
    }

    async #escribir() {
        const nuevoJson = JSON.stringify(this.#productos, null, 2)
        await fs.writeFile(this.#ruta, nuevoJson)
    }

    async guardarproductos(productos) {
        await this.#leer()
        this.#productos.push(productos)
        await this.#escribir()
        return productos
    }

    async mostrarproductos(lim) {
        await this.#leer()
        return this.#productos.splice(0,lim)
    }

    async buscarproductosSegunId(id) {
        await this.#leer()
        const buscada = this.#productos.find(p => p.id === id)
        if (!buscada) {
            throw new Error('id no encontrado')
        }
        return buscada
    }

    async reemplazarproductos(id, nuevaproductos) {
        await this.#leer()
        const indiceBuscado = this.#productos.findIndex(p => p.id === id)
        if (indiceBuscado === -1) {
            throw new Error('id no encontrado')
        }
        this.#productos[indiceBuscado] = nuevaproductos
        await this.#escribir()
        return nuevaproductos
    }

    async borrarproductosSegunId(id) {
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