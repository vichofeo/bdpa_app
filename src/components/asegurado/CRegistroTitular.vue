<template>
    <div class="container a">fffffffffff
         <div class="alert alert-success" role="alert">
             Paso 1: Para el registro previamente debe validar al afiliado titular   
         </div>
         <div class="row a">
             <div class="col-md-6">
                 <div class="text-start fw-bold">TIPO DE DOCUMENTO:</div>
                 <div class="text-start h6"><select class="form-select col-md-3" aria-label="tipo_documento" id="tipo_documento" v-model="registro.tipo_documento" required>
                         <option value="CI">CARNET DE IDENTIDAD</option>
                         <option value="PAS">PASAPORTE</option> 
                     </select>
                     <p v-if="!registro.tipo_documento" class="mensaje">Información obligatoria</p></div>
             </div>
             <div class="col-md-6">
                 <div class="text-start fw-bold">Nro. DOCUMENTO:</div>
                 <div><input type="text" class="form-control col-md-3" id="numero_documento" v-model="registro.numero_documento" required>
                     <p v-if="!registro.numero_documento" class="mensaje">Información obligatoria</p>
                 </div>
             </div>
         </div>    
         <div class="row a">
             <div class="col-md-6">
                 <div class="text-start fw-bold">TIPO DE ASEGURADO:</div>
                 <div><select class="form-select col-md-3" aria-label="tipo_asegurado" id="tipo_asegurado" v-model="registro.tipo_asegurado" required>
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
                 <div><input type="date" class="form-control col-md-3" id="fecha_nacimiento"  v-model="registro.fecha_nacimiento" required>
                     <p v-if="!registro.fecha_nacimiento" class="mensaje">Información obligatoria</p>
                 </div>    
             </div> 
         </div> <br> 
         <div class="col-12">
             <button type="button" v-on:click="validarTitular()" class="btn btn-primary">1.- VALIDAR INFORMACIÓN</button>
             <!--button type="button" disabled="registro.tipo_documento && registro.numero_documento && registro.tipo_documento && registro.fecha_nacimiento" v-on:click="validarTitular()" class="btn btn-primary" >VALIDAR INFORMACIÓN</button-->
  
         </div><hr>
         <div class="row a">
             <div class="col-md-6">
                 <div class="text-start fw-bold">NOMBRE Y APELLIDOS:</div>
                 <div class="text-start h6 a">{{datosGenerales}}</div>    
             </div>
             <div class="col-md-6">
                 <div class="text-start fw-bold">ESTADO ALMACENAMIENTO:</div>
                 <div class="text-start h6 a">{{estadoAlmacenamiento}}</div>
             </div>
         </div>
         <div class="row">
             <div class="col-md-6">
                 <div class="text-start fw-bold">ESTADO RESPUESTA SEGIP:</div>
                 <div class="text-start h6 a">{{estadoRespuestaSegip}}</div>    
             </div>
             <div class="col-md-6">
                 <div class="text-start fw-bold">ESTADO IDENTIDAD:</div>
                 <div class="text-start h6 a">{{estadoIdentidad}}</div>
             </div>
         </div>
         <div class="row">
             <div class="col-md-6">
                 <div class="text-start fw-bold">ESTADO ASEGURADO:</div>
                 <div class="text-start h6 a">{{estadoAsegurado}}</div>    
             </div>
             <div class="col-md-6">
                 <div class="text-start fw-bold">ESTADO FUENTE DE PAGO:</div>
                 <div class="text-start h6 a">{{estadoAsegurado}}</div>    
             </div>
         </div><hr>
  
         <h6>DATOS GENERALES</h6>
         <div class="card-body">
             <table class="table table-hover table-striped table-responsive" id="divTable">
                 <thead class="thead-dark">
                     <tr>
                         <th scope="col">#</th>
                         <th scope="col">Tipo documento</th>
                         <th scope="col">Numero Documento</th>
                         <th scope="col">Complemento</th>
                         <th scope="col">Nombres</th>
                         <th scope="col">Primer Apellido</th>
                         <th scope="col">Segundo Apellido</th>
                         <th scope="col">Tipo Asegurado</th>
                         <th scope="col">Opciones</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="(g, index) in grillaGeneral">
                         <td width="3%" scope="row">{{ index }}</td>
                         <td>{{ g.tipo_documento }}</td>
                         <td>{{ g.numero_documento }}</td>
                         <td>{{ g.complemento_documento }}</td>
                         <td>{{ g.nombres}}</td>
                         <td>{{ g.primer_apellido}}</td>
                         <td>{{ g.segundo_apellido}}</td>
                         <td>{{ g.tipo_asegurado}}</td>
                         <td>
                             <button type="button" v-on:click="verDatosTitular(index)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerDatosTitular"><span class="material-icons-outlined" title="Información Afiliado Titular">add</span></button>                                          
                         </td>
                     </tr>
                 </tbody>
             </table>
         </div><hr>
  
         <div class="alert alert-success" role="alert">
             Paso 2: Complementar los siguientes datos, para realizar el registro. Para ello el C.I. del alifiado debe ser encontrado en Segip.   
         </div>
         <!--div class="form-control" v-show="this.swAdd==100"-->
         <div class="form-control">
             <div class="row">
                 <div class="col-md-6">
                     <div class="text-start fw-bold">CÓDIGO ENTIDAD</div>
                     <!--div><input type="text" class="form-control col-md-3" id="codigo_entidad"  v-model="registro.codigo_entidad" required>
                         <p v-if="!registro.codigo_entidad" class="mensaje">Información obligatoria</p>
                     </div-->
                     <select class="form-select col-md-3" v-model="registro.codigo_entidad" placeholder="Entidad">
                         <option v-for="s in entidades" v-bind:value="s.codigo">
                             {{ s.nombre}} - {{ s.codigo}}
                         </option>
                     </select>
                     <p v-if="!registro.codigo_entidad" class="mensaje">Información obligatoria</p>
                 </div>
                 <div class="col-md-6">
                     <div class="text-start fw-bold">FECHA DE INICIO:</div>
                     <div><input type="date" class="form-control col-md-3" id="fecha_inicio"  v-model="registro.fecha_inicio" required>
                         <p v-if="!registro.fecha_inicio" class="mensaje">Información obligatoria</p>
                     </div>    
                 </div> 
             </div>
         </div><br>
         <div class="row">
             <div class="col-md-6"></div>
             <div class="col-md-3">
             </div>
             <div class="col-md-3">
                 <button type="button" class="btn btn-primary" v-on:click="insertarInformacion()"  title="Búsqueda detallada"><span class="material-icons-outlined"  ></span>2.- REGISTRAR TITULAR</button>
             </div>
         </div><br>  
         <!--ESTADO ASEGURADO-->
         <h6>ESTADO ASEGURADO</h6>
         <div class="card-body">
             <table class="table table-hover table-striped table-responsive" id="divTable">
                 <thead class="thead-dark">
                     <tr>
                         <!--th scope="col">#</th-->
                         <th scope="col">Categoria</th>
                         <th scope="col">Codigo entidad</th>
                         <th scope="col">Ente Gestor</th>
                         <th scope="col">Fecha Baja</th>
                         <th scope="col">Fecha Cesantia</th>
                         <th scope="col">Fecha Ampliacion</th>
                         <th scope="col">Tipo Asegurado</th>
                         <th scope="col">Estado</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="r in registrosEstadoAsegurado">
                         <!--td width="3%" scope="row">{{ index }}</td-->
                         <td>{{ r.categoria}}</td>
                         <td>{{ r.codigo_entidad}}</td>
                         <td>{{ r.ente_gestor}}</td>
                         <td>{{ r.estado.fecha_baja}}</td>
                         <td>{{ r.estado.fecha_cesantia}}</td>
                         <td>{{ r.estado.fecha_ampliacion}}</td>
                         <td>{{ tipoAsegurado}}</td>        
                         <td>
                             <span v-if="r.estado.descripcion === 'CESANTIA'" class="badge text-bg-danger">{{r.estado.descripcion}}</span>
                             <span v-if="r.estado.descripcion === 'ACTIVO'" class="badge text-bg-success">{{r.estado.descripcion}}</span>
                             <span v-else-if="r.estado.descripcion == 'AMPLIACIÓN'" class="badge text-bg-warning">{{r.estado.descripcion}}</span>
                         </td>
                     </tr>
                 </tbody>
             </table>
         </div><hr>
         <!--ESTADO ASEGURADO-->
         <!--ESTADO FUENTE DE PAGO-->
         <h6>ESTADO FUENTE DE PAGO</h6>
         <div class="card-body">
             <table class="table table-hover table-striped table-responsive" id="divTable">
                 <thead class="thead-dark">
                     <tr>
                         <th scope="col">Razon social</th>
                         <th scope="col">NIT</th>
                         <th scope="col">Gestión</th>
                         <th scope="col">Periodo</th>
                         <th scope="col">Matrícula Comercio</th>
                         <th scope="col">Descripción</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="f in registrosFuentePago">
                         <td>{{ f.razon_social }}</td>
                         <td>{{ f.nit }}</td>
                         <td>{{ f.gestion}}</td>
                         <td>{{ f.periodo}}</td>
                         <td>{{ f.matricula_comercio}}</td>
                         <td>{{ f.descripcion}}</td>
                     </tr>
                 </tbody>
             </table>
         </div><hr>
         <!--ESTADO IDENTIDAD-->
         <h6>ESTADO IDENTIDAD</h6>
         <div class="card-body">
             <table class="table table-hover table-striped table-responsive" id="divTable">
                 <thead class="thead-dark">
                     <tr>
                         <th scope="col">Primer Apellido</th>
                         <th scope="col">Segundo Apellido</th>
                         <th scope="col">Nombres</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr v-for="j in registrosEstadoIdentidad">
                         <td>{{ j.primer_apellido }}</td>
                         <td>{{ j.segundo_apellido }}</td>
                         <td>{{ j.nombres}}</td>
                     </tr>
                 </tbody>
             </table>
         </div><hr>
         <!--ESTADO IDENTIDAD-->  
          <!--MODAL DATOS GENERALES TITULAR-->
          <div class="modal fade modal-dialog modal-lg" tyle="overflow: auto" id="modalVerDatosTitular" tabindex="-1" aria-labelledby="#modalVerDatosTitular" aria-hidden="true" style="overflow: auto">
             <div class="modal-dialog">
             <div class="modal-content">
                 <div class="modal-header">
                 <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel" >BUSQUEDA DETALLADA  -  AFILIADOS TITULARES</h1>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                 </div>
                 <div class="modal-body a">
                     <div class="alert alert-success" role="alert">
                     Información General  
                     </div>
                     
                 </div>
                 <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                 </div>
             </div>
             </div>
         </div>
     <!--MODAL DATOS GENERALES TITULAR-->       
     </div>
  </template>
  
  <script>
     import axios from 'axios'
     import Swal from 'sweetalert2'
     export default {
        name: 'RegistroTitular',
     data() {
         return {
             plural: 'Afiliados Titulares',
             singular: 'Afilidao',
             grillaGeneral:[],
             entidades:[],
             registrosEstadoAsegurado: [],
             registrosFuentePago: [],
             registro: {},
             elementosPorPagina: 2,
             datosPaginados:[],
             paginaActual:1,
             json: {},
             estados : '',
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
         
         }
     },
    
     mounted() {  
         var ent = '{"entidades":['+ 
             '{"codigo":"MATRICULA_COMERCIO-227703", "nombre":"EMPRESA CONSTRUCTORA ALMIMA"},' +
             '{"codigo":"MATRICULA_COMERCIO-29477", "nombre":"FINATEX"},' +
             '{"codigo":"MATRICULA_COMERCIO-287722", "nombre":"22 TECHNOLOGY S.R.L."},' +
             '{"codigo":"NIT-11587539", "nombre":"GLOBALNET S.R.L."},' +
             '{"codigo":"NIT-8835560", "nombre":"PETROLAB S.R.L."}]}';
         this.entidades = JSON.parse(ent);
         this.entidades = this.entidades.entidades
     },
     methods: {
         async validarTitular(){
             var anio_nac = new Date(document.getElementById('fecha_nacimiento').value);
             var fecha_actual = new Date();
             var anio_actual = fecha_actual.getFullYear();
             var y = anio_nac.getFullYear();
             var anioValidoInicio = anio_actual - 65;
             var anioValidoFin = anio_actual - 18;
             var edad = anio_actual - y;
             if ((y > anioValidoInicio) && (y < anioValidoFin)){
                 //console.log('edad',edad,'años');
                 this.swAdd ='';
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
                 if(this.errores.length === 0){
                 elementos.tipo_documento = this.registro.tipo_documento;
                 elementos.numero_documento = this.registro.numero_documento;
                 elementos.fecha_nacimiento = this.registro.fecha_nacimiento;
                 elementos.tipo_asegurado = this.registro.tipo_asegurado; 
                 var data = new Array();
                 data.push(elementos);
                 dataEntradaInsercion = JSON.stringify({ data });
                 const token = sessionStorage.getItem('token');
                 let url ="https://bdpa.asuss.gob.bo/api/v1/validacion/afiliado"; 
                 //try {
                     response = await axios.post(url , JSON.parse(dataEntradaInsercion), { headers: {"Authorization" : `Bearer ${token}`}
                     })
                     .then(response => {
                         this.registroValidacion = response;
                         console.log('this.registroValidacion',this.registroValidacion);
                         this.grillaGeneral = this.registroValidacion.data;
                         //datos generales
                         this.datosGenerales  = this.registroValidacion.data[0].nombres +' '+ this.registroValidacion.data[0].primer_apellido +' '+ this.registroValidacion.data[0].segundo_apellido;
                         this.estadoAlmacenamiento = this.registroValidacion.data[0].estado_almacenamiento.codigo;
                         if (this.estadoAlmacenamiento == 0) {
                             this.estadoAlmacenamiento = this.estadoAlmacenamiento +'-' + 'Validacion no ejecutada'
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
                         if(this.estadoRespuestaSegip == 100){
                             this.estadoRespuestaSegip = this.estadoRespuestaSegip + '-' + 'Registro Encontrado en SEGIP.';
                             this.swAdd = this.registroValidacion.data[0].estado_respuesta.codigo;
                         }
                         if(this.estadoRespuestaSegip == 0){
                             this.estadoRespuestaSegip = this.estadoRespuestaSegip + '-' + 'Validacion no ejecutada.';
                         }
                         if(this.estadoRespuestaSegip == 101){
                             this.estadoRespuestaSegip = this.estadoRespuestaSegip + '-' + 'Registro no encontrado en SEGIP.';
                             this.$swal({
                             title: 'Advertencia!',
                             text: 'No se encontraron lo datos en SEGIP. Por favor verifique los datos.',
                             icon: 'warning',
                             confirmButtonText: 'Aceptar'
                         });
  
                         }
                         if(this.estadoRespuestaSegip == 102){
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
                         if(this.estadoIdentidad == 200){
                             this.estadoIdentidad = this.estadoIdentidad + '-' + 'Datos verificados correctamente.';
                             //return this.registrosEstadoIdentidad = [];
                         }
                         if(this.estadoIdentidad == 0){
                             this.estadoIdentidad = this.estadoIdentidad + '-' + 'Validacion no ejecutada.';
                             //return this.registrosEstadoIdentidad = [];
                         }
                         if(this.estadoIdentidad == 201){
                             this.estadoIdentidad = this.estadoIdentidad + '-' + 'Datos faltantes o no coincidentes, por diferencias mínimas, con el registro de la fuente.';
                             //return this.registrosEstadoIdentidad = [];
                         }
                         if(this.estadoIdentidad == 202){
                             this.estadoIdentidad = 'Datos no coincidentes, por grandes diferencias, con el registro de la fuente.';
                             this.registrosEstadoIdentidad = this.estadoIdentidad + '-' + this.registroValidacion.data[0].estado_identidad.detalle;
                         }
  
                         //CODIGOS ESTADO ASEGURADO
                         this.estadoAsegurado = this.registroValidacion.data[0].estado_asegurado.codigo;
                         if(this.estadoAsegurado == 0){
                             this.estadoAsegurado =  this.estadoAsegurado + '-' + 'Validacion no ejecutada.';
                         }
                         if(this.estadoAsegurado == 400){
                             this.estadoAsegurado = this.estadoAsegurado + '-' + 'Persona sin duplicidad en su registro de asegurado.';
                         }
                         if(this.estadoAsegurado == 401){
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
                         if(this.estadoFuentePago == 0){
                             this.estadoFuentePago =  this.estadoFuentePago + '-' + 'Validacion no ejecutada.';
                         }
                         if(this.estadoFuentePago == 300){
                             this.estadoFuentePago = this.estadoFuentePago + '-' + 'Datos encontrados en la fuente de pago';
                         }
                         if(this.estadoFuentePago == 301){
                             this.estadoFuentePago = this.estadoFuentePago + '-' + 'Datos no encontrados en la fuente de pago';
                         }
  
  
                         // EN CASO DE ENCONTRAR LOS DATOS EN SEGIP
                         //estado fuente de pago
                         this.codigoEstadoFuentePago = this.registroValidacion.data[0].estado_fuente_pago.codigo;
                         if(this.codigoEstadoFuentePago == '301'){
                             return this.registrosFuentePago = [];
                             
                         }else{
                             this.registrosFuentePago = this.registroValidacion.data[0].estado_fuente_pago.detalle;
                             this.codigoEstadoFuentePago = this.registroValidacion.data[0].estado_fuente_pago.codigo;
                             if(this.registrosFuentePago[0].matricula_comercio == null){
                                 this.registrosFuentePago[0].matricula_comercio = '-'
                             }
                             this.razonSocial = this.registrosFuentePago.razon_social;
                             this.nit = this.registrosFuentePago.nit;
                         }                         
                     })
                     }else{
                         this.$swal({
                             title: 'Error!',
                             text: 'Debe introducir la información obligatoria',
                             icon: 'error',
                             confirmButtonText: 'Aceptar'
                         });
                     }
                 }else {
                     this.$swal({
                         title: 'Error!',
                         text: 'El año no es permitido',
                         confirmButtonText: 'Aceptar'
                     });
                 }          
         },
         async insertarInformacion() {
  
             let responseInsercion = '';
             this.status = '';
             this.errores = [];
             if (this.registro && !this.registro.codigo_entidad) {
                 this.errores.push('Falta codigo_entidad');
             }
             if (this.registro && !this.registro.fecha_inicio) {
                 this.errores.push('Falta fecha_inicio');
             }
             if(this.errores.length === 0){
  
             var elementos = new Object();
             let dataEntradaInsercion = '';
             let dataCreacion = {};
             elementos.tipo_documento = this.registro.tipo_documento;
             elementos.numero_documento = this.registro.numero_documento;
             elementos.fecha_nacimiento = this.registro.fecha_nacimiento;
             elementos.tipo_asegurado = this.registro.tipo_asegurado;
             elementos.fecha_inicio= this.registro.fecha_inicio; 
             var data = new Array();
             data.push(elementos);
             dataEntradaInsercion = JSON.stringify({ data });
             dataCreacion = {"codigo_entidad":this.registro.codigo_entidad, data};    
             var dataEntrada = JSON.stringify(dataCreacion);
             dataEntrada = JSON.parse(dataEntrada);            
             const token = sessionStorage.getItem('token');
             let url ="https://bdpa.asuss.gob.bo/api/v1/afiliado/ente-gestor"; 
             //try {
                 responseInsercion = await axios.post(url , dataEntrada, { headers: {"Authorization" : `Bearer ${token}`}
                 })
                 .then(responseInsercion => {
                     this.registroInsercion = responseInsercion;
                     this.status = this.registroInsercion.status;
                     this.estadoAlmacenamientoCodigo = this.registroInsercion.data[0].estado_almacenamiento.codigo;
                     this.estadoAlmacenamientoInsercion = this.registroInsercion.data[0].estado_almacenamiento.codigo;
                     if (this.estadoAlmacenamientoInsercion == 0){
                         this.estadoAlmacenamientoInsercion = 'Validacion no ejecutada.'
                     }
                     if (this.estadoAlmacenamientoInsercion == 500){
                         this.estadoAlmacenamientoInsercion = 'Registro guardado sin observaciones.'
                     }
                     if (this.estadoAlmacenamientoInsercion == 501){
                         this.estadoAlmacenamientoInsercion = 'Registro guardado con observaciones.'
                     }
                     if (this.estadoAlmacenamientoInsercion == 502){
                         this.estadoAlmacenamientoInsercion = 'Registro ya existente, no guardado.'
                     }
                     if (this.estadoAlmacenamientoInsercion == 503){
                         this.estadoAlmacenamientoInsercion = 'Registro no guardado.'
                     }
                     if(this.status == 200 && (this.estadoAlmacenamientoCodigo == 500 || this.estadoAlmacenamientoCodigo == 501)){
                         this.$swal.fire({
                             icon: 'success',
                             text: 'El afiliado titular fue registrado' + this.estadoAlmacenamientoInsercion
               });
                     }
                     if(this.status == 200 && (this.estadoAlmacenamientoCodigo == 502)){
                         this.$swal({
                             title: 'Error!',
                             text: 'El afiliado no pudo ser añadido' + this.estadoAlmacenamientoInsercion,
                             confirmButtonText: 'Aceptar'
                         });
                     }
                     if(this.status == 200 && (this.estadoAlmacenamientoCodigo == 0 || this.estadoAlmacenamientoCodigo == 503)){
                         this.$swal({
                             title: 'Error!',
                             text: 'Hubo un error...' + this.estadoAlmacenamientoInsercion,
                             confirmButtonText: 'Aceptar'
                         });
                     }
                 })
             }else {
                 this.$swal({
                     title: 'Error!',
                     text: 'Debe introducir la información obligatoria',
                     icon: 'error',
                     confirmButtonText: 'Aceptar'
                 });
             }          
         },
         verDatosTitular(index) {
             console.log('DATOS GENERALES', index);
  
         }
  
        
         
         
     }
     }
  
  
  </script>
  <style scoped>
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
  