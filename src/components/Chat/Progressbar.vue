<template>
  <sui-progress
    v-if="uploadState === 'uploading'"
    color="green"
    progress
    :percent="percentUploaded"
    size="tiny"
  />
</template>

<script>
export default {
  props: ["uploadState", "percentUploaded"]
};
</script>
