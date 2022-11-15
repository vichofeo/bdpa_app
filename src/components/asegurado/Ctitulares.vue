<template>
    <section>
        <div class="container-fluid">
            <!--div class="card"-->
            <!--div class="card-header"-->
            <!-- <img alt="Asuss" src="../assets/asuss_i.jpg">  -->
            <hr>
            <h5 class="fw-bold"><mark>{{ plural }}</mark></h5>
            <!--/div-->
            <div class="row a">
                <div class="col-md-2">
                    <button type="button" class="btn btn-primary" v-on:click="enviarRegistro()"
                        title="Búsqueda detallada"><span class="material-icons-outlined"></span>Registrar
                        Afiliado</button>
                </div>
                <div class="col-md-10"></div>
            </div>
            <div class="card-body a">
                <table class="table table-hover table-striped table-responsive" id="divTable">

                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <!--th>
                                <button type="button" class="btn btn-success" @click="doLimpiar()" data-toggle="modal"
                                    data-target="#modalNuevo">
                                    <i class="fa fa-plus white" aria-hidden="true"></i> Nuevo
                                </button>
                            </th-->
                            <th scope="col">NRO. DOCUMENTO</th>
                            <th scope="col">FECHA DE NACIMIENTO</th>
                            <th scope="col">NOMBRES Y APELLIDOS</th>
                            <th scope="col">TIPO AFILIACION</th>
                            <th scope="col">ESTADO</th>
                            <th scope="col">OPCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!--tr v-for="(r, index) in datosPaginados"-->
                        <tr v-for="(r, index) in registros">
                            <td width="3%" scope="row">{{ index }}</td>
                            <td>{{ r.numero_documento }}</td>
                            <td>{{ r.fecha_nacimiento }}</td>
                            <td>{{ r.nombres + ' ' + r.primer_apellido + ' ' + r.primer_apellido }}</td>
                            <td>{{ r.tipo_afiliacion }}</td>
                            <td>
                                <span v-if="r.estado.descripcion === 'CESANTIA'"
                                    class="badge text-bg-danger">{{ r.estado.descripcion }}</span>
                                <span v-if="r.estado.descripcion === 'ACTIVO'"
                                    class="badge text-bg-success">{{ r.estado.descripcion }}</span>
                                <span v-else-if="r.estado.descripcion == 'AMPLIACIÓN'"
                                    class="badge text-bg-warning">{{ r.estado.descripcion }}</span>
                            </td>
                            <td width="15%" scope="row">
                                <button type="button" v-on:click="verInfoDetallada(index)" class="btn btn-info"
                                    data-bs-toggle="modal" data-bs-target="#modalBusqueda"><span
                                        class="material-icons-outlined"
                                        title="Información Afiliado">search</span></button>
                                <button type="button" v-on:click="verInfo(index)" class="btn btn-danger"
                                    data-bs-toggle="modal" data-bs-target="#modalEliminar"
                                    :disabled="r.estado.descripcion === 'CESANTIA' || r.estado.descripcion === 'AMPLIACIÓN'"><span
                                        class="material-icons-outlined" title="Baja Afiliado">delete</span></button>
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" title="Ampliación de baja"
                                    :disabled="r.estado.descripcion === 'ACTIVO'"><span
                                        class="material-icons-outlined">event</span></button>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" title="Adicionar Beneficiarios"
                                    :disabled="r.estado.descripcion === 'CESANTIA' || r.estado.descripcion === 'AMPLIACIÓN'"><span
                                        class="material-icons-outlined">add</span></button>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item" v-on:click="getPreviusPage()"><a class="page-link" href="#">Anterior</a></li>
                    <li v-for="pagina in totalPaginas()" v-on:click="getDataPagina(pagina)" class="page-item" v-bind:class="isActive(pagina) "><a class="page-link" href="#">{{pagina}}</a></li>
                    <li class="page-item" v-on:click="getNextPage()"><a class="page-link" href="#">Siguiente</a></li>
                </ul>
                </nav-->
            </div>
            <!--/div-->
        </div>
        <!--MODAL ELIMINAR-->
        <div class="modal fade" id="modalEliminar" tabindex="-1" aria-labelledby="#modalEliminar" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">BAJA AFILIADOS TITULARES</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container text-left a">
                            <div class="row">
                                <div class="col-sm-3 text-start fw-bold">ENTIDAD:</div>
                                <div class="col-sm-8 text-start ">{{ this.registro.codigo_entidad }}</div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3 text-start fw-bold">TIPO DOC.:</div>
                                <div class="col-sm-8 text-start">{{ this.registro.tipo_documento }}</div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3 text-start fw-bold">C.I:</div>
                                <div class="col-sm-8 text-start">{{ this.registro.numero_documento }}</div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3 text-start fw-bold">COMPL.:</div>
                                <div class="col-sm-8 text-start">{{ this.registro.complemento_documento }}</div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3 text-start fw-bold">FEC. NAC.:</div>
                                <div class="col-sm-8 text-start">{{ this.registro.fecha_nacimiento }}</div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3 text-start fw-bold">NOMBRE:</div>
                                <div class="col-sm-8 text-start">{{ this.registro.nombres }}
                                    {{ this.registro.primer_apellido }} {{ this.registro.segundo_apellido }}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="mb-3 a">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-body a">
                                        <div class="alert alert-primary" role="alert">
                                            Introduzca los datos del formulario
                                        </div>
                                        <div class="row justify-content-left a">
                                            <div class="col-md-6 a">
                                                <label>Fecha Baja</label>
                                                <input type="date" v-model="registro.fecha_baja" class="form-control"
                                                    placeholder="Ingrese fecha de baja">
                                                <p v-if="!registro.fecha_baja" class="mensaje">Complete</p>

                                            </div>
                                            <div class="col-md-6 a">
                                                <label>Fecha Cesantia</label>
                                                <input type="date" v-model="registro.fecha_cesantia"
                                                    class="form-control" placeholder="Ingrese fecha de cesantia">
                                                <p v-if="!registro.fecha_baja" class="mensaje">Complete</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" @click="baja($event)" class="btn btn-primary">Baja Titular</button>
                    </div>
                </div>
            </div>
        </div>
        <!--MODAL ELIMINAR-->

        <!--MODAL BUSQUEDA-->
        <div class="modal fade" id="modalBusqueda" tabindex="-1" aria-labelledby="#modalBusqueda" aria-hidden="true"
            modal="lg">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">BUSQUEDA DETALLADA - AFILIADOS
                            TITULARES</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body a">
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
                                <div class="col-sm-6 text-start">{{ this.registro.nombres }}
                                    {{ this.registro.primer_apellido }} {{ this.registro.segundo_apellido }}</div>
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
                                        <td>{{ b.nombres }}&nbsp;{{ b.primer_apellido }}&nbsp;{{ b.segundo_apellido }}</td>
                                        <td>{{ estadoBen }}</td>
                                        <td>{{ bajaBen }}</td>
                                        <td>{{ cesantiaBen }}</td>
                                        <td>{{ ampliacionBen }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <!--MODAL BUSQUEDA-->

    </section>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    
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

    doLimpiar() {
        this.registro = {
            //nodo_codigo: '',
            //usn_user_id: '',
            //usn_nodo_id: '-1'
        };
    },

    mounted() {
        this.listarTituares();
    },
    methods: {
        /* totalPaginas(){
            return Math.ceil(this.registros.length / this.elementosPorPagina);
            },
    
            getDataPagina(noPagina){
            this.paginaActual = noPagina; 
            this.datosPaginados = [];
            let ini = (noPagina * this.elementosPorPagina) - this.elementosPorPagina;
            let fin = (noPagina * this.elementosPorPagina);
            this.datosPaginados = this.registros.slice(ini,fin);
            },
    
            getPreviusPage() {
            if (this.paginaActual > 1) {
                this.paginaActual--;
            }
            this.getDataPagina(this.paginaActual);
            },
    
            getNextPage() {
            if (this.paginaActual < this.totalPaginas()) {
                this.paginaActual++;
            }
            this.getDataPagina(this.paginaActual);
            },
    
            isActive(noPagina) {
            return noPagina == this.paginaActual ? 'active':'';
            },*/

        listarTituares() {
            const token = sessionStorage.getItem('token');
            let url = "https://bdpa.asuss.gob.bo/api/v1/afiliado/ente-gestor";
            try {
                axios.get(url, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(response => {
                        this.registros = response.data.datos;
                        // this.getDataPagina(1);
                        if (response.data.total <= 0) {
                            Swal.fire(
                                'Estimado Usuario',
                                'No existen registros',
                                'error'
                            )
                        }

                    });
            } catch (error) {
                console.log('Hubo un error en la conexion a la BD');
                Swal.fire(
                    'Estimado Usuario',
                    'Hubo un error en la conección, comúniquese con el administrador',
                    'question'
                )
            }

        },

        verInfo(index) {
            console.log('index', index);
            this.registro = [];
            this.registro = this.registros[index];
        },

        async baja() {
            var dataBaja = new Object();
            this.errores = [];

            if (this.registro && !this.registro.fecha_baja) {
                this.errores.push('Falta fecha_baja');
                console.log("error fecha_baja");
            }
            if (this.registro && !this.registro.fecha_cesantia) {
                this.errores.push('Falta fecha_cesantia');
                console.log("error fecha_cesantia");
            }
            if (this.errores.length === 0) {
                dataBaja.tipo_documento = this.registro.tipo_documento;
                dataBaja.numero_documento = this.registro.numero_documento;
                dataBaja.fecha_nacimiento = this.registro.fecha_nacimiento;
                dataBaja.codigo_entidad = this.registro.codigo_entidad;
                dataBaja.fecha_fin = this.registro.fecha_baja;
                dataBaja.fecha_fin_cesantia = this.registro.fecha_cesantia;
                let dataEntrada = JSON.stringify(dataBaja);
                let dataEntrada1 = JSON.parse(dataEntrada);
                const token = sessionStorage.getItem('token');
                let url = "https://bdpa.asuss.gob.bo/api/v1/afiliado/ente-gestor";
                //try {
                response = await axios.put(url, dataEntrada1, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(response => {
                        this.registros = response.data.datos;
                        if (response.data.codigo_respuesta == 503) {
                            Swal.fire(
                                'Estimado Usuario',
                                '¡Verifique los datos!:' + response.data.mensaje,
                                'error'
                            )
                            this.listarTituares();
                        }
                        if (response.data.codigo_respuesta == 100) {
                            Swal.fire(
                                'Estimado Usuario',
                                'El afiliado titular fue dado de baja exitosamente',
                                'success'
                            )
                            this.listarTituares();
                        }
                    })
                /*} catch (error) {
                    Swal.fire(
                        'Estimado Usuario',
                        '¡Verifique los datos!: Fecha de Baja y Fecha de Cesantia son requeridos / Fecha de Baja no puede ser mayor a la fecha actual / La Fecha de cesantia no puede ser menor a la fecha de finalizacion',
                        'error'
                    )
                            
                }*/

            } else {
                this.$swal({
                    title: 'Error!',
                    text: 'Debe introducir la información obligatoria',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        },

        async verInfoDetallada(index) {
            console.log('index', index);
            let responseBusqueda = '';
            this.registro = [];
            this.registro = this.registros[index];
            const token = sessionStorage.getItem('token');

            let url = `https://bdpa.asuss.gob.bo/api/v1//asegurado/buscar/titular/${this.registro.tipo_documento}/${this.registro.numero_documento}/${this.registro.fecha_nacimiento}/${this.registro.codigo_entidad}`;
            //try {
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






                    /*if (responseBusqueda.data.codigo_respuesta == 503){
                         Swal.fire(
                         'Estimado Usuario',
                         '¡Verifique los datos!:'+ responseBusqueda.data.mensaje,
                         'error'
                         )
                         this.listarTituares();
                     }
                     if (responseBusqueda.data.codigo_respuesta == 100){
                         SresponseBusquedaBusquedaresponseBusquedaBusquedawal.fire(
                         'Estimado Usuario',
                         'El afiliado titular fue dado de baja exitosamente',
                         'success'
                         ) 
                         this.listarTituares();
                     }*/
                })
            /*} catch (error) {
                Swal.fire(
                    'Estimado Usuario',
                    '¡Verifique los datos!: Fecha de Baja y Fecha de Cesantia son requeridos / Fecha de Baja no puede ser mayor a la fecha actual / La Fecha de cesantia no puede ser menor a la fecha de finalizacion',
                    'error'
                )
                this.listarTituares();            
            }*/
        },

        enviarRegistro() {
            this.$router.push("/registroTitular");
        }

    }


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