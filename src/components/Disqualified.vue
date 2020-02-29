<template>
  <v-container>
  {{message}}
  </v-container>
</template>

<script>
export default {
  name: "Disqualified",
  data(){
      return{
          message: null,
      }
  },
  methods: {
      reApply: function(){
          this.$router.push({})
      }
  },
  beforeMount: {
      getMessage: function(){
          this.message = this.$store.state.applicationMessage
      }
  },
}
</script>
