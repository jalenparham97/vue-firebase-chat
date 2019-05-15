<template>
  <div>
    <sui-segment class="chat-form">
      <Progressbar :uploadState="uploadState" :percentUploaded="percentUploaded"/>
      <sui-form @submit.prevent="addMessage">
        <div class="ui left action input fluid">
          <sui-button icon="plus"/>
          <input type="text" placeholder="Message" v-model="message">
        </div>
      </sui-form>
      <sui-button class="mt-2" v-b-modal.modal-2 icon="cloud">Upload Media</sui-button>
    </sui-segment>
    <FileModal :handleFileUpload="handleFileUpload"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import db from "../../db/db";
import firebase from "../../db/firebase";
import { getTime } from "date-fns";
import uuidv4 from "uuid/v4";
import FileModal from "./FileModal.vue";
import Progressbar from "./Progressbar.vue";

export default {
  components: {
    FileModal,
    Progressbar
  },
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
    createMessage(fileUrl = null, fileMessage = "") {
      const message = {
        content: this.message || fileMessage,
        createdAt: getTime(new Date()),
        user: this.currentUser
      };

      if (fileUrl !== null) {
        message["content"] = fileMessage;
        message["image"] = fileUrl;
      } else {
        message["content"] = this.message;
      }

      return message;
    },
    addMessage() {
      this.loading = true;
      const messagesRef = db.collection(
        `workspaces/${this.workspaceId}/channels/${
          this.currentChannel.id
        }/messages`
      );
      messagesRef
        .doc()
        .set(this.createMessage())
        .then(() => (this.loading = false))
        .catch(err => console.log(err));
      this.message = "";
    },
    handleFileUpload(file, metadata, fileMessage) {
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
          this.uploadTask.snapshot.ref
            .getDownloadURL()
            .then(downloadUrl => {
              this.sendFileMessage(downloadUrl, ref, fileMessage);
            })
            .catch(err => {
              console.log(err);
              this.uploadState = "error";
              this.uploadTask = null;
            });
        }
      );
    },
    sendFileMessage(fileUrl, ref, fileMessage) {
      ref
        .doc()
        .set(this.createMessage(fileUrl, fileMessage))
        .then(() => {
          this.uploadState = "done";
        })
        .catch(err => console.log(err));
    }
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
  z-index: 100;
}

.chat-input {
  width: 100%;
}
</style>

