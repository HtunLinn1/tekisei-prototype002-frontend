<template>
  <v-container class="text-center">
    <p v-if="answered_index === -1" class="text-h5">
      Part1の問題はいじょうです。<br>
      終了してよろしいですか
    </p>
    <p v-else class="text-h5">
      Part1の問題に未回答の問題があります。
    </p>
    <v-container>
      <v-row>
        <v-col v-for="(ans) in selected_answers" :key="ans.qusId" cols="4">
          <div class="d-flex justify-space-between mb-6">
            <v-chip
              class=" chip"
              :color="ans.answer === ''? '#E9967A' : '#82E0AA'"
              text-color="white"
              width="200"
              @click="clickQusId(ans.onboarding)"
            >
              {{ ans.qusId }} .
              {{ ans.answer }}
            </v-chip>
            <span v-if="ans.checkbox" class="star">*</span>
            <span>
            </span>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div >

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
    this.answered_index = this.selected_answers.findIndex(ans => ans.answer === "")
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