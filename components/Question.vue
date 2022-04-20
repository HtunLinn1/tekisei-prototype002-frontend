<template>
  <v-container>
    <v-card>
      <v-card-text justify="center" align="center">
        <v-row v-if="'qus_text' in qus" class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-h6"
            style="word-spacing: 12px;"
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
            sm="5"
            md="5"
          >
            <v-img :src="require(`~/assets/images/${qus.url_qus}`)" />
            <!-- <v-card
              flat
              class="my-auto"
              height="50%"
            >
              <v-container fluid>
                <v-layout>
                <v-flex>
                  <v-img
                    class="mx-2 my-auto"
                    :src="require(`~/assets/images/${qus.url_qus}`)"
                  />
                </v-flex>
                </v-layout>
              </v-container>
            </v-card> -->
          </v-col>
          <v-col
            cols="12"
            sm="7"
            md="7"
          >
            <v-img :src="require(`~/assets/images/${qus.url_ans}`)" max-width="505" />
          </v-col>
        </v-row>
        <v-chip-group v-model="selection" active-class="success" column class="answer-btn">
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
    </v-card>
  </v-container>
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