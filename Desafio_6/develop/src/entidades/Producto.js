export class Producto{
  #id 
  #title
  #description
  #code
  #price
  #status
  #stock
  #category
  #thumbnails
    constructor({title, description, code, price, stock, category, thumbnails, id, status = true}) {

      this.#id = id
      this.#title = title
      this.#description = description
      this.#code = code
      this.#price = price
      this.#status = status
      this.#stock = stock
      this.#category = category
      this.#thumbnails = thumbnails || []
    }
    //getters para acceder a privados pero no modificar
    get id() {return this.#id}
    get title() {return this.#title}
    get description() {return this.#description}
    get code() {return this.#code}
    get price() {return this.#price}
    get status() {return this.#status}
    get stock() {return this.#stock}
    get category() {return this.#category}
    get thumbnails() {return this.#thumbnails}
    datos(){
        return{
            id:this.#id,
            title:this.#title,
            description:this.#description,
            code:this.#code,
            price:this.#price,
            status:this.#status,
            stock:this.#stock,
            category:this.#category,
            thumbnails:this.#thumbnails
        }
    }


  }