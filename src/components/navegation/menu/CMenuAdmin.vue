<template>
  <div>
    <v-navigation-drawer v-model="drawerRight" app clipped left>
      <v-list dense>
        <img src="/img/ssucbba.png"  width="100%"/>
        <v-list-item v-for="(menu, index) in menus" :key="index" :to="menu.url">
          <v-list-item-action>
            <v-icon>{{ menu.icono }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ menu.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="salir()" block>Salir</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="#1D62A1" dark>
     
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
      <v-toolbar-title>SGPA</v-toolbar-title>
      <v-spacer></v-spacer>

      

      <img src="/img/ASUSS_logo_horiz.png"  height="100%"/>
    
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name : 'MenuAsegurado' ,
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    menus: [
    { titulo: "INICIO", url: "/maps/dashboard", icono: "mdi-home" },
      { titulo: "AFILIACION", url: "/maps/ubicacion", icono: "mdi-account" },
      { titulo: "CONSULTAS", url: "/maps/reporte", icono: "mdi-note-search" },
      { titulo: "AYUDA", url: "/maps/dashboard", icono: "mdi-comment-question" },
    ]
  }),
  methods: {
    salir() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>