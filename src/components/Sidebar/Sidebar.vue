<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <h1>{{ workspace }}</h1>
      <UserPanel/>
      <Channels/>
    </div>
    <Modal/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserPanel from "./UserPanel.vue";
import Channels from "./Channels.vue";
import Modal from "./Modal.vue";

export default {
  components: {
    UserPanel,
    Channels,
    Modal
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
.sidebar {
  width: 240px;
  height: 100vh;
  background: #eee !important;
  padding-left: 20px;
}
</style>

