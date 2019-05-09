<template>
  <div class="chat">
    <ChatHeader/>
  </div>
</template>

<script>
import ChatHeader from "./ChatHeader.vue";

export default {
  components: {
    ChatHeader
  }
};
</script>

<style lang="scss" scoped>
.chat {
  padding-left: 2em;
}
</style>
