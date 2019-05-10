<template>
  <sui-segment class="chat-header">
    <div class="channel-details">
      <sui-header>
        <h3>#{{ currentChannel.name }}</h3>
        <sui-header sub>2 users</sui-header>
      </sui-header>
    </div>

    <div class="search">
      <sui-input placeholder="Search..." icon="search"/>
    </div>
  </sui-segment>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("channels", ["currentChannel"])
  }
};
</script>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
}
</style>

