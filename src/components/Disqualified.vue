<template>
  <v-container>
  After reviewing a preliminary view of your finances, you do not qualifiy for a loan for this vehicle.  
  <button v-on:click="restart" type="submit">Submit a new application</button>
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
      restart: function(){
          this.$router.push({path:"apply"})
      }
  },
}
</script>
