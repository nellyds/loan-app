<template>
  <div id="Success">
        <v-form>
       <v-text-field
        label="E-mail"
        v-model="email"
        :error-messages="emailErrors"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        required
      ></v-text-field>
             <v-text-field
        label="Password"
        v-model="password1"
        :error-messages="password1Errors"
        @input="$v.password1.$touch()"
        @blur="$v.password1.$touch()"
        required
      ></v-text-field>
                   <v-text-field
        label=" Retype Password"
        v-model="password2"
        :error-messages="password2Errors"
        @input="$v.password2.$touch()"
        @blur="$v.password2.$touch()"
        required
      ></v-text-field>
        </v-form>

  </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";

export default {
    name: "Success",
  data() {
    return {
      errors: false,
      empty: true,
        email: null,
        password1: null,
        password2: null    
    };
  },
  validations: {
      email: {
        required,
        email
      },
      password1: {
        required,
        strongPassword(password1) {
          return (
            /[a-z]/.test(password1) && 
            /[0-9]/.test(password1) &&
            /\W|_/.test(password1) && 
            password1.length >= 8
          );
        }
      },
      password2: {
        required,
        sameAsPassword: sameAs("password1")
      }
    
  },
  methods: {

  },
  computed: {
      password1Errors() {
        const errors = []
          if (!this.$v.password1.$dirty) return errors
          !this.$v.password1.strongPassword && errors.push('Password does not meet complexity requirements')
          !this.$v.password1.required && errors.push('Field required')
          return errors
      },
      password2Errors() {
          const errors = []
          if (!this.$v.password2.$dirty) return errors
          !this.$v.password2.sameAs && errors.push('Password does not match')
          !this.$v.password2.required && errors.push('Field required')
          return errors
      },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  }
};
</script>

<style>

label {
  margin: 20px 0 10px;
  display: block;
}

.error {
  font-size: 12px;
  position: absolute;
}

.success {
  font-size: 12px;
  position: absolute;
}
section {
  padding-bottom: 30px;
  position: relative;
}
</style>
