<template>
  <b-modal id="modal-2" title="Add a new file" centered v-model="open">
    <form>
      <div class="ui labeled input mb-4 w-100">
        <div class="ui label">Message</div>
        <input type="text" v-model="message" placeholder="Optional">
      </div>
      <div class="ui labeled input mb-4 w-100">
        <div class="ui label">Add file</div>
        <input type="file" ref="file" @change="handleFileChange()">
      </div>
    </form>
    <div slot="modal-footer">
      <sui-button class="float-right ml-3" @click="toggle">Close</sui-button>
      <sui-button class="float-right" @click="addFile">Add</sui-button>
    </div>
  </b-modal>
</template>

<script>
import mime from "mime-types";

export default {
  props: ["handleFileUpload"],
  data: () => ({
    file: null,
    open: false,
    authorized: ["image/jpeg", "image/png"],
    message: ""
  }),
  methods: {
    toggle() {
      this.open = !this.open;
      this.file = null;
      this.message = "";
    },
    addFile() {
      const file = this.file;
      if (file !== null) {
        if (this.isAuthorized(file.name)) {
          const metadata = { contentType: mime.lookup(file.name) };
          this.handleFileUpload(file, metadata, this.message);
          this.file = null;
          this.message = "";
        }
        this.open = false;
      }
    },
    handleFileChange() {
      const file = this.$refs.file.files[0];
      if (file) {
        this.file = file;
      }
    },
    isAuthorized(fileName) {
      return this.authorized.includes(mime.lookup(fileName));
    }
  }
};
</script>

<style>
</style>
