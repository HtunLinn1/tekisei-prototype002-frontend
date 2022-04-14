<template>
  <v-card>
    <v-row class="float-right">
      <v-col>
        <v-checkbox
          v-model="checkbox"
          on-icon="mdi-flag-triangle"
          off-icon="mdi-flag-triangle"
          class="checkbox"
        />
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="fill-height pt-5">
      <v-card-text class="text-center" justify="center" align="center">
        <v-row v-if="'qus_text' in qus" class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-body-1 text-sm-h5"
          >
            <span class="pr-4">{{ onboarding + 1 }}.</span> {{ qus.qus_text }}
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-body-1 text-sm-h5"
          >
            <v-row class="text-body-1 text-sm-h5 ml-8">
              <v-col v-for="(ans, i) in qus.ans" :key="i">
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
              <span class="pt-2 text-sm-h5">
                {{ onboarding + 1 }}.
              </span>
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
        <v-chip-group v-model="selection" active-class="primary--text " column class="answer-btn">
          <v-chip
            v-for="(ans, i) in qus.ans"
            :key="i"
            :value="i + 1"
            class="button"
            pill
          >
          <div v-if="'qus_text' in qus">({{ i + 1 }})&nbsp;{{ qus.ans[i] }}</div>
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
      checkbox: false
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
    this.emit()
    this.getAnswer()
  },
  methods: {
    emit () {
      this.$emit('selectedAnswer', { 
        qusId: this.qus.id,
        answer: this.selection === undefined? '' : this.selection,
        onboarding: this.onboarding,
        checkbox: this.checkbox
      })
    },
    getAnswer () {
      const answers = JSON.parse(localStorage.getItem("selected-answers"))
      const index = answers.findIndex(ans => ans.qusId === this.qus.id)
      if (index !== -1) {
        this.selection = answers[index].answer
        this.checkbox = answers[index].checkbox
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
.checkbox {
  transform: scale(1.2);
}
.v-input--selection-controls__ripple {
  display: none;
}
</style>