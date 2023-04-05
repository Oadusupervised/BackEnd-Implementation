export class Message{
    #user 
    #message
    constructor({user,message}){
        this.#user=user
        this.#message=message
    }
    //getters para acceder a privados pero no modificar
    get user() {return this.#user}
    get message() {return this.#message}
    datos(){
        return{
            user:this.#user,
            message:this.#message,
        }
    }
}