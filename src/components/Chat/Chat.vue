<template>
  <div class="chat">
    <ChatHeader :currentChannel="currentChannel" :uniqueUsers="uniqueUsers"/>
    <Messages :messages="messages"/>
    <ChatForm :currentChannel="currentChannel"/>
  </div>
</template>

<script>
import ChatHeader from "./ChatHeader.vue";
import ChatForm from "./ChatForm.vue";
import Messages from "./Messages.vue";
import { mapGetters } from "vuex";
import db from "../../db/db";

export default {
  components: {
    ChatHeader,
    ChatForm,
    Messages
  },
  props: ["currentChannel", "messages", "uniqueUsers"],
  data: () => ({
    config: {
      childList: true
    }
  }),
  computed: {
    ...mapGetters("workspaces", ["currentWorkspace"]),
    workspaceId() {
      return this.$route.params.id;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
