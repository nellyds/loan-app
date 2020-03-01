<template>
  <div class="applicationSubmit">
    <v-form action="#" @submit.prevent="formSubmit">
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
        label="Annual Income"
        :error-messages="incomeErrors"
        @input="$v.annualIncome.$touch()"
        @blur="$v.annualIncome.$touch()"
        required
      ></v-text-field>

      <v-form @submit.prevent="makeSubmit">
        <v-select
          v-model="make"
          v-bind:items="makeList"
          item-text="make"
          :error-message="selectErrors"
          @change="$v.make.$touch()"
          @blur="$v.make.$touch()"
        >
          <template slot="selection" scope="data">
            {{ data.item.make }}
          </template>
        </v-select>
        <button type="submit">Select a Make</button>
      </v-form>

      <v-select
        v-show="selectedMake === 'geos'"
        v-model="car"
        v-bind:items="geos"
        :error-message="selectMakeErrors"
        @change="$v.car.$touch()"
        @blur="$v.car.$touch()"
        item-text="model"
        item-value="cost"
        required
      >
        <template slot="selection" scope="data">
          {{ data.item.model }} - {{ data.item.cost }}
        </template>
      </v-select>
      <v-select
        v-show="selectedMake === 'canyoneros'"
        v-model="car"
        v-bind:items="canyoneros"
        :error-message="selectMakeErrors"
        @change="$v.car.$touch()"
        @blur="$v.car.$touch()"
        item-text="model"
        item-value="cost"
        required
      >
        <template slot="selection" scope="data">
          {{ data.item.model }} - {{ data.item.cost }}
        </template>
      </v-select>
      <v-select
        v-show="selectedMake === 'hondas'"
        v-model="car"
        v-bind:items="hondas"
        :error-message="selectMakeErrors"
        @change="$v.car.$touch()"
        @blur="$v.car.$touch()"
        item-text="model"
        item-value="cost"
        required
      >
        <template slot="selection" scope="data">
          {{ data.item.model }} - {{ data.item.cost }}
        </template>
      </v-select>
      <button type="submit">Submit Preliminary Application</button>
      <h3 v-if="notFinished">Please fill in all fields</h3>
    </v-form>
  </div>
</template>

<script>
import { required, between , integer, numeric} from "vuelidate/lib/validators";
export default {
  name: "ApplicationSubmit",
  components: {},
  data() {
    return {
      notFinished: null,
      apiUrl: this.$store.state.apiUrl,
      errors: false,
      empty: true,
      car: {
        model: "",
        price: ""
      },
      make: [],
      geos: this.$store.state.geos,
      canyoneros: this.$store.state.canyoneros,
      hondas: this.$store.state.hondas,
      selectedMake: this.make,
      selectedCar: this.car,
      annualIncome: null,
      creditRating: null,
      makeList: [{ make: "canyoneros" }, { make: "geos" }, { make: "hondas" }]
    };
  },
  validations: {
    creditRating: { required, numeric, integer, between: between(300, 850) },
    annualIncome: { required, integer, between: between(0, 1000000) },
    make: {
      required
    },
    car: {
      required
    }
  },
  methods: {
    formSubmit: function() {
      if (!this.$v.$invalid) {
        const baseURI = this.apiUrl+ 'loan';
        this.$http
          .post(baseURI, {
            credit: this.creditRating,
            income: this.annualIncome,
            price: this.car
          })
          .then(result => {
            this.$store.commit({
              type: "applicationReported",
              result: result.data.qualified,
              message: result.data.message
            });
          })
          .catch(() => {
            this.$store.commit({
              type: "errorReported",
              error: "internal server error"
            })
          });
        if (this.$store.state.isQualified === false) {
          this.$router.push({ path: "next" });
        }
        if (this.$store.state.isQualified === true) {
          this.$router.push({ path: "success" });
        }
      } else this.notFinished = true;
    },
    makeSubmit: function() {
      this.selectedMake = this.make;
    }
  },
  computed: {
    creditErrors() {
      const errors = [];
      if (!this.$v.creditRating.$dirty) return errors;
      !this.$v.creditRating.required &&
        errors.push("Credit Rating is required");
      !this.$v.creditRating.between && errors.push("Invalid range");
      !this.$v.creditRating.integer && errors.push("Invalid input");
      !this.$v.creditRating.numeric && errors.push("Invalid input");
      return errors;
    },
    incomeErrors() {
      const errors = [];
      if (!this.$v.annualIncome.$dirty) return errors;
      !this.$v.annualIncome.required &&
        errors.push("Annual Income is required");
      !this.$v.annualIncome.between && errors.push("Invalid income range");
      !this.$v.annualIncome.integer && errors.push("Invalid input");
      return errors;
    },
    selectedMakeErrors() {
      const errors = [];
      if (!this.$v.car.$dirty) return errors;
      !this.$v.car.required && errors.push("Selection required");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.make.$dirty) return errors;
      !this.$v.make.required && errors.push("Selection required");
      return errors;
    }
  }
};
</script>
