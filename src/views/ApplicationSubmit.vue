<template>
  <div class="applicationSubmit">
      <v-form action="#"  @submit.prevent="formSubmit">
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
            <v-select
                v-model="car"
                v-bind:items="canyoneros"
                :rules="[v => !!v || 'Item is required']"
                item-text="model"
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
        car: [],
        carSelectedModel: null,
        carSelectedMake: null,
        annualIncome: 0.00,
        creditRating: null,
        canyoneros: [
            {
                model: 'F-Series',
                cost: '20,000.00'
                },
                {
                model: 'H-Series',
                cost: '18,000.00'
            }
            ],
            geos: [
            {
                model: 'The Ned',
                cost: '20.000.00'
                },
                {
                model: 'The Maude',
                cost: '20.000.00'
            }
            ],
            hondas: [          
            {
                model: 'The Chaulmers',
                cost: '20.000.00'
            }
            ]
      
      }
  },
  validations: {
      creditRating: {between: between(0,800)}
  },
  methods: {
      formSubmit: function(){
          window.alert(this.creditRating);
          window.alert(this.annualIncome);
          window.alert(this.carSelectedMake);
          this.$router.push({path: 'disqualified'})
      },
      creditCheck(){},
      clearForm(){},

  },
  computed: {
      creditErrors() {
        const errors = []
        if (!this.$v.creditRating.$dirty) return errors
        !this.$v.creditRating.between && errors.push('Name must be at most 10 characters long')
        !this.$v.creditRating.required && errors.push('Name is required.')
        return errors
      }
  }
};
</script>
