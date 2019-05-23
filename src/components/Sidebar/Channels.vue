<template>
  <div class="channels">
    <div class="ui middle aligned selection list inverted">
      <div class="new-channel">
        <span>Channels</span>
        <sui-icon class="channel-plus" name="plus" @click="toggleModal" v-b-modal.modal-1/>
      </div>
      <div
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
      </div>
      <div class="add-channel-item" is="sui-menu-item" v-b-modal.modal-1>
        <div class="content">
          <sui-icon class="add-plus" name="plus"/>
          <span>Add a channel</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import db from "../../db/db";

export default {
  props: ["channels", "changeChannel", "currentChannel"],
  data: () => ({
    open: false
  }),
  computed: {
    ...mapGetters("workspaces", ["currentWorkspace"])
  },
  methods: {
    ...mapActions("channels", ["setChannel"]),
    toggleModal() {
      this.open = !this.open;
    }
  }
};
</script>

<style lang="scss" scoped>
.channels {
  margin-top: 50px;
}

.new-channel {
  display: flex;
  justify-content: space-between;
}

.channel-plus {
  margin-right: 30px !important;
  cursor: pointer !important;
  // font-size: 1.2rem;
}

.add-plus {
  margin-left: 19px;
}

.new-channel span {
  margin-left: 30px;
}

.channel {
  margin-left: 22px;
}

.channel-item,
.add-channel-item {
  border-radius: 0px !important;
}

.add-channel-item {
  margin-top: 20px !important;
}
</style>

