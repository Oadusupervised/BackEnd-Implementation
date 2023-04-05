export class Cart{
    #id 
    #nombreProducts
    constructor({id,nombreProducts=[]}){
        this.#id=id
        this.#nombreProducts=nombreProducts
    }
    //getters para acceder a privados pero no modificar
    get id() {return this.#id}
    get nombreProducts() {return this.#nombreProducts}
    datos(){
        return{
            id:this.#id,
            nombreProducts:this.#nombreProducts,
        }
    }
}