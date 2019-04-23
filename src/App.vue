<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("auth/autoLogin");
  }
};
</script>


<style lang="scss">
</style>
