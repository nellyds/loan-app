<template>
  <div class="applicationSubmit">
      <v-form action="#"  @submit.prevent="formSubmit">
            <v-form @submit.prevent="financesSubmit">
            <v-text-field
              v-model="creditRating"
              label="Credit Rating"
              :error-messages="creditErrors"
              @input="$v.creditRating.$touch()"
              @blur="$v.creditRating.$touch()"
              required
            ></v-text-field>
            <v-text-field
              v-model="annualIncome"
              label="annualIncome"
              :error-messages="incomeErrors"
              @input="$v.annualIncome.$touch()"
              @blur="$v.annualIncome.$touch()"
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
import { required, between} from 'vuelidate/lib/validators'
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
        annualIncome: null,
        creditRating: null,
        makeList: [
          {make: "canyoneros"},
          {make: "geos"},
          {make: "hondas"}
        ],
      }
  },
  validations: {
    creditRating: { required, 
                    between: between(300, 850)
                    },
    annualIncome: { required, 
                    between: between(0,1000000)
                  }
  },
  methods: {
      formSubmit: function(){
        const baseURI = 'http://127.0.0.1:5000/loan'
        window.alert('hi')
        window.alert(this.creditRating + ' ' + this.annualIncome + ' ' + this.car)
        this.$http.post(baseURI, {
          credit: this.creditRating,
          income: this.annualIncome,
          price: this.car
        })
        .then((result) => {
          this.$store.commit({type: 'applicationReported', result: result.data.qualified, message: result.data.message})
          window.alert(this.$store.state.isQualified)
        }) 
          this.$router.push({path: 'next'})
      },
      makeSubmit: function(){
        this.selectedMake = this.make
      },
      financesSubmit: function(){     
      }
  },
  computed: {
    creditErrors(){
      const errors = []
      if (!this.$v.creditRating.$dirty) return errors
      !this.$v.creditRating.required && errors.push('Credit Rating is required')
      !this.$v.creditRating.between && errors.push('Invalid range')
      return errors
    },
    incomeErrors(){
      const errors = []
      if (!this.$v.annualIncome.$dirty) return errors
      !this.$v.annualIncome.required && errors.push('Annual Income is required')
      !this.$v.annualIncome.between && errors.push('Invalid income range')
      return errors
    }
  },
};
</script>
