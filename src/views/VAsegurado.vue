<template>
    <div>
        <template>
            
            <v-card class="mx-auto">
                <v-card-title class="font-weight-black" style="color: #4175a9; font-size: 25px">
                    Afiliados Titulares
                </v-card-title>
<!--
                <v-card-text>
                    <v-form>
                        <v-row align="center" justify="center">
                            <v-col class="d-flex" cols="4" sm="3">
                                <v-select item-text="name" item-value="id" :items="tipoDocCombobox" label="Tipo Doc."
                                    v-model="patrametros.idTipoDocumento" dense></v-select>
                            </v-col>

                            <v-col cols="12" md="3">
                                <v-text-field v-model="patrametros.nroDocumento" label="Nro. Documento :" required
                                    dense></v-text-field>
                            </v-col>

                            <v-col class="d-flex" cols="12" sm="3">
                                <v-btn class="ma-2" color="success" @click="getDataAfiliadoByParameters">
                                    Buscar
                                </v-btn>
                                <v-btn class="ma-2" color="depressed" @click="limpiarGrid">
                                    Limpiar
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-row> </v-row>
                    </v-form>
                </v-card-text>
            -->
            </v-card>

            <br />
            <v-card class="mx-auto">
                <v-card-text> 
                    <div class="mb-3">
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-btn color="success" dark class="mr-2" @click="openPopupDatos('NUEVO')"
                                    v-show="bottonShowNuevo">
                                    Nuevo
                                </v-btn>
                                <v-btn color="primary" dark class="mr-2" @click="openPopupDatos('DETALLES')"
                                    v-show="bottonShowDetalles">
                                    Detalles
                                </v-btn>

                                <v-btn color="error" dark class="mr-2" @click="openPopupDatos('BAJA')"
                                    v-show="bottonShowBaja">
                                    Baja
                                </v-btn>
                                <v-btn color="blue-grey" dark class="mr-2" @click="openPopupDatos('AMPLIACION')"
                                    v-show="bottonShowAmpliacion">
                                    Ampliacion
                                </v-btn>
                                <v-btn dark class="mr-2" v-show="bottonShowBeneficiario" color="#EC945C"
                                    @click="openPopupDatos('BENEFICIARIOS')">
                                    Beneficiarios
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>

                    <v-data-table dense v-model="selected" :headers="headers" :items="desserts" :single-select=true
                        item-key="id" show-select class="elevation-1" :loading="loadingTable"
                        loading-text="Cargando.....  por favor espere">


                        <template v-slot:item.numero_documento="{ item }">
                            
                            {{ `${item.tipo_documento}: ${item.numero_documento}` }}
                        </template>
                        <template v-slot:item.estado="{ item }">
                            <v-chip :color="getColor(item.estado)" dark>
                                {{ item.estado.descripcion }}
                            </v-chip>
                        </template>
                        <template v-slot:item.nombre="{ item }">

                            {{ `${item.primer_apellido} ${item.segundo_apellido} ${item.nombres}` }}

                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </template>


        <v-dialog v-model="dialog" fullscreen hide-overlay scrollable transition="dialog-bottom-transition"
            style="z-index: 10000">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ tituloPopup }} - AFILIADO</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">
                            cerrar
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>

                    
                    

<CRegistroTitularVue v-if="indexComponente == 1" />
<CDetalleTitular v-if="indexComponente == 2" :rowSelected="this.selected[0]"/>

                </v-card-text>
            </v-card>
        </v-dialog>



    </div>
</template>
<script>
import axios from 'axios'
import CRegistroTitularVue from '@/components/asegurado/CRegistroTitular.vue';
import CDetalleTitular from '@/components/asegurado/CDetalleTitular.vue';
export default {
    name: 'cPubli',
    components:{
        CRegistroTitularVue,
        CDetalleTitular,
    },
    data: () => ({

        listadoAfiliados: [],
        singleSelect: true,
        selected: [],
        dialog: false,
        tituloPopup: '',
        indexComponente: 0,
        headers: [
        {
                text: '#',
                align: 'start',
                //filterable: false,
                sortable: false,
                value: 'index',
            },    
        {
                text: 'Documento',
                align: 'start',
                //filterable: false,
                sortable: false,
                value: 'numero_documento',
            },
            
            //{ text: 'Documento', value: 'numero_documento' },            
            { text: 'Nombre', value: 'nombre' },
            { text: 'Entidad', value: 'codigo_entidad' },   
            { text: 'Tipo Asegurado', value: 'tipo_afiliacion' },
            { text: 'Estado', value: 'estado' },
            { text: 'Fecha Estado', value: 'fecha_estado' },
        ],
        desserts: [],
        loadingTable: false,
        patrametros: {},


        habilitarBotton: true,
        link: null,
        viewCargando: false,
        bottonShow: true,
        bottonShowNuevo: true,
        bottonShowDetalles: false,
        bottonShowBaja: false,
        bottonShowAmpliacion: false,
        bottonShowBeneficiario: false,
        bottonShowDefinicion: false,
        showProgress: false,

    }),

    mounted() {
        this.getDataAfiliado();
        this.getDatTipoDocumento();
    },
    methods: {
        getDatTipoDocumento() {
            this.tipoDocCombobox = [
                {
                    "id": 9000,
                    "name": "CARNET DE IDENTIDAD",
                    "codigo": "CI"
                },
                {
                    "id": 9001,
                    "name": "PASAPORTE",
                    "codigo": "PASS"
                }
            ];
        },


        getColorDefinicionCaso(definicion) {
            if (definicion == "SOSPECHOSO") return "orange";
            if (definicion == "NEGATIVO") return "green";
            if (definicion == "POSITIVO") return "red";
            if (definicion == "INDETERMINADO") return "yellow";
        },


        getDataAfiliado() {
            const token = sessionStorage.getItem('token');
            let url = "https://bdpa.asuss.gob.bo/api/v1/afiliado/ente-gestor";
            try {
                axios.get(url, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(response => {
                        this.desserts = response.data.datos.map((i, idx) => {
          return {... i, index: idx + 1
          };
        });
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
                this.desserts = []
                console.log('Hubo un error en la conexion a la BD');
                Swal.fire(
                    'Estimado Usuario',
                    'Hubo un error en la conección, comúniquese con el administrador',
                    'question'
                )
            }
        },

        getDataAfiliadoByParameters() {
            this.desserts = [];
        },
        limpiarGrid() {
            this.patrametros = {};
            this.getDataAfiliado();
        },
        getColor(sexo) {
            if (sexo == "F") return "green";
            if (sexo == "M") return "blue";
        },

        openPopupDatos(accion) {
            //alert(accion)
            this.dialog = true
            this.tituloPopup = accion





            switch (accion) {
                case 'NUEVO':
                this.indexComponente = 1
                    break;
                case 'DETALLES':
                    this.indexComponente = 2
                    break;
                case 'BAJA':
                    this.indexComponente = 3
                    break;
                case 'AMPLIACION':
                    this.indexComponente = 4
                    break;
                case 'BENEFICIARIOS':
                    this.indexComponente = 5
                    break;
                default:
                    break;
            }
        },
    },
    watch: {
        selected(newSelect, oldSelect) {
            let selectRegistro = newSelect[0];
            if (!this.habilitarBotton) {
                if (newSelect.length > 0) {
                    if (selectRegistro.estado == "DEFINIDO") {
                        this.bottonShowAmpliacion = true;
                        this.bottonShowBeneficiario = true;
                        this.bottonShowDefinicion = false;
                    } else {
                        this.bottonShowAmpliacion = true;
                        this.bottonShowBeneficiario = true;
                        this.bottonShowDefinicion = true;
                    }
                }
            } else {
                if (newSelect.length > 0) {
                    if (selectRegistro.estado == "DEFINIDO") {
                        this.bottonShowNuevo = true;
                        this.bottonShowDetalles = false;
                        this.bottonShowBaja = false;
                        this.bottonShowAmpliacion = true;
                        this.bottonShowBeneficiario = true;
                    } else {
                        this.bottonShowNuevo = true;
                        this.bottonShowDetalles = true;
                        this.bottonShowBaja = true;
                        this.bottonShowAmpliacion = true;
                        this.bottonShowBeneficiario = true;
                    }
                } else {
                    this.bottonShowNuevo = true;
                    this.bottonShowDetalles = false;
                    this.bottonShowBaja = false;
                    this.bottonShowAmpliacion = false;
                    this.bottonShowBeneficiario = false;
                    this.bottonShowDefinicion = false;
                }
            }
        },
    },
}
</script>
