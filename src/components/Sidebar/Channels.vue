<template>
  <div class="channels">
    <sui-menu fluid vertical text>
      <div class="new-channel">
        <span>Channels</span>
        <sui-icon name="plus" @click="toggleModal" v-b-modal.modal-1/>
      </div>
      <a v-for="channel in channels" :key="channel.id" is="sui-menu-item"># {{ channel.name }}</a>
    </sui-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import db from "../../db/db";

export default {
  data: () => ({
    channels: [],
    open: false
  }),
  computed: {
    ...mapGetters("workspaces", ["currentWorkspace"])
  },
  mounted() {
    this.addListeners();
  },
  methods: {
    toggleModal() {
      this.open = !this.open;
      this.$store.dispatch("toggleModal", this.open);
    },
    addListeners() {
      const channelsRef = db.collection(
        `workspaces/${this.currentWorkspace.id}/channels`
      );
      let loadedChannels = [];
      channelsRef.onSnapshot(snapShot => {
        snapShot.docChanges().forEach(change => {
          if (change.type === "added") {
            loadedChannels.push(change.doc.data());
            this.channels = loadedChannels;
          }
        });
      });
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
  margin-right: 50px;
  cursor: pointer;
}
</style>

