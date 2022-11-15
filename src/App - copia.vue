<template>
  

  <div id="app">
    <NavComp />
    <!--nav>
      <router-link to="/">Inicio</router-link> |
      <router-link to="/menu">Menu Principal</router-link> |
      <router-link to="/opciones">Validación de afiliados titulares</router-link> |
      <router-link to="/titulares">Afiliados Titulares</router-link> 
    </nav-->
    <router-view/>
</div> 
</template>

<script>
import NavComp from "@/components/NavComp.vue"
  export default {
    name: "App",
    components: {
      NavComp
    }
  }
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
