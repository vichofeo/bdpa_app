<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
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
      <v-spacer></v-spacer>

      <v-btn
        href="/login"        
        text
      >
        <span class="mr-2">ingresar</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>