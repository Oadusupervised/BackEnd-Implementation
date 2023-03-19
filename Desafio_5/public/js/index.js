//@ts-ignore
const serverSocket=io('http://localhost:8080/api/realTimeProducts')

const btnEnviar = document.querySelector('#btnEnviar')

// @ts-ignore
Swal.fire({
    title: "IdProducto",
    input: "text",
    inputValidator: (value) => {
        return !value && "¡Necesitas escribir el id del carrito a modificar!"
    },
    allowOutsideClick: false
}).then(result => {
    const inputId = document.querySelector('#inputId')
    if (!(inputId instanceof HTMLInputElement)) return
    inputId.value = result.value
    serverSocket.emit('nuevoUsuario', inputId.value)
})


if(btnEnviar){
    btnEnviar.addEventListener(
        'click',
        evento=>{
            const inputId=document.querySelector('#inputId')
            const inputTitle = document.querySelector('#inputTitle')
            const inputDescription=document.querySelector('#inputDescription')
            const inputCode=document.querySelector('#inputCode')
            const inputPrice=document.querySelector('#inputPrice')
            const inputStatus=document.querySelector('#inputStatus')
            const inputStock=document.querySelector('#inputStock')
            const inputCategory=document.querySelector('#inputCategory')
            const inputThumbnails=document.querySelector('#inputThumbnails')


            
            if(!(inputId instanceof HTMLInputElement)||!(inputTitle instanceof HTMLInputElement)||!(inputDescription instanceof HTMLInputElement)
            ||!(inputCode instanceof HTMLInputElement)||!(inputPrice instanceof HTMLInputElement)
            ||!(inputStatus instanceof HTMLInputElement)||!(inputStock instanceof HTMLInputElement)||!(inputTitle instanceof HTMLInputElement)
            ||!(inputCategory instanceof HTMLInputElement)||!(inputThumbnails instanceof HTMLInputElement)||!(inputTitle instanceof HTMLInputElement)) return
           
            const id = inputId.value
            const title=inputTitle.value
            const description=inputDescription.value
            const code=inputCode.value
            const price=inputPrice.value
            const status=inputStatus.value
            const stock=inputStock.value
            const category=inputCategory.value
            const thumbnails=inputThumbnails.value
           
            if(!id||!title||!description||!code||!price||!status||!stock||!category||!thumbnails) return
            
            serverSocket.emit('nuevoProducto',{timestamp:Date.now(),id,title,description,code,price,status,stock,category,thumbnails})
        }
    )
}

const plantillaCarrito=`
{{#if hayProductos}}
<ul>
    {{#each productosactuales}}
    <li> ({{this.fecha}}) {{this.id}}:{{this.title}}:{{this.description}}
    :{{this.code}}:{{this.price}}:{{this.status}}:{{this.stock}}:{{this.category}}
    :{{this.thumbnails}}
    </li>
    {{/each}}
</ul>
{{else}}
<p>no hay productos</p>
{{/if}}
`

const armarHtmlCarritos=Handlebars.compile(plantillaCarrito)

serverSocket.on('actualizarProducto',productosactuales=>{
    const divProductos=document.querySelector('#productosactuales')
    if(divProductos){
        divProductos.innerHTML=armarHtmlCarritos({productosactuales,hayProductos:productosactuales.length>0})
    }
})

serverSocket.on('nuevoUsuario', nombreProducto => {
    // @ts-ignore
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `"${nombreProducto}" se ha unido al chat`,
        icon: "success"
    })
})
