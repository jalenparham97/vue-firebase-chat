<template>
  <sui-comment>
    <sui-comment-avatar :src="message.user.avatar"/>
    <sui-comment-content>
      <a is="sui-comment-author">{{ message.user.displayName }}</a>
      <sui-comment-metadata>
        <div>{{ date }}</div>
      </sui-comment-metadata>
      <sui-comment-text>{{ message.content }}</sui-comment-text>
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
  }
};
</script>

<style>
</style>
