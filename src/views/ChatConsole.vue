<template>
  <section class="chat-console">
    <div class="chat-container">
      <Sidebar></Sidebar>
      <Chat class="chat"></Chat>
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
