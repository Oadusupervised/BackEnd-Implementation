const Handlebars = require("handlebars")

//@ts-ignore
const socket=io()

const formCargarCarritos = document.querySelector('#btnEnviar2')

if(formCargarCarritos instanceof HTMLFormElement){
    formCargarCarritos.addEventListener('submit',event=>{
        event.preventDefault()
        const formData = new FormData(formCargarCarritos)
        const data={}
        formData.forEach((value, key) => (data[key] = value))
        
        fetch('/views/RealTimeCarts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        })
    }


const armarCarritos = Handlebars.compile(`
{{#if hayCarritos}}
<ul>
    {{#each carritosActuales}}
    <li> {{this.id}}:{{this.nombreProducts}}
    </li>
    {{/each}}
</ul>
{{else}}
<p>no hay carritos</p>
{{/if}}
`)


socket.on('RealTimeCarts', carritos=>{
    const hayCarritos = carritos.length>0
    //alert('recibi los viejuegos: ' + JSON.stringify(videojuegos[videojuegos.length-1]))
    const divListado = document.querySelector('#listadoCarritos')
    if(divListado instanceof HTMLDivElement){
        divListado.innerHTML=armarCarritos({
            carritos,
            hayCarritos
        })
    }
})
