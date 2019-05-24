<template>
  <section class="chat-console">
    <div class="chat-container">
      <Sidebar
        :channels="channels"
        :changeChannel="changeChannel"
        :newChannel="newChannel"
        :currentChannel="currentChannel"
      ></Sidebar>
      <Chat
        class="chat"
        :currentChannel="currentChannel"
        :messages="messages"
        :uniqueUsers="uniqueUsers"
      ></Chat>
    </div>
  </section>
</template>

<script>
import Sidebar from "../../components/Sidebar/Sidebar.vue";
import Chat from "../../components/Chat/Chat.vue";
import db from "../../db/db";
import { mapGetters } from "vuex";
import { messaging } from "firebase";

export default {
  name: "ChatConsole",
  components: {
    Sidebar,
    Chat
  },
  props: ["currentUser"],
  data: () => ({
    messages: [],
    channels: [],
    currentChannel: "",
    uniqueUsers: "",
    currentWorkspace: ""
  }),
  computed: {
    workspaceId() {
      return this.$route.params.id;
    }
  },
  created() {
    this.addListeners();
  },
  mounted() {
    this.getChannels();
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
      this.addChannelsListeners();
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
            this.countUniqueUsers(loadedMessages);
          }
        });
      });
    },
    addChannelsListeners(id) {
      if (id) {
        console.log(id);
      }
      const channelsRef = db.collection(
        `workspaces/${this.workspaceId}/channels`
      );
      const channels = [];
      channelsRef.onSnapshot(snapShot => {
        snapShot.docChanges().forEach(change => {
          if (change.type === "added") {
            channels.push(change.doc.data());
            this.channels = channels;
          }
        });
      });
    },
    newChannel(channel) {
      this.changeChannel(channel);
    },
    countUniqueUsers(messages) {
      const uniqueUsers = messages.reduce((acc, message) => {
        console.log(acc);
        console.log(message);
        if (!acc.includes(message.user.displayName)) {
          acc.push(message.user.displayName);
        }
        return acc;
      }, []);
      const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
      const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
      this.uniqueUsers = numUniqueUsers;
    },
    getChannels() {
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
