<template>
  <div class="direct-messages">
    <div class="ui middle aligned selection list inverted">
      <div class="new-direct-message">
        <span>Direct Messages</span>
        <sui-icon name="plus"/>
      </div>
      <!-- <div
        class="channel-item"
        :class="[channel.id === currentChannel.id ? 'active' : '']"
        v-for="channel in channels"
        :key="channel.id"
        is="sui-menu-item"
        @click="changeChannel(channel)"
      >
        <div class="content">
          <span class="channel"># {{ channel.name }}</span>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.direct-messages {
  margin-top: 50px;
}

.new-direct-message {
  display: flex;
  justify-content: space-between;
}

.plus {
  margin-right: 30px;
  cursor: pointer;
  // font-size: 1.2rem;
}

.new-direct-message span {
  margin-left: 30px;
}

.direct-message {
  margin-left: 22px;
}

.direct-message-item {
  border-radius: 0px !important;
}
</style>
