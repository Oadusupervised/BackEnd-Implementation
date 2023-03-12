export class Producto{
    constructor({title, description, code, price, stock, category, thumbnails, id, status = true}) {
      if(!title || !description || !code || !price || !stock || !category) {
        throw new Error('falta un argumento')
      }
  
      this.id = id
      this.title = title
      this.description = description
      this.code = code
      this.price = price
      this.status = status
      this.stock = stock
      this.category = category
      this.thumbnails = thumbnails || []
    }
  }