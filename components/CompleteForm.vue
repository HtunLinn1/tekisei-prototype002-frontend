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
        <v-col v-for="(ans) in selected_answers" :key="ans.qusId" cols="4" class="text-center">
          <div class="d-flex flex-row mb-6">
          <v-badge
            v-if="ans.checkbox"
            bordered
            color="error"
            icon="mdi-flag-triangle"
            overlap
          >
            <v-chip
              class="chip"
              :color="ans.answer === ''? '#E9967A' : '#82E0AA'"
              text-color="white"
              width="200"
              @click="clickQusId(ans.onboarding)"
            >
              {{ ans.qusId }}.
              <span v-if="ans.answer">({{ ans.answer }})</span>
            </v-chip>
          </v-badge>
          <v-chip
            v-else
            class="chip"
            :color="ans.answer === ''? '#E9967A' : '#82E0AA'"
            text-color="white"
            width="200"
            @click="clickQusId(ans.onboarding)"
          >
            {{ ans.qusId }}.
             <span v-if="ans.answer">({{ ans.answer }})</span>
          </v-chip>
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
    localStorage.removeItem("jump-question")
  },
  methods: {
    clickQusId(onboarding) {
      localStorage.setItem("jump-question", JSON.stringify(true))
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
    min-width: 80px;
  }
  @media only screen and (min-width: 600px) {
    .chip {
      width: 120px;
    }
  }
</style>