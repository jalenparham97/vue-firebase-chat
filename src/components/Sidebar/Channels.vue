<template>
  <div class="channels">
    <div class="ui middle aligned selection list inverted">
      <div class="new-channel">
        <span>Channels</span>
        <sui-icon name="plus" @click="toggleModal" v-b-modal.modal-1/>
      </div>
      <div
        class="item"
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

.plus {
  margin-right: 30px;
  cursor: pointer;
}

.new-channel span {
  margin-left: 30px;
}

.channel {
  margin-left: 22px;
}

.item {
  border-radius: none;
}
</style>

