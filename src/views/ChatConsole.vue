<template>
  <section class="chat-console">
    <div class="chat-container">
      <Sidebar></Sidebar>
      <Chat></Chat>
    </div>
  </section>
</template>

<script>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Chat from "../components/Chat/Chat.vue";

export default {
  name: "ChatConsole",
  components: {
    Sidebar,
    Chat
  }
};
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
}
</style>
