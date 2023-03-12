export class Cart{
    constructor({id,nombreProducts=[]}){
        if(!id) throw new Error('')
        if (!Array.isArray(nombreProducts)) {
            throw new Error('');}
        this.id=id
        this.nombreProducts=nombreProducts
    }
}