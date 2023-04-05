const Handlebars = require("handlebars")

//@ts-ignore
const socket=io()

const formCargarProductos = document.querySelector('#btnEnviar')

if(formCargarProductos instanceof HTMLFormElement){
    formCargarProductos.addEventListener('submit',event=>{
        event.preventDefault()
        const formData = new FormData(formCargarProductos)
        const data={}
        formData.forEach((value, key) => (data[key] = value))
        
        fetch('/views/RealTimeProducts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        })
    }


const armarProductos = Handlebars.compile(`
{{#if hayProductos}}
<ul>
    {{#each productosActuales}}
    <li> {{this.id}}:{{this.title}}:{{this.description}}
    :{{this.code}}:{{this.price}}:{{this.status}}:{{this.stock}}:{{this.category}}
    :{{this.thumbnails}}
    </li>
    {{/each}}
</ul>
{{else}}
<p>no hay productos</p>
{{/if}}
`)


socket.on('RealTimeProducts', productos=>{
    const hayProductos = productos.length>0
    //alert('recibi los viejuegos: ' + JSON.stringify(videojuegos[videojuegos.length-1]))
    const divListado = document.querySelector('#listadoProductos')
    if(divListado instanceof HTMLDivElement){
        divListado.innerHTML=armarProductos({
            productos,
            hayProductos
        })
    }
})
