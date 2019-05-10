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
import { mapGetters, mapActions } from "vuex";
import UserPanel from "./UserPanel.vue";
import Channels from "./Channels.vue";
import Modal from "./Modal.vue";

export default {
  components: {
    UserPanel,
    Channels,
    Modal
  },
  created() {
    const workspace = this.$route.params.id;
    this.loadWorkspace(workspace);
  },
  computed: {
    ...mapGetters("workspaces", ["currentWorkspace"]),
    workspace() {
      if (this.currentWorkspace) {
        return this.currentWorkspace.workspace;
      }
    }
  },
  methods: {
    ...mapActions("workspaces", ["loadWorkspace"])
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
  height: 100%;
  background: #eee !important;
  padding-left: 30px;
}
</style>

