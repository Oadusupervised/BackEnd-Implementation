export class Cart {
    constructor({ id, nombreProducts }) {
      if (!id || !nombreProducts) throw new Error('')
  
      this.id = id
      this.nombreProducts = nombreProducts
    }
  }