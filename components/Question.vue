<template>
  <v-container fluid>
    <v-card>
      <v-card-text justify="center" align="center">
        <v-row v-if="'qus_text' in qus" class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-h6 font-weight-black"
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
              <v-col v-for="(ans, i) in qus.answers" :key="i" class="text-h6 font-weight-black">
                ({{ i + 1 }})<br>
                {{ ans }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-else justify="center">
          <v-col
            cols="12"
            sm="5"
            md="5"
          >
            <v-img :src="require(`~/assets/images/${qus.url_qus}`)" class="image-left-size" />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <v-img :src="require(`~/assets/images/${qus.url_ans}`)" class="image-right-size" />
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
.image-left-size {
  width: 200px;
}
.image-right-size {
  width: 220px;
}
@media only screen and (min-width: 712px) {
  .image-left-size {
    width: 400px;
  }
  .image-right-size {
    width: 498px;
  }
}
</style>