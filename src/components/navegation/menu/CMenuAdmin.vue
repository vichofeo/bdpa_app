<template>
  <div>
    <v-navigation-drawer v-model="drawerRight" app clipped left>
      <v-list dense>
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

    <v-app-bar app clipped-left color="blue" dark>
     
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
      <v-toolbar-title>ADMINISTRADOR</v-toolbar-title>
      <v-spacer></v-spacer>

      

    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
    </div>
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
      { titulo: "DASHBOARD", url: "/maps/dashboard", icono: "mdi-view-dashboard" },
      { titulo: "UBICACION", url: "/maps/ubicacion", icono: "mdi-account" },
      { titulo: "REPORTES", url: "/maps/reporte", icono: "mdi-gavel" }
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