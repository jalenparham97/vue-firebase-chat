<template>
  <sui-segment class="chat-form">
    <sui-form @submit.prevent="addMessage">
      <div class="ui left action input fluid">
        <sui-button icon="plus"/>
        <input type="text" placeholder="Message" v-model="message">
      </div>
    </sui-form>
  </sui-segment>
</template>

<script>
import { mapGetters } from "vuex";
import db from "../../db/db";
import { getTime } from "date-fns";

export default {
  data: () => ({
    message: ""
  }),
  computed: {
    ...mapGetters("channels", ["currentChannel"]),
    ...mapGetters("auth", ["currentUser"]),
    channelId() {
      return this.currentChannel.id;
    },
    workspaceId() {
      return this.$route.params.id;
    }
  },
  methods: {
    addMessage() {
      const messagesRef = db.collection(
        `workspaces/${this.workspaceId}/channels/${this.channelId}/messages`
      );
      const message = {
        content: this.message,
        createdAt: getTime(new Date()),
        user: this.currentUser
      };
      messagesRef
        .doc()
        .set(message)
        .then(() => console.log(message))
        .catch(err => console.log(err));
      this.message = "";
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
  z-index: 200;
}

.chat-input {
  width: 100%;
}
</style>

