<template>
  <section>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="AFILIADOS TITULARES" active>
          <template>
            <div class="container-fluid">
              <div class="card">
                  <div class="card-header">
                      <h5>{{ plural }}</h5>
                  </div>
                  <div class="card-body">
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
                                  <th scope="col">TIPO DOCUMENTO</th>
                                  <th scope="col">NRO. DOCUMENTO</th>
                                  <th scope="col">FECHA DE NACIMIENTO</th>
                                  <th scope="col">NOMBRES</th>
                                  <th scope="col">PATERNO</th>
                                  <th scope="col">MATERNO</th>
                                  <th scope="col">TIPO AFILIACION</th>
                                  <th scope="col">ESTADO</th>
                                  <th scope="col">OPCIONES</th>
                              </tr>
                          </thead>
                          <tbody>
                                <!--tr v-for="(r, index) in datosPaginados"-->
                                <tr v-for="(r, index) in registros">
                                  <td width="3%" scope="row">{{ index }}</td>
                                  <td>{{ r.tipo_documento}}</td>
                                  <td>{{ r.numero_documento}}</td>
                                  <td>{{ r.fecha_nacimiento}}</td>
                                  <td>{{ r.nombres}}</td>
                                  <td>{{ r.primer_apellido}}</td>
                                  <td>{{ r.segundo_apellido}}</td>
                                  <td>{{ r.tipo_afiliacion}}</td>        
                                  <td>
                                      <span v-if="r.estado.descripcion === 'CESANTIA'">{{r.estado.descripcion}}</span>
                                      <span v-if="r.estado.descripcion === 'ACTIVO'">{{r.estado.descripcion}}</span>
                                      <span v-else-if="r.estado.descripcion == 'AMPLIACIÓN'" class="text-primary">{{r.estado.descripcion}}</span>
                                  </td>
                                  <td width="15%" scope="row">
                                      <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" title="Búsqueda detallada"><span class="material-icons-outlined"  >search</span></button>                                          
                                      <button type="button" v-on:click="verInfo(index)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalEliminar"><span class="material-icons-outlined" title="Baja Afiliado">delete</span></button>                                          
                                      <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" title="Ampliación de baja"><span class="material-icons-outlined">event</span></button>                                                                                                     
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
              </div>
            </div>  
            <!--MODAL ELIMINAR-->
            <div class="modal fade" id="modalEliminar" tabindex="-1" aria-labelledby="#modalEliminar" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel" >BAJA AFILIADOS TITULARES</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="container text-left">
                      <div class="row">
                       <div class="col-sm-3 text-start fw-bold">ENTIDAD:</div>
                        <div class="col-sm-8 text-start h6">{{this.registro.codigo_entidad}}</div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3 text-start fw-bold">TIPO DOC.:</div>
                        <div class="col-sm-8 text-start">{{this.registro.tipo_documento}}</div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3 text-start fw-bold">C.I:</div>
                        <div class="col-sm-8 text-start">{{this.registro.numero_documento}}</div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3 text-start fw-bold">COMPL.:</div>
                        <div class="col-sm-8 text-start">{{this.registro.complemento_documento}}</div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3 text-start fw-bold">FEC. NAC.:</div>
                        <div class="col-sm-8 text-start">{{this.registro.fecha_nacimiento}}</div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3 text-start fw-bold">NOMBRE:</div>
                        <div class="col-sm-8 text-start">{{this.registro.nombres}} {{this.registro.primer_apellido}} {{this.registro.segundo_apellido}}</div>
                      </div>
                    </div><hr>
                    <div class="mb-3">
                      <div class="modal-dialog modal-lg" role="document">
                              <div class="modal-content">
                                    <div class="modal-body">
                                      <div class="row justify-content-left">
                                          <div class="col-md-6">
                                              <label>Fecha Baja</label>
                                              <input type="date" v-model="registro.fecha_baja" class="form-control" placeholder="Ingrese fecha de baja">
                                              <p v-if="!registro.fecha_baja" class="mensaje">Complete</p>

                                          </div>
                                          <div class="col-md-6">
                                              <label>Fecha Cesantia</label>
                                              <input type="date" v-model="registro.fecha_cesantia" class="form-control" placeholder="Ingrese fecha de cesantia">
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
          </template>
        </b-tab>
        <b-tab title="AFILIADOS BENEFICIARIOS">
          <b-card-text>LISTADO DE AFILIADOS EENEFICIARIOS</b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>



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
            datosPaginados:[],
            paginaActual:1
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
        let url ="https://bdpa.asuss.gob.bo/api/v1/afiliado/ente-gestor"; 
         try {
            axios.get(url , { headers: {"Authorization" : `Bearer ${token}`}    
          })
          .then(response => {
            this.registros = response.data.datos
            console.log("Success:",response.data);  
            console.log('response',response);
           // this.getDataPagina(1);
            if(response.data.total <= 0) {
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
        console.log('index',index);
        this.registro = [];
        this.registro = this.registros[index];
        console.log('doVer', this.registro); //registro que selecciona
        console.log('doVer', this.registro.tipo_documento);
        console.log('doVer', this.registro.numero_documento);
        console.log('doVer', this.registro.fecha_nacimiento);
        console.log('doVer', this.registro.codigo_entidad);        
      },  
     
      async  baja() {
        let gRegistro = this.registro;
        console.log('gRegistro',gRegistro);      
        console.log('doVer', this.registro.tipo_documento);
        console.log('doVer', this.registro.numero_documento);
        console.log('doVer', this.registro.fecha_nacimiento);
        console.log('doVer', this.registro.codigo_entidad);
        console.log('doVer', this.registro.fecha_baja);
        console.log('doVer', this.registro.fecha_cesantia);
        console.log('doVer', this.registro); 
        var dataBaja = new Object();
        dataBaja.tipo_documento =  this.registro.tipo_documento;
        dataBaja.numero_documento = this.registro.numero_documento;
        dataBaja.fecha_nacimiento = this.registro.fecha_nacimiento;
        dataBaja.codigo_entidad = this.registro.codigo_entidad;
        dataBaja.fecha_fin = this.registro.fecha_baja;
        dataBaja.fecha_fin_cesantia = this.registro.fecha_cesantia;       
       let dataEntrada = JSON.stringify(dataBaja);
       let dataEntrada1 = JSON.parse(dataEntrada);
       console.log('dataEntrada1',dataEntrada1);
       const token = sessionStorage.getItem('token');
          let url ="https://bdpa.asuss.gob.bo/api/v1/afiliado/ente-gestor"; 
          try {
              response = await axios.put(url , dataEntrada1, { headers: {"Authorization" : `Bearer ${token}`}
              })
              .then(response => {
                this.registros = response.data.datos;
                console.log("Success:",response.data); 
                console.log("Success:",response.data.codigo_respuesta);
                if (response.data.codigo_respuesta == 503){
                  Swal.fire(
                    'Estimado Usuario',
                    '¡Verifique los datos!:'+ response.data.mensaje,
                    'error'
                  )
                  this.listarTituares();
                }
                if (response.data.codigo_respuesta == 100){
                  Swal.fire(
                    'Estimado Usuario',
                    'El afiliado titular fue dado de baja exitosamente',
                    'success'
                  ) 
                  this.listarTituares();
                }
              })
          } catch (error) {
              Swal.fire(
                  'Estimado Usuario',
                  '¡Verifique los datos!: Fecha de Baja y Fecha de Cesantia son requeridos / Fecha de Baja no puede ser mayor a la fecha actual / La Fecha de cesantia no puede ser menor a la fecha de finalizacion',
                  'error'
                )
                this.listarTituares();            
          }
      }, 
    }


  }
</script>
