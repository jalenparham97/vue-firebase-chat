<template>
  <section class="chat-console">
    <div class="chat-container">
      <Sidebar :channels="channels" :changeChannel="changeChannel" :newChannel="newChannel"></Sidebar>
      <Chat
        class="chat"
        :currentChannel="currentChannel"
        :messages="messages"
        :addListeners="addListeners"
      ></Chat>
    </div>
  </section>
</template>

<script>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Chat from "../components/Chat/Chat.vue";
import db from "../db/db";

export default {
  name: "ChatConsole",
  components: {
    Sidebar,
    Chat
  },
  data: () => ({
    messages: [],
    channels: [],
    currentChannel: ""
  }),
  computed: {
    workspaceId() {
      return this.$route.params.id;
    }
  },
  created() {
    const messagesRef = db
      .collection(
        `workspaces/${this.workspaceId}/channels/${
          this.currentChannel.id
        }/messages`
      )
      .orderBy("createdAt", "asc");
    const loadedMessages = [];
    messagesRef.onSnapshot(snapShot => {
      snapShot.docChanges().forEach(change => {
        if (change.type === "added") {
          loadedMessages.push(change.doc.data());
          this.messages = loadedMessages;
        }
      });
    });
  },
  mounted() {
    const channelsRef = db.collection(
      `workspaces/${this.workspaceId}/channels`
    );
    let defaultChannel;
    channelsRef.get().then(snapShot => {
      snapShot.docs.forEach(doc => {
        this.channels.push(doc.data());
      });
      defaultChannel = this.channels[0];
      this.currentChannel = defaultChannel;
      this.addListeners();
    });
  },
  methods: {
    changeChannel(channel) {
      this.currentChannel = channel;
      const messagesRef = db.collection(
        `workspaces/${this.workspaceId}/channels/${channel.id}/messages`
      );
      messagesRef
        .get()
        .then(snapShot => {
          const messages = [];
          snapShot.docs.forEach(doc => {
            messages.push(doc.data());
          });
          this.messages = messages;
          this.addListeners();
        })
        .catch(err => console.log(err));
    },
    addListeners() {
      this.addMessageListeners();
    },
    addMessageListeners() {
      const messagesRef = db
        .collection(
          `workspaces/${this.workspaceId}/channels/${
            this.currentChannel.id
          }/messages`
        )
        .orderBy("createdAt", "asc");
      const loadedMessages = [];
      messagesRef.onSnapshot(snapShot => {
        snapShot.docChanges().forEach(change => {
          if (change.type === "added") {
            loadedMessages.push(change.doc.data());
            this.messages = loadedMessages;
          }
        });
      });
    },
    newChannel(channel) {
      this.changeChannel(channel);
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-console {
  height: 100vh;
}

.chat-container {
  display: flex;
  height: 100%;
}

.chat {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 87%;
}
</style>
