const Handlebars = require("handlebars")

//@ts-ignore
const socket=io()

const formCargarMessages = document.querySelector('#btnEnviar3')

if(formCargarMessages instanceof HTMLFormElement){
    formCargarMessages.addEventListener('submit',event=>{
        event.preventDefault()
        const formData = new FormData(formCargarMessages)
        const data={}
        formData.forEach((value, key) => (data[key] = value))
        
        fetch('/views/RealTimeMessages', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        })
    }


const armarMensajes = Handlebars.compile(`
{{#if hayMensajes}}
<ul>
    {{#each mensajesActuales}}
    <li> {{this.user}}:{{this.message}}
    </li>
    {{/each}}
</ul>
{{else}}
<p>no hay mensajes</p>
{{/if}}
`)


socket.on('RealTimeMessages', mensasjes=>{
    const hayMensajes = mensasjes.length>0
    //alert('recibi los viejuegos: ' + JSON.stringify(videojuegos[videojuegos.length-1]))
    const divListado = document.querySelector('#listadoMensajes')
    if(divListado instanceof HTMLDivElement){
        divListado.innerHTML=armarMensajes({
            mensasjes,
            hayMensajes
        })
    }
})
