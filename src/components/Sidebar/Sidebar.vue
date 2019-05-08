<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <h1>{{ workspace }}</h1>
      <UserPanel/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserPanel from "./UserPanel.vue";

export default {
  components: {
    UserPanel
  },
  computed: {
    ...mapGetters("workspaces", ["currentWorkspace"]),
    workspace() {
      return this.currentWorkspace.workspace;
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100vh;
  display: flex;
}

.sidebar {
  background: #eee;
  width: 240px;
}
</style>

