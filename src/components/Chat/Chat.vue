<template>
  <div class="chat">
    <ChatHeader :currentChannel="currentChannel" :uniqueUsers="uniqueUsers"/>
    <div class="messages">
      <sui-comment-group>
        <Message v-for="message in messages" :key="message.id" :message="message"/>
      </sui-comment-group>
    </div>
    <ChatForm :currentChannel="currentChannel"/>
  </div>
</template>

<script>
import ChatHeader from "./ChatHeader.vue";
import ChatForm from "./ChatForm.vue";
import Message from "./Message.vue";
import { mapGetters } from "vuex";
import db from "../../db/db";

export default {
  components: {
    ChatHeader,
    ChatForm,
    Message
  },
  props: ["currentChannel", "messages", "uniqueUsers"],
  computed: {
    ...mapGetters("workspaces", ["currentWorkspace"]),
    workspaceId() {
      return this.$route.params.id;
    }
  }
  // created() {
  //   console.log(localStorage.workspaceId);
  // }
};
</script>

<style lang="scss" scoped>
.messages {
  height: 60%;
  overflow-y: scroll;
}
</style>
