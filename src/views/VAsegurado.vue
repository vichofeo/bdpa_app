<template>
    <div>
        <template>

            <v-card class="mx-auto">
                <v-card-title class="font-weight-black" style="color: #4175a9; font-size: 25px">
                    Afiliados Titulares
                </v-card-title>

                <v-card-text>

                    <v-bottom-navigation :value="valueNavButton"  :background-color="colorNavButton" dark>


                        <v-btn color="success" dark class="mr-2" @click="openPopupDatos('NUEVO')"
                            v-show="bottonShowNuevo">
                            <span>Nuevo</span>
                            <v-icon>mdi-account-plus-outline</v-icon>
                        </v-btn>
                        <v-btn color="primary" dark class="mr-2" @click="openPopupDatos('DETALLES')"
                            v-show="bottonShowDetalles">
                            Detalles
                            <v-icon>mdi-badge-account-outline</v-icon>
                        </v-btn>

                        <v-btn color="error" dark class="mr-2" @click="openPopupDatos('BAJA')" v-show="bottonShowBaja">
                            Baja
                            <v-icon>mdi-account-remove-outline</v-icon>
                        </v-btn>
                        <v-btn color="blue-grey" dark class="mr-2" @click="openPopupDatos('AMPLIACION')"
                            v-show="bottonShowAmpliacion">
                            Ampliacion
                            <v-icon>mdi-account-details-outline</v-icon>
                        </v-btn>
                        <v-btn dark class="mr-2" v-show="bottonShowBeneficiario" color="#EC945C"
                            @click="openPopupDatos('BENEFICIARIOS')">
                            Beneficiarios
                            <v-icon>mdi-account-group-outline</v-icon>
                        </v-btn>
                        <v-spacer> </v-spacer>



                        
                        <v-text-field v-model="messageSearch" 
                        :append-icon="'mdi-account-search-outline'"
                        :append-outer-icon="'mdi-send'"
                            clear-icon="mdi-close-circle" clearable 
                            label="Buscar" type="text" placeholder="Ej:544487"
                            prefix="Nro. Doc:" hide-details 
                            
                            @click:append-outer="sendMessageSearch"
                            @click:clear="clearMessageSearch">
                        </v-text-field>
                    </v-bottom-navigation>



                </v-card-text>


            </v-card>

            <br />
            <v-card class="mx-auto">
                <v-card-text>

                    <div>

                        <v-data-table dense :disable-sort=true :single-select=true v-model="selected" :headers="headers"
                            :items="desserts" show-select hide-default-footer item-key="id" class="elevation-1"
                            :loading="loadingTable" 
                            loading-text="Cargando.....  por favor espere">


                            <template v-slot:item.numero_documento="{ item }">

                                {{ `${item.tipo_documento}: ${item.numero_documento}` }}
                            </template>
                            <template v-slot:item.estado="{ item }">
                                <v-chip :color="getColor(item.estado.descripcion)" dark >
                                    {{ item.estado.descripcion }}
                                </v-chip>
                            </template>
                            <template v-slot:item.nombres="{ item }">
                                {{ `${item.primer_apellido} ${item.segundo_apellido} ${item.nombres}` }}

                            </template>
                            <template v-slot:item.fecha_estado="{ item }">
                                {{ getTipoFecha(item.estado) }}
                            </template>
                        </v-data-table>
                        <v-pagination v-model="pageTableData" class="my-4" :length="pageTotal"
                                                :total-visible="pageLimitRowTable" @input="getDataAfiliado">
                                            </v-pagination>
                        <div class="text-center">
                            <v-container>
                                <v-row justify="center">
                                    <v-col cols="8">
                                        <v-container class="max-width">
                                           
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                    </div>

                </v-card-text>
            </v-card>
        </template>


     
        <v-dialog 
        v-model="dialog" fullscreen hide-overlay 
        transition="dialog-bottom-transition" style="z-index: 10000">
        
            
      <v-card>
        <v-toolbar dark color="#1D62A1" dense>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ tituloPopup }} - AFILIADO</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              Cerrar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-divider></v-divider>
        <CRegistroTitularVue v-if="indexComponente == 1" />
                    <CDetalleTitular v-if="indexComponente == 2" :rowSelected="this.selected[0]" ref="Cdt900" />

      </v-card>
    </v-dialog>


    </div>
</template>
<script>
import axios from 'axios'
import CRegistroTitularVue from '@/components/asegurado/CRegistroTitular.vue';
import CDetalleTitular from '@/components/asegurado/CDetalleTitular.vue';
import moment from 'moment'

export default {
    name: 'VAsegurado',
    components: {
        CRegistroTitularVue,
        CDetalleTitular,
    },
    computed: {
        colorNavButton() {
            switch (this.value) {
                case 0: return 'sucess'
                case 1: return 'teal'
                case 2: return 'brown'
                case 3: return 'indigo'
                default: return 'blue-grey'
            }
        },
    },

    data: () => ({
        pageTableData: 1,
        pageTotal: 0,
        pageLimitRowTable: 10,

        messageSearch: '',
        comboBoxSelected: { text: 'CI', id: 'CI' },
        comboBoxItems: [
            { text: 'Pasaporte', id: 'PAS' },
            { text: 'CI', id: 'CI' }],

        valueNavButton: 1,
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
                filterable: false,
                sortable: false,
                value: 'id',
            },
            {
                text: 'Documento',
                align: 'start',
                //filterable: false,
                sortable: false,
                value: 'numero_documento',
            },

            //{ text: 'Documento', value: 'numero_documento' },            
            { text: 'Nombre', value: 'nombres', filterable: false, },
            { text: 'Entidad', value: 'codigo_entidad', filterable: false, },
            { text: 'Tipo Asegurado', value: 'tipo_afiliacion', filterable: false, },
            { text: 'Estado', value: 'estado', filterable: false, },
            { text: 'Fecha Estado', value: 'fecha_estado', filterable: false, },
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
        
        showProgress: false,

    }),

    mounted() {
        this.getDataAfiliado();

    },
    methods: {

        clearMessageSearch() {
            this.messageSearch = ''
            this.sendMessageSearch()
        },


        sendMessageSearch(){
            this.pageTableData=1
            this.getDataAfiliado()

        },

        getDataAfiliado() {
            this.selected = []
            const token = sessionStorage.getItem('token');
            let url = "https://bdpa.asuss.gob.bo/api/v1/afiliado/ente-gestor";
            //let url = "http://192.168.10.24:9080/assus-asegurado-api/api/v1/afiliado/ente-gestor";
            try {
                axios.get(url, {
                    params: { page: this.pageTableData, limit: this.pageLimitRowTable, numero_documento_identidad: this.messageSearch },
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(response => {
                        this.pageTotal = response.data.total
                        this.pageTotal = Math.ceil(this.pageTotal / this.pageLimitRowTable)


                        this.desserts = response.data.datos.map((i, idx) => {
                            return {
                                ...i, id: (idx + 1) + (this.pageLimitRowTable * (this.pageTableData - 1))
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


        getColor(color) {
            if (color == "CESANTIA") return "red";
            if (color == "ACTIVO") return "green";
            if (color == "AMPLIACIÓN") return "orange"
            if (color == "ACTIVO - BAJA REGISTRADO") return "#92D050"
            if (color == "INACTIVO") return "#808080"

        },

        getTipoFecha(obj) {
            if (obj.descripcion == "CESANTIA") return moment(obj.fecha_cesantia, "YYYY-MM-DD").format("DD/MM/YYYY");
            if (obj.descripcion == "ACTIVO") return "";
            if (obj.descripcion == "AMPLIACIÓN") return moment(obj.fecha_ampliacion).format("DD/MM/YYYY")
            if (obj.descripcion == "ACTIVO - BAJA REGISTRADO") return moment(obj.fecha_baja).format("DD/MM/YYYY")
            if (obj.descripcion == "INACTIVO") return ""
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
                    //if(!this.$refs.Cdt900.saludo)
                    //this.$refs.Cdt900.saludo()
                    try {
                        this.$refs.Cdt900.verInfoDetallada()
                    } catch (error) {
                        console.log("Variable is Undefined")
                    }



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
                   
            
                if (newSelect.length > 0) {
                    
                        
                        this.bottonShowDetalles = true;
                        this.bottonShowBaja = true;
                        this.bottonShowAmpliacion = true;
                        this.bottonShowBeneficiario = true;
                    
                } else {
                    this.bottonShowDetalles = false;
                    this.bottonShowBaja = false;
                    this.bottonShowAmpliacion = false;
                    this.bottonShowBeneficiario = false;
                    
                }
            
        },
    },
   
}
</script>
