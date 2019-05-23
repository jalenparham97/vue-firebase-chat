<template>
  <div class="messages" id="messages">
    <sui-comment-group>
      <Message v-for="(message, index) in messages" :key="index" :message="message"/>
    </sui-comment-group>
  </div>
</template>

<script>
import Message from "./Message.vue";
import { messaging } from "firebase";
export default {
  components: {
    Message
  },
  props: ["messages"],
  updated() {
    const messages = document.getElementById("messages");
    messages.scrollTo(0, messages.scrollHeight);
    console.log(messages.clientHeight);
  }
};
</script>

<style scoped>
.messages {
  max-height: 60%;
  overflow-y: scroll;
}
</style>
