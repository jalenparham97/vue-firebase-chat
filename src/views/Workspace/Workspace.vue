<template>
  <div class="workspace">
    <sui-segment class="workspace-card text-center">
      <h1 class="mb-5">Create a new Workspace</h1>
      <sui-form @submit.prevent="handleSubmit">
        <sui-form-field>
          <sui-input type="text" required placeholder="Workspace Name" v-model="workspace"/>
        </sui-form-field>
        <sui-button type="submit" fluid>Submit</sui-button>
      </sui-form>

      <p class="mt-4">
        Want to join an existing workspace
        <router-link to="/join/workspace">Join</router-link>
      </p>
    </sui-segment>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getTime } from "date-fns";
import uuidv4 from "uuid/v4";
import db from "../../db/db";

export default {
  data: () => ({
    workspace: ""
  }),
  computed: {
    ...mapGetters("auth", ["currentUser"])
  },
  methods: {
    ...mapActions("workspaces", ["addWorkspace"]),
    handleSubmit() {
      const userWorkspaceRef = db.collection(
        `users/${this.currentUser.id}/workspaces`
      );
      const workspace = {
        workspace: this.workspace,
        createdAt: getTime(new Date()),
        creator: this.currentUser,
        id: uuidv4()
      };
      if (localStorage.workspaceId) {
        localStorage.workspaceId = workspace.id;
      } else {
        localStorage.setItem("workspaceId", workspace.id);
      }
      this.addWorkspace(workspace);
      userWorkspaceRef
        .doc(workspace.id)
        .set(workspace)
        .then(() => console.log(workspace))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.workspace {
  display: flex;
}

.workspace-card {
  width: 500px;
  margin: 200px auto auto auto !important;
}
</style>

