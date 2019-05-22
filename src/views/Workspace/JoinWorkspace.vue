<template>
  <div class="join">
    <sui-segment class="join-segment text-center">
      <h1 class="mb-5">Join a Workspace</h1>
      <sui-form @submit.prevent="joinWorkspace">
        <sui-form-field>
          <sui-input placeholder="Workspace Name" v-model="workspaceName" name="workspaceName"/>
        </sui-form-field>
        <sui-button type="submit" fluid>Submit</sui-button>
      </sui-form>

      <p class="mt-4">
        Want to create a new workspace
        <router-link to="/new/workspace">Create</router-link>
      </p>
    </sui-segment>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import db from "../../db/db";

export default {
  data: () => ({
    workspaceName: "",
    error: ""
  }),
  computed: {
    ...mapGetters("auth", ["currentUser"])
  },
  methods: {
    joinWorkspace() {
      const workspaceRef = db.collection("workspaces");
      const userWorkspaceRef = db.collection(
        `users/${this.currentUser.id}/workspaces`
      );
      workspaceRef
        .get()
        .then(snapShot => {
          snapShot.docs.forEach(doc => {
            if (this.workspaceName === doc.data().workspace) {
              localStorage.setItem("workspaceId", doc.data().id);
              this.$router.push(`/${doc.data().id}`);
              userWorkspaceRef
                .doc(doc.data().id)
                .set(doc.data())
                .then(() => (this.workspaceName = ""))
                .catch(err => console.log(err));
            }
          });
        })
        .catch(err => console.log(err));
    }
  }

  // .where("workspace", "==", this.workspaceName);
};
</script>

<style lang="scss" scoped>
.join {
  display: flex;
}

.join-segment {
  width: 500px;
  margin: 200px auto auto auto !important;
}
</style>

