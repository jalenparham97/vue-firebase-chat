<template>
  <div class="channels">
    <b-dropdown class variant="link" size="lg" :text="currentUser.displayName" no-caret>
      <b-dropdown-item-button>Logout</b-dropdown-item-button>
    </b-dropdown>
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

<style>
</style>
