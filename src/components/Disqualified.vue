<template>
  <v-container>
    <p>{{message}}</p>
    <button v-on:click="restart" type="submit">Submit a new application</button>
  </v-container>
</template>

<script>
export default {
  name: "Disqualified",
  beforeMount: {
    getMessage: function(){
      this.message = this.$store.state.applicationMessage
    }
  },
  data() {
    return {
      message: this.$store.state.applicationMessage
    };
  },
  methods: {
    restart: function() {
      this.$router.push({ path: "apply" });
    }
  }
};
</script>
