<template>
  <sui-comment>
    <sui-comment-avatar :src="message.user.avatar"/>
    <sui-comment-content>
      <a is="sui-comment-author">{{ message.user.displayName }}</a>
      <sui-comment-metadata>
        <div>{{ date }}</div>
      </sui-comment-metadata>
      <sui-comment-text>{{ message.content }}</sui-comment-text>
      <sui-image
        class="mt-2"
        v-if="containsImage(message)"
        :src="message.image"
        size="large"
        rounded
      />
    </sui-comment-content>
  </sui-comment>
</template>

<script>
import { format } from "date-fns";

export default {
  props: ["message"],
  computed: {
    date() {
      return format(new Date(this.message.createdAt), "h:mm a");
    }
  },
  methods: {
    containsImage(message) {
      return (
        (message.image && !message.content) ||
        (message.image && message.content)
      );
    }
  }
};
</script>

<style>
</style>
