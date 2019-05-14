<template>
  <div id="app">
    <router-view :currentUser="currentUser"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
    this.$store.dispatch("auth/autoLogin");
  },
  computed: {
    ...mapGetters("auth", ["currentUser"])
  }
};
</script>
