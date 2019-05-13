<template>
  <b-modal id="modal-1" title="Add a new channel" centered v-model="open">
    <form>
      <div class="ui labeled input mb-4 w-100">
        <div class="ui label">Name of channel</div>
        <input type="text" v-model="channel.channelName">
      </div>
      <div class="ui labeled input w-100">
        <div class="ui label">About the channel</div>
        <input type="text" v-model="channel.channelDetails">
      </div>
    </form>
    <div slot="modal-footer">
      <sui-button class="float-right ml-3" @click="toggle">Close</sui-button>
      <sui-button class="float-right" @click="addChannel">Add</sui-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import db from "../../db/db";
import { getTime } from "date-fns";
import uuidv4 from "uuid/v4";

export default {
  props: ["newChannel"],
  data: () => ({
    open: false,
    channel: {
      channelName: "",
      channelDetails: ""
    }
  }),
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapGetters("workspaces", ["currentWorkspace"])
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },

    addChannel() {
      const { channelName, channelDetails } = this.channel;
      const channelsRef = db.collection(
        `workspaces/${this.currentWorkspace.id}/channels`
      );
      const channel = {
        name: channelName,
        details: channelDetails,
        createdAt: getTime(new Date()),
        createdBy: this.currentUser,
        id: uuidv4()
      };

      channelsRef
        .doc(channel.id)
        .set(channel)
        .then(() => this.newChannel(channel));
      this.toggle();
    }
  }
};
</script>

<style>
</style>
