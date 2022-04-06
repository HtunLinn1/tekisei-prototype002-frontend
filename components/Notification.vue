<template>
  <v-alert show variant="danger">
    <div v-for="m in message" :key="m.id">
      <span class="error-text">{{ m }}</span>
    </div>
  </v-alert>
</template>

<script>
export default {
  name: 'NotificationPage',
  props: {
    message: {
      type: Array,
      default: null
    }
  }
}
</script>
<style>
  .error-text {
    color: red;
  }
</style>