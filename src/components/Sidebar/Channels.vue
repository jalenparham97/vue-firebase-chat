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
  data: () => ({
    channels: [],
    open: false,
    firstLoad: true
  }),
  computed: {
    ...mapGetters("workspaces", ["currentWorkspace"])
  },
  created() {},
  mounted() {
    this.addListeners();
  },
  methods: {
    ...mapActions("channels", ["setChannel"]),
    toggleModal() {
      this.open = !this.open;
      this.$store.dispatch("toggleModal", this.open);
    },
    addListeners() {
      const channelsRef = db.collection(
        `workspaces/${this.$route.params.id}/channels`
      );
      let loadedChannels = [];
      channelsRef.onSnapshot(snapShot => {
        snapShot.docChanges().forEach(change => {
          if (change.type === "added") {
            loadedChannels.push(change.doc.data());
            this.channels = loadedChannels;
          }
          this.setDefaultChannel();
        });
      });
    },

    changeChannel(channel) {
      this.setChannel(channel);
    },

    setDefaultChannel() {
      const defaultChannel = this.channels[0];
      if (this.firstLoad && this.channels.length > 0) {
        this.setChannel(defaultChannel);
      }
      this.firstLoad = false;
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

