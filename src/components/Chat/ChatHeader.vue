<template>
  <div>
    <sui-segment class="chat-header">
      <div class="channel-details">
        <sui-header>
          <h3>#{{ currentChannel.name }}</h3>
          <sui-header sub>{{ uniqueUsers }}</sui-header>
        </sui-header>
      </div>

      <div class="search">
        <sui-input placeholder="Search..." icon="search"/>
        <sui-icon @click="toggle" name="bars" size="large" class="ml-3"/>
      </div>
    </sui-segment>
    <sui-sidebar direction="right" :visible="visible" animation="push"></sui-sidebar>
  </div>
</template>

<script>
export default {
  props: ["currentChannel", "uniqueUsers"],
  data: () => ({
    visible: false
  }),
  methods: {
    toggle() {
      this.visible = !this.visible;
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search {
  display: flex;
  align-items: center;
}

.bars {
  cursor: pointer;
}
</style>

