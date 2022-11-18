<template>
    <section>

        <div>
            <div>
                <h1 class=" fs-5 fw-bold" id="exampleModalLabel">INFORMACION DETALLADA - AFILIADOS
                    TITULARES</h1>
            </div>
            <div>

                <div class="col-sm-6 text-start fw-bold a">AFILIADO:{{ registrosEstadoBusqueda }}</div>
                <div class="container text-left a">
                    <div class="row a">
                        <div class="col-sm-6 text-start fw-bold a">ENTIDAD:</div>
                        <div class="col-sm-6 text-start a">{{ this.registro.codigo_entidad }}</div>
                    </div>
                    <div class="row a">
                        <div class="col-sm-6 text-start fw-bold a">TIPO DOCUMENTO:</div>
                        <div class="col-sm-6 text-start">{{ this.registro.tipo_documento }}</div>
                    </div>
                    <div class="row a">
                        <div class="col-sm-6 text-start fw-bold a">C.I:</div>
                        <div class="col-sm-6 text-start">{{ this.registro.numero_documento }}</div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 text-start fw-bold a">COMPLEMENTO:</div>
                        <div class="col-sm-6 text-start">{{ this.registro.complemento_documento }}</div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 text-start fw-bold">FECHA NACIMIENTO:</div>
                        <div class="col-sm-6 text-start">{{ this.registro.fecha_nacimiento }}</div>
                    </div>
                    <div class="row a">
                        <div class="col-sm-6 text-start fw-bold a">NOMBRE:</div>
                        <div class="col-sm-6 text-start">
                            {{ this.registro.primer_apellido }} {{ this.registro.segundo_apellido }} {{
                                    this.registro.nombres
                            }}</div>
                    </div><br>
                    <div class="alert alert-success" role="alert">
                        Estado del Afiliado
                    </div>
                    <div class="row a">
                        <div class="col-sm-6 text-start fw-bold">ESTADO:</div>
                        <div class="col-sm-6 text-start">{{ registrosEstadoBusqueda }}</div>
                    </div>
                    <div class="row a">
                        <div class="col-sm-6 text-start fw-bold">FECHA BAJA:</div>
                        <div class="col-sm-6 text-start">{{ registrosFecBajaBusqueda }}</div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 text-start fw-bold">FECHA CESANTIA:</div>
                        <div class="col-sm-6 text-start">{{ registrosFecCesantiaBusqueda }}</div>
                    </div>
                    <div class="row a">
                        <div class="col-sm-6 text-start fw-bold">FECHA AMPLIACION:</div>
                        <div class="col-sm-6 text-start">{{ registrosFecAmpliacionBusqueda }}</div>
                    </div>
                    <div class="alert alert-success" role="alert" v-show="swBen == true">
                        Información de Beneficiarios
                    </div>
                    <table class="table table-hover table-striped table-responsive" id="divTable"
                        v-show="swBen == true">
                        <thead class="thead-dark">
                            <tr>
                                <!--th scope="col">#</th-->
                                <th scope="col">Tipo Doc.</th>
                                <th scope="col">Compl.</th>
                                <th scope="col">C.I.</th>
                                <th scope="col">Nombre y Apellidos</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Fecha Baja</th>
                                <th scope="col">Fecha Cesantia</th>
                                <th scope="col">Fecha Ampliación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="b in registrosBeneficiarios ">
                                <!--td width="3%" scope="row">{{ index }}</td-->
                                <td>{{ b.tipo_documento }}</td>
                                <td>{{ b.complemento_documento }}</td>
                                <td>{{ b.numero_documento }}</td>
                                <td>{{ b.primer_apellido }}&nbsp;{{ b.segundo_apellido }} {{ b.nombres }}</td>
                                <td>{{ estadoBen }}</td>
                                <td>{{ bajaBen }}</td>
                                <td>{{ cesantiaBen }}</td>
                                <td>{{ ampliacionBen }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </section>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    props: {
        rowSelected: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            plural: 'Afiliados Titulares',
            singular: 'Afilidao',
            registros: [],
            registro: {},
            elementosPorPagina: 2,
            datosPaginados: [],
            paginaActual: 1,
            json: {},
            registrosEstadoBusqueda: '',
            registrosFecBajaBusqueda: '',
            registrosFecCesantiaBusqueda: '',
            registrosFecAmpliacionBusqueda: '',
            registrosEnteGestor: '',
            registrosBeneficiarios: '',
            registrosBeneficiariosEstados: '',
            estadoBen: '',
            bajaBen: '',
            cesantiaBen: '',
            ampliacionBen: '',
            resultadoPersona: '',
            swBen: false
        }
    },


    destroyed() {

        //console.log("Componente eliminado");
    },
    mounted() {



        this.verInfoDetallada();
    },

    methods: {

        async verInfoDetallada() {

            let responseBusqueda = '';
            this.registro = this.rowSelected;

            const token = sessionStorage.getItem('token');

            let url = `https://bdpa.asuss.gob.bo/api/v1//asegurado/buscar/titular/${this.registro.tipo_documento}/${this.registro.numero_documento}/${this.registro.fecha_nacimiento}/${this.registro.codigo_entidad}`;

            responseBusqueda = await axios.get(url, {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(responseBusqueda => {
                    this.registrosTitular = responseBusqueda.data.titular;
                    this.registrosEstado = responseBusqueda.data.titular.estado;
                    this.registrosEnteGestor = responseBusqueda.data.ente_gestor;
                    this.resultadoPersona = responseBusqueda.data.resultado_persona;
                    this.registrosBeneficiarios = responseBusqueda.data.ente_gestor[0].beneficiarios;
                    this.registrosEstadoBusqueda = this.registrosEstado.descripcion;
                    this.registrosFecBajaBusqueda = !this.registrosEstado.fecha_baja ? '-' : this.registrosEstado.fecha_baja;
                    this.registrosFecCesantiaBusqueda = !this.registrosEstado.fecha_cesantia ? '-' : this.registrosEstado.fecha_cesantia;
                    this.registrosFecAmpliacionBusqueda = !this.registrosEstado.fecha_ampliacion ? '-' : this.registrosEstado.fecha_ampliacion;
                    this.registrosResultadoEnteGestor = responseBusqueda.data.ente_gestor;
                    if (this.registrosBeneficiarios.length > 0) {
                        this.registrosBeneficiariosEstados = responseBusqueda.data.ente_gestor[0].beneficiarios[0].estado.descripcion;
                        this.estadoBen = responseBusqueda.data.ente_gestor[0].beneficiarios[0].estado.descripcion;
                        this.bajaBen = !responseBusqueda.data.ente_gestor[0].beneficiarios[0].estado.fecha_baja ? '-' : responseBusqueda.data.ente_gestor[0].beneficiarios[0].estado.fecha_baja;
                        this.cesantiaBen = !responseBusqueda.data.ente_gestor[0].beneficiarios[0].estado.fecha_cesantia ? '-' : responseBusqueda.data.ente_gestor[0].beneficiarios[0].estado.fecha_cesantia;
                        this.ampliacionBen = !responseBusqueda.data.ente_gestor[0].beneficiarios[0].estado.fecha_ampliacion ? '-' : responseBusqueda.data.ente_gestor[0].beneficiarios[0].estado.fecha_ampliacion;
                        this.swBen = true;
                    } else {
                        this.swBen = false;
                    }






                })

        },

        enviarRegistro() {
            this.$router.push("/registroTitular");
        }

    },


}
</script>
<style>
.mensaje {
    color: red;
    font-size: 12px;
    text-align: left;
}

div.a {
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
}
</style>