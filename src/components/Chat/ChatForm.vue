<template>
  <sui-segment class="chat-form">
    <sui-form @submit.prevent="addMessage">
      <div class="ui left action input fluid">
        <sui-button icon="plus"/>
        <input type="text" placeholder="Message" v-model="message">
      </div>
    </sui-form>
    <sui-button class="mt-2" v-b-modal.modal-2>Upload Media</sui-button>
  </sui-segment>
</template>

<script>
import { mapGetters } from "vuex";
import db from "../../db/db";
import firebase from "../../db/firebase";
import { getTime } from "date-fns";
import uuidv4 from "uuid/v4";

export default {
  props: ["currentChannel"],
  data: () => ({
    message: "",
    storageRef: firebase.storage().ref(),
    uploadState: "",
    uploadTask: null,
    percentUploaded: 0,
    loading: false
  }),
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    workspaceId() {
      return this.$route.params.id;
    }
  },
  methods: {
    addMessage() {
      const messagesRef = db.collection(
        `workspaces/${this.workspaceId}/channels/${
          this.currentChannel.id
        }/messages`
      );
      const message = {
        content: this.message,
        createdAt: getTime(new Date()),
        user: this.currentUser
      };
      messagesRef
        .doc()
        .set(message)
        .then(() => console.log("Message sent"))
        .catch(err => console.log(err));
      this.message = "";
    },
    handleFileUpload(file, metadata) {
      const ref = db.collection(
        `workspaces/${this.workspaceId}/channels/${
          this.currentChannel.id
        }/messages`
      );
      const filePath = `chat/public/${uuidv4()}.jpg`;

      this.uploadState = "uploading";
      this.uploadTask = this.storageRef.child(filePath).put(file, metadata);

      this.uploadTask.on(
        "state_changed",
        snap => {
          const percentUploaded = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          this.percentUploaded = percentUploaded;
        },
        err => {
          console.log(err);
          (this.uploadState = "error"), (this.uploadTask = null);
        },
        () => {
          console.log(this.uploadTask.snapshot.ref);
          this.uploadTask.snapshot.ref
            .getDownloadUrl()
            .then(downloadUrl => {
              console.log(downloadUrl);
              this.sendFileMessage(downloadUrl, ref);
            })
            .catch(err => {
              console.log(err);
              this.uploadState = "error";
              this.uploadTask = null;
            });
        }
      );
    },
    sendFileMessage(fileUrl, ref) {}
  }
};
</script>

<style lang="scss" scoped>
.chat-form {
  position: fixed;
  bottom: 1em;
  margin-left: 260px !important;
  margin-right: 5px;
  left: 0;
  right: 1em;
  z-index: 200;
}

.chat-input {
  width: 100%;
}
</style>

