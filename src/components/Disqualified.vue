<template>
  <v-container>
   You were disqualified.
  </v-container>
</template>

<script>
export default {
  name: "Disqualified",
  methods: {
      reApply: function(){
          this.$router.push({})
      }
  }
}
</script>
