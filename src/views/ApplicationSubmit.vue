<template>
  <div class="applicationSubmit">
      <v-form action="#"  @submit.prevent="formSubmit">
            <v-form @submit.prevent="financesSubmit">
            <v-text-field
              v-model="creditRating"
                :error-messages="creditErrors"
              label="Credit Rating"
              required
            ></v-text-field>
            <v-text-field
              v-model="annualIncome"
              label="annualIncome"
              required
            ></v-text-field>
            <button type="submit">Submit Finances</button>
            </v-form>
            <v-form @submit.prevent="makeSubmit">
            <v-select
              v-model="make"
              v-bind:items="makeList"
              item-text="make"
              >
            <template slot="selection" scope="data">
              {{data.item.make}}
            </template>
            </v-select>
                 <button type="submit">Select a Make</button>
            </v-form>
            <v-select
                v-show="selectedMake === 'geos'"
                v-model="car"
                v-bind:items="geos"
                :rules="[v => !!v || 'Item is required']"
                item-text="model"
                item-value="cost"
                required
            >
           <template slot="selection" scope="data">
                  {{ data.item.model }} - {{data.item.cost}}
                </template>
            </v-select>
                        <v-select
                v-show="selectedMake === 'canyoneros'"
                v-model="car"
                v-bind:items="canyoneros"
                :rules="[v => !!v || 'Item is required']"
                item-text="model"
                item-value="cost"
                required
            >
           <template slot="selection" scope="data">
                  {{ data.item.model }} - {{data.item.cost}}
                </template>
            </v-select>
                        <v-select
                v-show="selectedMake === 'hondas'"
                v-model="car"
                v-bind:items="hondas"
                :rules="[v => !!v || 'Item is required']"
                item-text="model"
                item-value="cost"
                required
            >
           <template slot="selection" scope="data">
                  {{ data.item.model }} - {{data.item.cost}}
                </template>
            </v-select>
      <button type="submit">Submit</button>
      </v-form>
  </div>
</template>

<script>
import { between } from 'vuelidate/lib/validators'
export default {
  name: "ApplicationSubmit",
  components: {
  },
  data() {
      return {
        car: {
        model:'',
        price:''
        },
        make:[],
        geos: this.$store.state.geos,
        canyoneros: this.$store.state.canyoneros,
        hondas: this.$store.state.hondas,
        selectedMake: this.make,
        selectedCar: this.car,
        annualIncome: 0.00,
        creditRating: 0,
        makeList: [
          {make: "canyoneros"},
          {make: "geos"},
          {make: "hondas"}
        ],
      }
  },
  validations: {
      creditRating: {between: between(300,850)}
  },
  methods: {
      formSubmit: function(){
        console.log(this.selectedMake)
        console.log(this.selectedCar)
        const baseURI = 'http://127.0.0.1:5000/loan'
        this.$http.post(baseURI, {
          credit: this.creditRating,
          income: this.annualIncome,
          price: this.car
        })
        .then((result) => {
          this.$store.commit({type: 'applicationReported', result: result.data.qualified})
        })  
          this.$router.push({path: 'next'})
      },
      makeSubmit: function(){
        this.selectedMake = this.make
        console.log(this.make)
        console.log(this.selectedMake)
      },
      financesSubmit: function(){
        
      }

  },
  computed: {
      creditErrors() {
        const errors = []
        if (!this.$v.creditRating.$dirty) return errors
        !this.$v.creditRating.between && errors.push('Name must be at most 10 characters long')
        !this.$v.creditRating.required && errors.push('Name is required.')
        return errors
      }
  },
};
</script>
