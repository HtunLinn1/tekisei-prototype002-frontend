<template>
  <v-container>
    <div v-for="(ans) in selected_answers" :key="ans.qusId">
      <v-chip
        class="ma-2 chip"
        :color="ans.answer === ''? '#E9967A' : '#82E0AA'"
        text-color="white"
        width="200"
        @click="clickQusId(ans.onboarding)"
      >
        {{ ans.qusId }} .&nbsp;
        {{ ans.answer }}
      </v-chip>
      <span v-if="ans.checkbox" class="star">*</span>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'CompleteForm',
  data() {
    return {
      selected_answers: '',
      answered_index: ''
    }
  },
  mounted() {
    this.selected_answers = JSON.parse(localStorage.getItem("selected-answers"))
    console.log(this.selected_answers)
    this.answered_index = this.selected_answers.findIndex(ans => ans.ans === '')
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
  .chip {
    width: 120px;
  }
</style>