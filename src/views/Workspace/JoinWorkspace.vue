<template>
  <div class="join">
    <sui-segment class="join-segment">
      <h1 is="sui-header" class="text-center mb-5 mt-2">Join a Workspace</h1>
      <sui-form @submit.prevent="joinWorkspace">
        <sui-form-field>
          <sui-input placeholder="Workspace Name" v-model="workspaceName"/>
        </sui-form-field>
        <sui-button type="submit" fluid>Submit</sui-button>
      </sui-form>
    </sui-segment>
  </div>
</template>

<script>
import db from "../../db/db";

export default {
  data: () => ({
    workspaceName: "",
    error: ""
  }),
  methods: {
    joinWorkspace() {
      const workspaceRef = db.collection("workspaces");
      workspaceRef
        .get()
        .then(snapShot => {
          snapShot.docs.forEach(doc => {
            if (this.workspaceName === doc.data().workspace) {
              this.$router.push(`/${doc.data().id}`);
            } else {
              console.log("Workspace does not exist");
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

