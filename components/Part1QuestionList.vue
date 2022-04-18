<template>
  <v-container class="question">
    <div class="timer-absolute">
      <div class="timer">
        <div class="time">
          {{ formatTime }}
        </div>
      </div>
    </div>
    <v-card
      color="white"
      flat
      tile
      height="420"
    >
      <v-card v-if="!isComplete">
        <v-card-title v-if="onboarding < 3" class="text text-sm-h6 text-body-1">
          ①次の計算式の□に当てはまる数値を５択より選択してください。
        </v-card-title>
        <v-card-title v-else-if="onboarding >= 3 && onboarding < 5 " class="text text-sm-h6 text-body-1">
          ②次の文字列について法則性を見つけ出し、次にくる文字を５択より選択してください。
        </v-card-title>
        <v-card-title v-else-if="onboarding >= 5 && onboarding < 10 " class="text text-sm-h6 text-body-1">
          ③次の数列について法則性を見つけ出し、（ ）内にくる数字を５択より選択してください。
        </v-card-title>
        <v-card-title v-else class="text text-sm-h6 text-body-1">
          ④各列の左側の四つの図形は一定の法則に基づいて並んでいます。次にくる図形を５択より選択してください。
        </v-card-title>
      </v-card>
      <div v-if="!isComplete" class="text-right">
        {{ onboarding + 1 }} / {{ part1Qus.length }}
      </div>
      <v-window v-model="onboarding">
        <v-window-item
          v-for="qus in part1Qus"
          :key="qus.id"
        >
          <CompleteForm v-if="isComplete" @jumpQus="jumpQus($event)" />
          <Question v-else :qus="qus" :onboarding="onboarding" @selectedAnswer="selectedAnswer($event)" />
        </v-window-item>
      </v-window>

      <v-card-actions v-if="!isComplete" class="justify-space-between">
        <v-btn
          :disabled="onboarding === 0"
          color="primary"
          @click="prev"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-checkbox
          v-model="checkbox"
          on-icon="mdi-flag-triangle"
          off-icon="mdi-flag-triangle"
          class="checkbox"
          @click="clickCheck"
        />
        <v-btn
          v-if="isJump"
          color="primary"
          @click="jumpComplete"
        >
          完了
        </v-btn>
        <v-btn
          v-if="onboarding + 1 <= part1Qus.length"
          color="primary"
          @click="next"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions v-if="isComplete" class="justify-space-around">
        <v-btn
          v-if="isComplete"
          color="primary"
          @click="sendAns('send-click')"
        >
          完了
        </v-btn>
      </v-card-actions>
    </v-card>
    <DialogMessage ref="confirm" />
  </v-container>
</template>

<script>
import questions from '@/assets/data/part1QuestionList.json'
export default {
  data: () => ({
    part1Qus: questions,
    onboarding: 0,
    // timer
    min: localStorage.getItem("timer")? Math.floor(JSON.parse(localStorage.getItem("timer")) / 60) : 25,
    sec: localStorage.getItem("timer")? JSON.parse(localStorage.getItem("timer")) % 60 : 0,
    timerObj: null,
    selected_answer: {},
    isComplete: false,
    // checkbox flag
    checkbox: false,
    isJump: false
  }),
  computed: {
    // timer
    formatTime() {
      const timeStrings = [
        this.min.toString(),
        this.sec.toString()
      ].map(function(str) {
        if (str.length < 2) {
          return "0" + str
        } else {
          return str
        }
      })
      return timeStrings[0] + ":" + timeStrings[1]
    }
  },
  watch: { 
    onboarding() {
      this.setCheckbox()
    }
  },
  updated() {
    localStorage.setItem("timer", JSON.stringify(this.min * 60 + this.sec))
    localStorage.setItem("onboarding", JSON.stringify(this.onboarding))
  },
  mounted() {
    // selected answers
    localStorage.setItem("selected-answers",
      localStorage.getItem("selected-answers") !== null? 
        localStorage.getItem("selected-answers") : 
        JSON.stringify([])
    )
    // time start
    this.start()
    // onboarding
    this.onboarding = JSON.parse(localStorage.getItem("onboarding"))
    // is complete
    this.isComplete = JSON.parse(localStorage.getItem("is-complete"))
  },
  methods: {
    // timer
    count() {
      if (this.sec <= 0 && this.min >= 1) {
        this.min --;
        this.sec = 59;
      } else if(this.sec <= 0 && this.min <= 0) {
        this.complete();
      } else {
        this.sec --;
      }
    },
    start() {
      const self = this;
      this.timerObj = setInterval(function() {self.count()}, 1000)
    },
    complete() {
      clearInterval(this.timerObj)
      this.sendAns('timeout')
    },
    selectedAnswer (answer) {
      this.selected_answer = answer
      // set localstorage
      this.setLocalStorage()
    },
    // slide
    next() {
      if (this.onboarding  === this.part1Qus.length - 1) {
        this.isComplete = true
        localStorage.setItem('is-complete', JSON.stringify(this.isComplete))
      }
      this.onboarding = this.onboarding + 1 === this.part1Qus.length
        ? this.part1Qus.length
        : this.onboarding + 1;
    },
    prev() {
      this.onboarding = this.onboarding - 1 < 0
        ? 0
        : this.onboarding - 1;
      this.isComplete = false
    },
    setLocalStorage () {
      // insert check box
      const answers = JSON.parse(localStorage.getItem("selected-answers"))
      const index = answers.findIndex(ans => ans.qusId === this.selected_answer.qusId)
      if (index === -1) {
        answers.push(this.selected_answer)
      } else {
        answers[index].qusId = this.selected_answer.qusId
        answers[index].answer = this.selected_answer.answer
      }
      localStorage.setItem("selected-answers", JSON.stringify(answers))
    },
    jumpQus (onboarding) {
      this.isComplete = false
      localStorage.setItem("is-complete", this.isComplete)
      this.onboarding = onboarding
      this.isJump = JSON.parse(localStorage.getItem("jump-question"))
    },
    async sendAns (status) {
      const selectedAnswers = JSON.parse(localStorage.getItem("selected-answers"))
      const ansIndex = selectedAnswers.findIndex(ans => ans.answer === "")
      const checkboxIndex = selectedAnswers.findIndex(ans => ans.checkbox === true)
      const message = ansIndex === -1?
        checkboxIndex === -1? 
          '終了してよろしいですか' :
          'チャックした回答があります。本当に完了してよろしいでしょうか。' :
        '未回答ががあります。本当に完了してよろしいでしょうか。'
      if (status === 'send-click') {
        if (await this.$refs.confirm.open("完了", message, '', { color: "blue" })) {
          console.log("--yes");
          this.testFinish()
        }
        else {
          console.log("--no");
        }
      } else if (status === 'timeout') {
        this.testFinish()
      }
    },
    testFinish () {
      const answers = JSON.parse(localStorage.getItem("selected-answers"))
      console.log(answers)
      this.isComplete = false
      localStorage.removeItem("is-complete")
      localStorage.removeItem("selected-answers")
      localStorage.removeItem("onboarding")
      localStorage.removeItem("timer")
      this.$emit('testFinish', { part: 'part1' })
    },
    setCheckbox () {
      const selectedAnswers = JSON.parse(localStorage.getItem("selected-answers"))
      const index = selectedAnswers.findIndex(ans => ans.onboarding === this.onboarding)
      if ( index !== -1) {
        this.checkbox = selectedAnswers[index].checkbox
      } else {
        this.checkbox = false
      }
    },
    jumpComplete () {
      this.isComplete = true
      localStorage.setItem('is-complete', JSON.stringify(this.isComplete))
    },
    clickCheck () {
      const selectedAnswers = JSON.parse(localStorage.getItem("selected-answers"))
      const index = selectedAnswers.findIndex(ans => ans.onboarding === this.onboarding)
      if ( index !== -1) {
        selectedAnswers[index].checkbox = this.checkbox
      }
      localStorage.setItem("selected-answers", JSON.stringify(selectedAnswers))
    }
  },
}
</script>

<style scoped>
  .timer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .time {
    font-size: 30px;
  }
  .question {
    position: relative;
  }
  .timer-absolute {
    position: absolute;
    top: -30px;
    right: 0;
  }
  .checkbox {
    transform: scale(1.4);
  }
  .v-input--selection-controls__ripple {
    display: none;
  }
</style>