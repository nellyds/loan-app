<template>
  <div class="NextStep">
        <div v-if="qualified">
            <Success />
        </div>
        <div v-else>
            <Disqualified />
        </div>

  </div>
</template>

<script>
import Disqualified from "@/components/Disqualified";
import Success from "@/components/Success.vue";

export default {
  name: "NextStep",
  data(){
      return{
          qualified: this.$store.state.isQualified,
          applicationCompleted: this.$store.state.submissionComplete
      }
  },
  components: {
      Success,
      Disqualified
  },
};
</script>
