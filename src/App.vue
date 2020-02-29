<template>
  <v-app>
        <div class="content">
        <router-view></router-view>
        </div>

  </v-app>
</template>
<script>

export default {
  name: "App",

  components: {
  },

  data: () => ({
    //
  })
};
</script>
<style scoped>
.content{
  width: 40%;
  margin: auto;
  border: solid 2px black;
  padding: 20px;
}
</style>
