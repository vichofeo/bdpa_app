<template>
  <v-app>

    <MenuAsegurado v-if="$route.meta.requiereAuth" />

    <v-main>
      <router-view />
    </v-main>
    <CPiePaginaVue></CPiePaginaVue>
  </v-app>
</template>

<script>
import CPiePaginaVue from '@/components/navegation/CPiePagina.vue';
import MenuAsegurado from '@/components/navegation/menu/CMenuAdmin.vue';

import NavComp from "@/components/NavComp.vue"
export default {
  name: "App",
  components: {
    NavComp,
    MenuAsegurado,

    CPiePaginaVue
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
