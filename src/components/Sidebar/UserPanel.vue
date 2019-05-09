<template>
  <div class="channels">
    <sui-dropdown :text="currentUser.displayName">
      <sui-dropdown-menu>
        <sui-dropdown-item>Logout</sui-dropdown-item>
      </sui-dropdown-menu>
    </sui-dropdown>
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

<style lang="scss" scoped>
</style>

