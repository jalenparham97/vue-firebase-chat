<template>
  <div class="chat">
    <ChatHeader/>
    <div class="messages">
      <sui-comment-group>
        <h1>Comment</h1>
      </sui-comment-group>
    </div>
    <ChatForm/>
  </div>
</template>

<script>
import ChatHeader from "./ChatHeader.vue";
import ChatForm from "./ChatForm.vue";
import { mapGetters } from "vuex";
import db from "../../db/db";

export default {
  components: {
    ChatHeader,
    ChatForm
  },
  data: () => ({
    messages: []
  }),
  computed: {
    ...mapGetters("channels", ["currentChannel"]),
    ...mapGetters("workspaces", ["currentWorkspace"]),
    workspaceId() {
      return this.$route.params.id;
    },
    channelId() {
      return this.currentChannel.id;
    }
  },
  mounted() {
    this.addListeners();
  },
  methods: {
    addListeners() {
      this.addMessageListeners();
    },
    addMessageListeners() {
      const messagesRef = db
        .collection(
          `workspaces/${this.workspaceId}/channels/${this.channelId}/messages`
        )
        .orderBy("createdAt", "desc");
      const loadedMessages = [];
      messagesRef.onSnapshot(snapShot => {
        snapShot.docChanges().forEach(change => {
          if (change.type === "added") {
            loadedMessages.push(change.doc.data());
            this.messages = loadedMessages;
          }
        });
        console.log(this.messages);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// .chat {
//   display: flex;
//   flex-direction: column;
// }
.messages {
  height: 500px;
  overflow-y: scroll;
}
</style>
