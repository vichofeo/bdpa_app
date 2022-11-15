<template>
    <div>
        <template>
            <v-card color="red lighten-2" dark>
                <v-card-title class="text-h6 red lighten-3">
                    Bucar Afiliados
                </v-card-title>
                <v-card-text>
                    <div class="row a">
                        <div class="col-md-6">
                            <div class="text-start fw-bold">TIPO DE DOCUMENTO:</div>
                            <div class="text-start h6"><select class="form-select col-md-3" aria-label="tipo_documento"
                                    id="tipo_documento" v-model="registro.tipo_documento" required>
                                    <option value="CI">CARNET DE IDENTIDAD</option>
                                    <option value="PAS">PASAPORTE</option>
                                </select>
                                <p v-if="!registro.tipo_documento" class="mensaje">Información obligatoria</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="text-start fw-bold">Nro. DOCUMENTO:</div>
                            <div><input type="text" class="form-control col-md-3" id="numero_documento"
                                    v-model="registro.numero_documento" required>
                                <p v-if="!registro.numero_documento" class="mensaje">Información obligatoria</p>
                            </div>
                        </div>
                    </div>
                    <div class="row a">
                        <div class="col-md-6">
                            <div class="text-start fw-bold">TIPO DE ASEGURADO:</div>
                            <div><select class="form-select col-md-3" aria-label="tipo_asegurado" id="tipo_asegurado"
                                    v-model="registro.tipo_asegurado" required>
                                    <option value="TRABAJADOR">TRABAJADOR</option>
                                    <option value="RENTISTA">RENTISTA</option>
                                    <option value="VOLUNTARIO">VOLUNTARIO</option>
                                    <option value="CONVENIO">CONVENIO</option>
                                    <option value="UNIVERISTARIO">UNIVERISTARIO</option>
                                </select>
                                <p v-if="!registro.tipo_asegurado" class="mensaje">Información obligatoria</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="text-start fw-bold">FECHA DE NACIMIENTO:</div>
                            <div><input type="date" class="form-control col-md-3" id="fecha_nacimiento"
                                    v-model="registro.fecha_nacimiento" required>
                                <p v-if="!registro.fecha_nacimiento" class="mensaje">Información obligatoria</p>
                            </div>
                        </div>
                    </div>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-3" @click="listarTituares()">
                        Mostrar Toto
                        <v-icon right>
                            mdi-close-circle
                        </v-icon>
                    </v-btn>
                    <v-btn color="grey darken-3" @click="validarTitular()">
                        Buscar
                        <v-icon right>
                            mdi-close-circle
                        </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>

        <template>
            <v-card>
                <v-tabs color="deep-purple accent-4" right>
                    <v-tab>Datos</v-tab>
                    <v-tab>Nuevo</v-tab>
                    <v-tab>Titular</v-tab>
                    <v-tab>Beneficiarios</v-tab>
                    <v-tab>Validacion</v-tab>

                    <v-tab-item v-for=" i in 5" :key="i">
                        <v-container fluid>
                            <v-row :key="`${i}-C`">
                                <CResultSearch v-if="i == 1" :allData="grillaGeneral" />
                                <CRegistroTitular v-if="i == 2" />
                                <Ctitulares v-if="i == 3" />
                                <CBeneficiario v-if="i == 4" />

                                <CValidacionTitular v-if="i == 5" />
                            </v-row>
                        </v-container>
                    </v-tab-item>
                </v-tabs>
            </v-card>

        </template>

    </div>
</template>
  
<script>
import CResultSearch from "@/components/asegurado/CResultSearch.vue"
import Ctitulares from "@/components/asegurado/Ctitulares.vue";
import CRegistroTitular from "@/components/asegurado/CRegistroTitular.vue";
import CBeneficiario from "@/components/asegurado/CBeneficiario.vue";
import CValidacionTitular from "@/components/asegurado/CValidacionTitular.vue";

import axios from 'axios';

export default {
    name: "AseguradoView",
    data: () => ({
        registro: {},
        registroValidacion: {},

        plural: 'Afiliados Titulares',
        singular: 'Afilidao',
        grillaGeneral: [],
        entidades: [],
        registrosEstadoAsegurado: [],
        registrosFuentePago: [],

        elementosPorPagina: 2,
        datosPaginados: [],
        paginaActual: 1,
        json: {},
        estados: '',
        fechaBaja: '',
        fechaCesantia: '',
        fechaAmpliacion: '',
        tipoAsegurado: '',
        datosGenerales: '',
        razonSocial: '',
        nit: '',
        estadoAlmacenamiento: '',
        estadoRespuestaSegip: '',
        estadoIdentidad: '',
        estadoAsegurado: '',
        registrosEstadoIdentidad: '',
        swAdd: '',
        estadoAlmacenamientoCodigo: '',
        estadoAlmacenamientoInsercion: '',
    }),
    methods: {
        async validarTitular() {
            var anio_nac = new Date(document.getElementById('fecha_nacimiento').value);
            var fecha_actual = new Date();
            var anio_actual = fecha_actual.getFullYear();
            var y = anio_nac.getFullYear();
            var anioValidoInicio = anio_actual - 65;
            var anioValidoFin = anio_actual - 18;
            var edad = anio_actual - y;
            if ((y > anioValidoInicio) && (y < anioValidoFin)) {
                //console.log('edad',edad,'años');
                this.swAdd = '';
                this.errores = [];
                var elementos = new Object();
                let dataEntradaInsercion = '';
                let response = '';
                let i = 0;
                if (this.registro && !this.registro.tipo_documento) {
                    this.errores.push('Falta Tipo documento');
                }
                if (this.registro && !this.registro.numero_documento) {
                    this.errores.push('Falta Numero documento');
                }
                if (this.registro && !this.registro.fecha_nacimiento) {
                    this.errores.push('Falta Fecha nacimiento');
                }
                if (this.registro && !this.registro.tipo_asegurado) {
                    this.errores.push('Falta Tipo asegurado');
                }
                console.log("Errores >>> ", this.errores);
                if (this.errores.length === 0) {
                    elementos.tipo_documento = this.registro.tipo_documento;
                    elementos.numero_documento = this.registro.numero_documento;
                    elementos.fecha_nacimiento = this.registro.fecha_nacimiento;
                    elementos.tipo_asegurado = this.registro.tipo_asegurado;
                    var data = new Array();
                    data.push(elementos);
                    dataEntradaInsercion = JSON.stringify({ data });
                    const token = sessionStorage.getItem('token');
                    let url = "https://bdpa.asuss.gob.bo/api/v1/validacion/afiliado";
                    //try {
                    response = await axios.post(url, JSON.parse(dataEntradaInsercion), {
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                        .then(response => {
                            this.registroValidacion = response;
                            console.log('this.registroValidacion', this.registroValidacion);
                            this.grillaGeneral = this.registroValidacion.data;
                            //datos generales
                            this.datosGenerales = this.registroValidacion.data[0].nombres + ' ' + this.registroValidacion.data[0].primer_apellido + ' ' + this.registroValidacion.data[0].segundo_apellido;
                            this.estadoAlmacenamiento = this.registroValidacion.data[0].estado_almacenamiento.codigo;
                            if (this.estadoAlmacenamiento == 0) {
                                this.estadoAlmacenamiento = this.estadoAlmacenamiento + '-' + 'Validacion no ejecutada'
                            }
                            if (this.estadoAlmacenamiento == 500) {
                                this.estadoAlmacenamiento = this.estadoAlmacenamiento + '-' + 'Registro guardado sin observaciones.'
                            }
                            if (this.estadoAlmacenamiento == 501) {
                                this.estadoAlmacenamiento = this.estadoAlmacenamiento + '-' + 'Registro guardado con observaciones.'
                            }
                            if (this.estadoAlmacenamiento == 502) {
                                this.estadoAlmacenamiento = this.estadoAlmacenamiento + '-' + 'Registro ya existente, no guardado'
                            }
                            if (this.estadoAlmacenamiento == 503) {
                                this.estadoAlmacenamiento = this.estadoAlmacenamiento + '-' + 'Registro no guardado.'
                            }

                            //ESTADO_RESPUESTA_SEGIP
                            this.estadoRespuestaSegip = this.registroValidacion.data[0].estado_respuesta.codigo;
                            if (this.estadoRespuestaSegip == 100) {
                                this.estadoRespuestaSegip = this.estadoRespuestaSegip + '-' + 'Registro Encontrado en SEGIP.';
                                this.swAdd = this.registroValidacion.data[0].estado_respuesta.codigo;
                            }
                            if (this.estadoRespuestaSegip == 0) {
                                this.estadoRespuestaSegip = this.estadoRespuestaSegip + '-' + 'Validacion no ejecutada.';
                            }
                            if (this.estadoRespuestaSegip == 101) {
                                this.estadoRespuestaSegip = this.estadoRespuestaSegip + '-' + 'Registro no encontrado en SEGIP.';
                                this.$swal({
                                    title: 'Advertencia!',
                                    text: 'No se encontraron lo datos en SEGIP. Por favor verifique los datos.',
                                    icon: 'warning',
                                    confirmButtonText: 'Aceptar'
                                });

                            }
                            if (this.estadoRespuestaSegip == 102) {
                                this.estadoRespuestaSegip = this.estadoRespuestaSegip + '-' + 'Registro con formatos incorrectos.';
                                this.$swal({
                                    title: 'Advertencia!',
                                    text: 'Por favor verifique los datos introducidos',
                                    icon: 'warning',
                                    confirmButtonText: 'Aceptar'
                                })
                            }

                            //ESTADO_IDENTIDAD
                            this.estadoIdentidad = this.registroValidacion.data[0].estado_identidad.codigo;
                            if (this.estadoIdentidad == 200) {
                                this.estadoIdentidad = this.estadoIdentidad + '-' + 'Datos verificados correctamente.';
                                //return this.registrosEstadoIdentidad = [];
                            }
                            if (this.estadoIdentidad == 0) {
                                this.estadoIdentidad = this.estadoIdentidad + '-' + 'Validacion no ejecutada.';
                                //return this.registrosEstadoIdentidad = [];
                            }
                            if (this.estadoIdentidad == 201) {
                                this.estadoIdentidad = this.estadoIdentidad + '-' + 'Datos faltantes o no coincidentes, por diferencias mínimas, con el registro de la fuente.';
                                //return this.registrosEstadoIdentidad = [];
                            }
                            if (this.estadoIdentidad == 202) {
                                this.estadoIdentidad = 'Datos no coincidentes, por grandes diferencias, con el registro de la fuente.';
                                this.registrosEstadoIdentidad = this.estadoIdentidad + '-' + this.registroValidacion.data[0].estado_identidad.detalle;
                            }

                            //CODIGOS ESTADO ASEGURADO
                            this.estadoAsegurado = this.registroValidacion.data[0].estado_asegurado.codigo;
                            if (this.estadoAsegurado == 0) {
                                this.estadoAsegurado = this.estadoAsegurado + '-' + 'Validacion no ejecutada.';
                            }
                            if (this.estadoAsegurado == 400) {
                                this.estadoAsegurado = this.estadoAsegurado + '-' + 'Persona sin duplicidad en su registro de asegurado.';
                            }
                            if (this.estadoAsegurado == 401) {
                                this.estadoAsegurado = this.estadoAsegurado + '-' + 'Persona ya registrada por otro Ente Gestor.';
                            }

                            //estado asegurado
                            this.codigoEstadoAsegurado = this.registroValidacion.data[0].estado_asegurado.codigo;
                            if (this.codigoEstadoAsegurado == '0') {
                                return this.registrosEstadoAsegurado = [];
                            }
                            if (this.codigoEstadoAsegurado == '400') {
                                return this.registrosEstadoAsegurado = [];
                            }
                            if (this.codigoEstadoAsegurado == '401') {
                                this.registrosEstadoAsegurado = this.registroValidacion.data[0].estado_asegurado.detalle;
                                this.tipoAsegurado = this.registroValidacion.data[0].tipo_asegurado;
                            }

                            //CODIGOS ESTADO FUENTE DE PAGO
                            this.estadoFuentePago = this.registroValidacion.data[0].estado_fuente_pago.codigo;
                            if (this.estadoFuentePago == 0) {
                                this.estadoFuentePago = this.estadoFuentePago + '-' + 'Validacion no ejecutada.';
                            }
                            if (this.estadoFuentePago == 300) {
                                this.estadoFuentePago = this.estadoFuentePago + '-' + 'Datos encontrados en la fuente de pago';
                            }
                            if (this.estadoFuentePago == 301) {
                                this.estadoFuentePago = this.estadoFuentePago + '-' + 'Datos no encontrados en la fuente de pago';
                            }


                            // EN CASO DE ENCONTRAR LOS DATOS EN SEGIP
                            //estado fuente de pago
                            this.codigoEstadoFuentePago = this.registroValidacion.data[0].estado_fuente_pago.codigo;
                            if (this.codigoEstadoFuentePago == '301') {
                                return this.registrosFuentePago = [];

                            } else {
                                this.registrosFuentePago = this.registroValidacion.data[0].estado_fuente_pago.detalle;
                                this.codigoEstadoFuentePago = this.registroValidacion.data[0].estado_fuente_pago.codigo;
                                if (this.registrosFuentePago[0].matricula_comercio == null) {
                                    this.registrosFuentePago[0].matricula_comercio = '-'
                                }
                                this.razonSocial = this.registrosFuentePago.razon_social;
                                this.nit = this.registrosFuentePago.nit;
                            }
                        })
                } else {
                    this.$swal({
                        title: 'Error!',
                        text: 'Debe introducir la información obligatoria',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } else {
                this.$swal({
                    title: 'Error!',
                    text: 'El año no es permitido',
                    confirmButtonText: 'Aceptar'
                });
            }
        },
        listarTituares() {
            const token = sessionStorage.getItem('token');
            let url = "https://bdpa.asuss.gob.bo/api/v1/afiliado/ente-gestor";
            try {
                axios.get(url, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(response => {
                        this.grillaGeneral = response.data.datos;
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
    },
    components: {
        CResultSearch,
        Ctitulares,
        CRegistroTitular,
        CBeneficiario,
        CValidacionTitular
    },
};
</script>
  
<style>

</style>