<template>
  <div class="Landing">
    <button v-on:click="start" type="submit">Want to buy a car?  Let's get started!</button>
  </div>
</template>

<script>
export default {
  name: "Landing",
  components: {},
  methods: {
      start: function() {
      this.$router.push({ path: "apply" });
    }
  }
};
</script>
