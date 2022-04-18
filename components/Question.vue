<template>
  <v-card>
    <v-row justify="center" align="center" class="fill-height pt-5">
      <v-card-text class="text-center" justify="center" align="center">
        <v-container
          id="scroll-target"
          style="max-height: 120px"
          class="overflow-y-auto mx-auto"
        >
          <v-row v-if="'qus_text' in qus" class="fill-height">
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="text-h6"
            >
              {{ qus.qus_text }}
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-row>
                <v-col v-for="(ans, i) in qus.answers" :key="i" class="text-h6">
                  ({{ i + 1 }})&nbsp;<br>
                  {{ ans }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <div class="d-flex justify-start">
                <v-img :src="require(`~/assets/images/${qus.url_qus}`)" />
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-img :src="require(`~/assets/images/${qus.url_ans}`)" />
            </v-col>
          </v-row>
        </v-container>
        <v-chip-group v-model="selection" active-class="primary--text " column class="answer-btn">
          <v-chip
            v-for="(ans, i) in qus.answers"
            :key="i"
            :value="i + 1"
            class="button"
            pill
          >
          <div v-if="'qus_text' in qus">({{ i + 1 }})&nbsp;{{ ans }}</div>
          <div v-else>({{ ans }})</div>
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'QuestionPage',
  props: {
    qus: {
      type: Object, default: null
    },
    onboarding: {
      type: Number, default: null
    }
  },
  data() {
    return {
      selection: '',
      onborading: this.onboarding
    }
  },
  updated() {
    this.emit()
  },
  mounted() {
    // selected answers
    localStorage.setItem("selected-answers",
      localStorage.getItem("selected-answers") !== null? 
        localStorage.getItem("selected-answers") : 
        JSON.stringify([])
    )
    this.getAnswer()
    this.emit()
  },
  methods: {
    emit() {
      this.$emit('selectedAnswer', { 
        qusId: this.qus.id,
        answer: this.selection === undefined? '' : this.selection,
        onboarding: this.onboarding
      })
    },
    getAnswer () {
      const answers = JSON.parse(localStorage.getItem("selected-answers"))
      const index = answers.findIndex(ans => ans.qusId === this.qus.id)
      if (index !== -1) {
        this.selection = answers[index].answer
      }
    }
  },
}
</script>

<style scoped>
.text {
  min-height: 180px;
  white-space: pre-wrap;
}
.answer-btn {
  max-width: 200px;
}
.button {
  min-width: 90%;
}
</style>