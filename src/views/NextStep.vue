<template>
  <div class="NextStep">
    <div v-if="!qualified">
      <Disqualified />
    </div>
  </div>
</template>
<script>
import Disqualified from "@/components/Disqualified";

export default {
  name: "NextStep",
  data() {
    return {
      qualified: this.$store.state.isQualified,
      applicationCompleted: this.$store.state.submissionComplete
    };
  },
  components: {
    Disqualified
  }
};
</script>
