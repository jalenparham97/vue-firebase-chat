<template>
  <div>
    <sui-segment class="chat-header">
      <div class="channel-details">
        <sui-header>
          <h3>#{{ currentChannel.name }}</h3>
          <sui-header sub>{{ uniqueUsers }}</sui-header>
        </sui-header>
      </div>

      <div class="search">
        <sui-input placeholder="Search..." icon="search"/>
        <sui-icon @click="getUserWorkspaces" name="bars" size="large" class="ml-3"/>
      </div>
    </sui-segment>
    <sui-sidebar direction="right" :visible="visible" animation="overlay">
      <div class="ui huge header workspace-header">Workspaces</div>
      <div class="ui middle aligned selection list">
        <div class="item" v-for="workspace in workspaces" :key="workspace.id">
          <div class="content" @click="goToWorkspace(workspace.id)">
            <p class="header">{{ workspace.workspace }}</p>
          </div>
        </div>
      </div>
    </sui-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import db from "../../db/db";
import { getHeapSnapshot } from "v8";

export default {
  props: ["currentChannel", "uniqueUsers", "addListeners"],
  data: () => ({
    visible: false,
    workspaces: []
  }),
  computed: {
    ...mapGetters("auth", ["currentUser"])
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    getUserWorkspaces() {
      const workspacesRef = db.collection(
        `users/${this.currentUser.id}/workspaces`
      );
      workspacesRef.get().then(snapShot => {
        const workspaces = [];
        snapShot.docs.forEach(doc => {
          workspaces.push(doc.data());
        });
        this.workspaces = workspaces;
        this.toggle();
      });
    },
    goToWorkspace(workspaceId) {
      this.$router.push(`/${workspaceId}`);
      window.location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search {
  display: flex;
  align-items: center;
}

.content {
  padding: 10px;
}

.workspace-header {
  padding: 10px;
  margin-bottom: -20px;
}

.bars {
  cursor: pointer;
}
</style>

