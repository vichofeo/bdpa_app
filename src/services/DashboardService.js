//consumo de datos
import {http} from '@/services/api'
//https://jsonplaceholder.typicode.com/todos/
//para realizar consultas

export async function obtieneDatos() {
    const respuesta = await http().get("/todos")
    return respuesta.data;

}

export async function listarCliente() {
    const respuesta = await http().get("/cliente")
    return respuesta.data;

}