<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <h3>{{ workspace }}</h3>
      <UserPanel/>
      <Channels
        :channels="channels"
        :changeChannel="changeChannel"
        :currentChannel="currentChannel"
      />
      <DirectMessages/>
    </div>
    <Modal :newChannel="newChannel"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserPanel from "./UserPanel.vue";
import Channels from "./Channels.vue";
import DirectMessages from "./DirectMessages.vue";
import Modal from "./Modal.vue";

export default {
  components: {
    UserPanel,
    Channels,
    DirectMessages,
    Modal
  },
  props: ["channels", "changeChannel", "newChannel", "currentChannel"],
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
  background: #4a154b !important;
  color: #fff;
}

.sidebar h3 {
  padding-left: 30px;
  padding-top: 10px;
}
</style>

