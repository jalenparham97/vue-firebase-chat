<template>
  <div class="workspace">
    <b-card class="workspace-card text-center">
      <h1 class="mb-5">Create a new workspace</h1>

      <b-form class="workspace-form" @submit.prevent="handleSubmit">
        <b-form-group>
          <b-form-input type="text" required placeholder="Workspace Name" v-model="workspace"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Create</b-button>
      </b-form>
    </b-card>
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
      this.addWorkspace(workspace);
      userWorkspaceRef
        .doc(workspace.id)
        .set(workspace)
        .then(() => console.log(workspace));
    }
  }
};
</script>

<style lang="scss" scoped>
.workspace {
  height: 100%;
}

.workspace-card {
  width: 500px;
  margin: 200px auto auto auto;
}

.workspace-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

