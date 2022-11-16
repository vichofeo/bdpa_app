//consumo de datos
import {http} from '@/services/api'
//https://jsonplaceholder.typicode.com/todos/
//para realizar consultas

export async function getListado() {
    const respuesta = await http().get("/api/afiliado/ente-gestor")
    return respuesta.data;

}

export async function getalgoo() {
    const respuesta = await http().get("/cliente")
    return respuesta.data;

}