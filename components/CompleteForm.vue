<template>
  <v-container>
    <div v-for="(ans) in selected_answers" :key="ans.qusId">
      <nuxt-link to="" @click.native="clickQusId(ans.onboarding)">
        {{ ans.qusId }} .&nbsp;
      </nuxt-link>
      {{ ans.answer }} <span v-if="ans.checkbox" class="star">*</span>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'CompleteForm',
  data() {
    return {
      selected_answers: ''
    }
  },
  mounted() {
    this.selected_answers = JSON.parse(localStorage.getItem("selected-answers"))
  },
  methods: {
    clickQusId(onboarding) {
      this.$emit('jumpQus', onboarding)
    }
  },
}
</script>

<style scoped>
  .star {
    color: red;
  }
</style>