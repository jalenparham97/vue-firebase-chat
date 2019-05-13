<template>
  <div class="chat">
    <ChatHeader :currentChannel="currentChannel"/>
    <div class="messages">
      <sui-comment-group>
        <Message v-for="message in messages" :key="message.id" :message="message"/>
      </sui-comment-group>
    </div>
    <ChatForm :currentChannel="currentChannel"/>
    <FileModal/>
  </div>
</template>

<script>
import ChatHeader from "./ChatHeader.vue";
import ChatForm from "./ChatForm.vue";
import Message from "./Message.vue";
import FileModal from "./FileModal.vue";
import { mapGetters } from "vuex";
import db from "../../db/db";

export default {
  components: {
    ChatHeader,
    ChatForm,
    Message,
    FileModal
  },
  props: ["currentChannel", "messages", "addListeners"],
  computed: {
    ...mapGetters("workspaces", ["currentWorkspace"]),
    workspaceId() {
      return this.$route.params.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.messages {
  height: 75%;
  overflow-y: scroll;
}
</style>
