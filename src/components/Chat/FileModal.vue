<template>
  <b-modal id="modal-2" title="Add a new file" centered v-model="open">
    <form>
      <div class="ui labeled input mb-4 w-100">
        <div class="ui label">Add file</div>
        <input type="file" ref="file" @change="handleFileChange()">
      </div>
    </form>
    <div slot="modal-footer">
      <sui-button class="float-right ml-3" @click="toggle">Close</sui-button>
      <sui-button class="float-right">Add</sui-button>
    </div>
  </b-modal>
</template>

<script>
export default {
  data: () => ({
    file: null,
    open: false
  }),
  methods: {
    toggle() {
      this.open = !this.open;
    },
    addFile() {},
    handleFileChange() {
      const file = this.$refs.file.files[0];
      console.log(file);
      if (file) {
        this.file = file;
      }
    }
  }
};
</script>

<style>
</style>
