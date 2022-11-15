<template>
  <v-card>
    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="allData" :search="search" item-key="id" class="elevation-1">
      
      

    </v-data-table>

  </v-card>
</template>

<script>
export default {
  data() {

    return {
      search: '',
      headers: [
        {
          text: '# Doc.',
          align: 'start',
          filterable: false,
          value: 'numero_documento',
        },
        {datos: this.allData.map((i) => {
          return {
            doc: i.numero_documento,
            fn: i.fecha_nacimiento,
            nombre: `${i.primer_apellido} ${i.segundo_apellido} ${i.primer_apellido}`,
            tipo: i.tipo_documento,
            estado: "acabdo",
          };
        })
      },
        { text: 'Fecha Nacimiento', value: 'fecha_nacimiento' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Tipo Asegurado', value: 'tipo_asegurado' },
        { text: 'Estado', value: 'estado' },
      ],



    }
  },
  mounted: {

  },
  props: {
    allData: {
      type: Array,
      default: () => []
    }
  }
}
</script>