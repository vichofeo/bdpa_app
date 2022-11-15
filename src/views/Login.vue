<template>
  <div class="home">
    <center>
      <img alt="Asuss" src="../assets/logoAsuss.png"><hr>
      <h1>BIENVENIDO AL REGISTRO DE BDPA</h1><br>
      <section>
        <div>
        <div class="row">
          <div>
            <div>
              <form style="width: 32rem;" id="registro">
                <h3>Iniciar Sesion</h3>
                <div class="col-md-8">
                  <label class="form-label" for="form2Example18">Usuario</label>
                  <input type="text" v-model="registro.username" id="username" class="form-control form-control-lg" />
                </div>
                <div class="col-md-8">
                  <label class="form-label" for="form2Example28">Contraseña</label>
                  <input type="password" v-model="registro.password" id="password" class="form-control form-control-lg" />
                </div>
                <div><br>
                  <button class="btn btn-info btn-lg btn-block" v-on:click="verficarCredenciales( registro )" type="button">Ingresar</button>
                  <input type="hidden" id="id">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </section>
    </center>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Login from '@/components/Login.vue'

export default {
  name: 'HomeView',
  components: {
    Login
  },
  data() {
      return {
          errores: [],
          registro: {}
      }
  },
  methods: {
    verficarCredenciales(datos) {
      let dataEntrada = JSON.stringify(datos);
      console.log('dataEntrada',dataEntrada);
       //consumiendo servico de login
      let url ="https://bdpa.asuss.gob.bo/api/v1/login";  
        try {
          axios.post(url, dataEntrada, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
         
        })
        .then(response => {
          console.log("Success:",response.data.success);  
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("usuario", datos.username);
          this.$router.push("/Asegurado"); 
        })
        .catch(error => {
          console.log("Error:", error.response.data.success);
          Swal.fire(
            'Sr(a). Usuario(a)',
            'Favor verifique los datos de su cuenta',
            'question'
          )                
        });
        } catch (error) {
          console.log('Hubo un error en la conexion a la BD');
          Swal.fire(
            'Estimado Usuario',
            'Hubo un error en la conección, comúniquese con el administrador',
            'question'
          )   
        }         
    }
        
  } 
}
</script>
