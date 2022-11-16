<template>
    <div>


      <template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-combobox
          v-model="select"
          :items="items"
          label="Select a favorite activity or create a new one"
          
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="select"
          :items="items"
          label="I use chips"
          
          chips
        ></v-combobox>
      </v-col>
      
      {{select}}
    </v-row>
  </v-container>
</template>


        <v-data-table
        :headers="headers"
        :items="desserts"
        item-key="id"
        v-model="selectedRows"
        class="elevation-1">
          <template v-slot:item="{ item }">
            <tr :class="selectedRows.indexOf(item.id)>-1?'cyan':''" @click="rowClicked(item)">
                <td>{{item.name}}</td>
                <td>{{item.calories}}</td>
                <td>{{item.fat}}</td>
                <td>{{item.carbs}}</td>
                <td>{{item.protein}}</td>
                <td>{{item.iron}}</td>
            </tr>
        </template>
      </v-data-table>


<v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select=true
      item-key="name"
      show-select
      class="elevation-1"
      
      @click.native.ctrl="clickEvent"
            @click:row.ctrl="rowCtrlClicked"
            @click:row="rowClick"
    >
      
    </v-data-table>
    </div>
    
  </template>

<script>
export default {
  data () {
    return {
      select: 'science',
        items: [
{  value: 'medium', text: 'science'},
{ text: 'math', value: 'hard' }],
        
        selectedRows: [],
      singleSelect: true,
      selected: [],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  methods:{
    handleClick(value) {
    //this.highlightClickedRow(value);
    console.log(value)
    // set active row and deselect others
    this.desserts.map((item, index) => {
        item.selected = item === value

        this.$set(this.desserts, index, item)
    })

    // or just do something with your current clicked row item data
    console.log(value.sugar)
},
highlightClickedRow(value) {
    const tr = value.target.parentNode;
    tr.classList.add('highlight');
},
openLink(link) {
      console.log(`opened link ${link}`)
    },
    rowClick(item, row) {
      console.log(row)
      console.log(item)
    },
    rowCtrlClicked(item, row) {
      console.log('row ctrl clicked')
    },
    clickEvent(event) {
      console.log('clicked')
      console.log('event', event)
    },

    rowClicked(row) {
        console.log(this.selectedRows)
      this.toggleSelection(row.id);
      console.log(row);
    },
    toggleSelection(keyID) {
      if (this.selectedRows.includes(keyID)) {
        this.selectedRows = this.selectedRows.filter(
          selectedKeyID => selectedKeyID !== keyID
        );
      } else {
        this.selectedRows.push(keyID);
      }
    },
  }
}
</script>
<style>
.selected {
    background-color: red
}
</style>