import express,{Router} from 'express'
import { FileManager } from './FileManager.js'
import { randomUUID} from 'crypto'
import { Producto } from './producto.js'
import { Cart } from './cart.js'
import { CartManager } from './CartManager.js'

export const apiRouter= Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

const productosManager = new FileManager('./database/Productos.json')
const cartManager = new CartManager('./database/cart.json')

//PRODUCTS

apiRouter.get('/products/:plim?', async (req,res,next)=>{

    try {
        const productos = await productosManager.mostrarproductos(req.params.plim)
        res.json(productos)
    } catch (error) {
        next(error)
    }
})

apiRouter.get('/products/:pid', async (req,res,next)=>{

    try {
        const productos = await productosManager.buscarproductosSegunId(req.params.pid)
        res.json(productos)
    
    } catch (error) {
        next(error)
    }
})

apiRouter.post('/products', async (req,res,next)=>{
    try {
        const producto = new Producto({
            id:randomUUID(),
            ...req.body
        })
        const agregada = await productosManager.guardarproductos(producto)
        res.json(agregada)
    } catch (error) {
    next(error)
    }
})



apiRouter.put('/products/:pid',async (req,res,next)=>{
    let productoNuevo
  try {
      productoNuevo=new Producto({
          id: req.params.pid,
          ...req.body
      })
  } catch (error) {
    next(error)
  }

    try {
      const productoReemplazado = await productosManager.reemplazarproductos(req.params.pid,productoNuevo)
      res.json(productoReemplazado)
    } catch (error) {
    next(error)
    }
})

apiRouter.delete('/products/:pid',async (req,res,next)=>{
try {
        const borrado = await productosManager.borrarproductosSegunId(req.params.pid)
        res.json(borrado)
} catch (error) {
    next(error)
}
})



//CARTS 

apiRouter.post('/carts/:pid',async (req,res,next)=>{

        try {
            let productoAgregadoCarrito
            const quantity=1
            productoAgregadoCarrito = await productosManager.buscarproductosSegunId(req.params.pid)
            productoAgregadoCarrito = productoAgregadoCarrito.title
            productoAgregadoCarrito= {productoAgregadoCarrito,quantity}
            const carrito = new Cart({
                id:randomUUID(),
                nombreProducts:[productoAgregadoCarrito]
            })
            const productoAgregado = await cartManager.guardarCarrito(carrito)
            res.json(productoAgregado)
        } catch (error) {
        next(error)
        }
})


apiRouter.get('/carts/:cid', async (req,res,next)=>{

        try {
            const productos = await cartManager.buscarCarritoSegunId(req.params.cid)
            res.json(productos)
        
        } catch (error) {
            next(error)
        }
})

apiRouter.post('/carts/:cid/product/:pid', async (req,res,next)=>{
    let productoEncontrado
    const quantity=1
    try {
        const carritoEncontrado = await cartManager.buscarCarritoSegunId(req.params.cid)
        productoEncontrado= await productosManager.buscarproductosSegunId(req.params.pid)
        productoEncontrado = productoEncontrado.title
        productoEncontrado= {productoEncontrado,quantity}
        carritoEncontrado.nombreProducts.push(productoEncontrado)
    } catch (error) {
    next(error)
    }
    res.json(productoEncontrado)
})
