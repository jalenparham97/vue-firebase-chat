<template>
  <div class="channels">
    <sui-dropdown :text="currentUser.displayName" class="username">
      <sui-dropdown-menu>
        <sui-dropdown-item disabled>Signed in as {{ currentUser.displayName }}</sui-dropdown-item>
        <sui-dropdown-item>Change Avatar</sui-dropdown-item>
        <sui-dropdown-item @click="logout">Logout</sui-dropdown-item>
      </sui-dropdown-menu>
    </sui-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["currentUser"])
  },
  methods: {
    ...mapActions("auth", ["logout"])
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  margin-left: 30px;
}
</style>

