import { cartManager } from "../dao/schemas/CartManager"
import { Cart } from "../entidades/cart"
export async function postCarritosController(req,res,next){
    const productos= new Cart(req.body)
    const result = await cartManager.guardarCarrito(productos)
    req['io'].sockets.emit('carritos',await cartManager.buscarCosas())
    res.json(result)
}
