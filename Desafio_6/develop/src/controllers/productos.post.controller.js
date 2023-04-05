import { fileManager} from "../dao/schemas/FileManager.js"
import { Producto } from "../entidades/Producto.js"


export async function postProductosController(req,res,next){
    const productos=new Producto(req.body)
    const result = await fileManager.guardarproductos(productos)
    req['io'].sockets.emit('productos',await fileManager.mostrarTodosProductos())
    res.json(result)
}