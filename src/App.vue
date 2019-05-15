<template>
  <div id="app">
    <router-view :currentUser="currentUser"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["currentUser"])
  }
};
</script>
