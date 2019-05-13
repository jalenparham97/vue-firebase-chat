<template>
  <div class="channels">
    <sui-menu fluid vertical text>
      <div class="new-channel">
        <span>Channels</span>
        <sui-icon name="plus" @click="toggleModal" v-b-modal.modal-1/>
      </div>
      <a
        v-for="channel in channels"
        :key="channel.id"
        is="sui-menu-item"
        @click="changeChannel(channel)"
      ># {{ channel.name }}</a>
    </sui-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import db from "../../db/db";

export default {
  props: ["channels", "changeChannel"],
  data: () => ({
    open: false,
    firstLoad: true
  }),
  computed: {
    ...mapGetters("workspaces", ["currentWorkspace"])
  },
  methods: {
    ...mapActions("channels", ["setChannel"]),
    toggleModal() {
      this.open = !this.open;
      this.$store.dispatch("toggleModal", this.open);
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
</style>

