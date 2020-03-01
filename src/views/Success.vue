<template>
  <div id="Success">
    <div v-if="qualified">
      <v-form action="#" @submit.prevent="formSubmit">
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
        <button type="submit">Create a new account</button>
        <h3 v-if="notFinished">Please fill out all required fields</h3>
      </v-form>
    </div>
    <div v-else>You reached this page in error</div>
  </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Success",
  data() {
    return {
      qualified: this.$store.state.isQualified,
      notFinished: null,
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
    formSubmit: function() {
      if (this.$v.$invalid) {
        this.notFinished = true;
      }
    },
    computed: {
      password1Errors() {
        const errors = [];
        if (!this.$v.password1.$dirty) return errors;
        !this.$v.password1.strongPassword &&
          errors.push("Password does not meet complexity requirements");
        !this.$v.password1.required && errors.push("Field required");
        return errors;
      },
      password2Errors() {
        const errors = [];
        if (!this.$v.password2.$dirty) return errors;
        !this.$v.password2.sameAs && errors.push("Password does not match");
        !this.$v.password2.required && errors.push("Field required");
        return errors;
      },
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push("Must be valid e-mail");
        !this.$v.email.required && errors.push("E-mail is required");
        return errors;
      }
    }
  }
};
</script>
