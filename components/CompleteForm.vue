<template>
  <v-container fluid-width>
    <p v-if="answered_index === -1" class="text-h5 text-center">
      Part1の問題はいじょうです。<br>
      終了してよろしいですか
    </p>
    <p v-else class="text-h5 text-center">
      Part1の問題に未回答の問題があります。
    </p>
    <v-container>
      <v-row>
        <v-col v-for="(ans) in selected_answers" :key="ans.qusId" cols="4" align="center" justify="center">
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
              <span v-if="ans.qusType === 1" class="pr-2">
                ①
              </span>
              <span v-if="ans.qusType === 2" class="pr-2">
                ②
              </span>
              <span v-if="ans.qusType === 3" class="pr-2">
                ③
              </span>
              <span v-if="ans.qusType === 4" class="pr-2">
                ④
              </span>
              {{ ans.qusCount }}
              <span v-if="ans.answer" class="answer">({{ ans.answer }})</span>
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
              <span v-if="ans.qusType === 1" class="pr-2">
                ①
              </span>
              <span v-if="ans.qusType === 2" class="pr-2">
                ②
              </span>
              <span v-if="ans.qusType === 3" class="pr-2">
                ③
              </span>
              <span v-if="ans.qusType === 4" class="pr-2">
                ④
              </span>
            {{ ans.qusCount }}
             <span v-if="ans.answer" class="answer">({{ ans.answer }})</span>
          </v-chip>
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
    min-width: 83px;
  }
  .answer {
    padding-left: 8px;
  }
  @media only screen and (min-width: 600px) {
    .chip {
      width: 120px;
    }
    .answer {
      padding-left: 8px;
    }
  }
</style>