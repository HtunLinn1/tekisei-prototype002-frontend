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

      <v-card-actions class="justify-space-between">
        <v-btn
          text
          :disabled="isComplete"
          @click="prev"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          v-if="onboarding + 1 < part1Qus.length && !isComplete"
          text
          @click="next"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn
          v-if="onboarding + 1 === part1Qus.length && !isComplete"
          color="primary"
          @click="next"
        >
          完了
        </v-btn>
        <v-btn
          v-if="isComplete"
          color="primary"
          @click="sendAns"
        >
          送信
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import questions from '@/assets/data/questionList.json'
export default {
  data: () => ({
    part1Qus: questions,
    onboarding: 0,
    // timer
    min: localStorage.getItem("timer-min")? localStorage.getItem("timer-min") : 59,
    sec: localStorage.getItem("timer-sec")? localStorage.getItem("timer-sec") : 0,
    timerObj: null,
    selected_answer: {},
    isComplete: false
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
  updated() {
    localStorage.setItem("timer-min", this.min)
    localStorage.setItem("timer-sec", this.sec)
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
      this.sendAns()
    },
    selectedAnswer (answer) {
      this.selected_answer = answer
    },
    // slide
    next() {
      if (this.onboarding  === this.part1Qus.length - 1) {
        this.isComplete = true
      }

      this.onboarding = this.onboarding + 1 === this.part1Qus.length
        ? this.part1Qus.length
        : this.onboarding + 1;

      this.setLocalStorage()
    },
    prev() {
      this.onboarding = this.onboarding - 1 < 0
        ? 0
        : this.onboarding - 1;
      this.isComplete = false
    },
    setLocalStorage () {
      const answers = JSON.parse(localStorage.getItem("selected-answers"))
      const index = answers.findIndex(ans => ans.qusId === this.selected_answer.qusId)
      if (index === -1) {
        answers.push(this.selected_answer)
      } else {
        answers[index].qusId = this.selected_answer.qusId
        answers[index].answer = this.selected_answer.answer
        answers[index].checkbox = this.selected_answer.checkbox
      }
      localStorage.setItem("selected-answers", JSON.stringify(answers))
    },
    jumpQus (onboarding) {
      this.isComplete = false
      this.onboarding = onboarding
    },
    sendAns () {
      const answers = JSON.parse(localStorage.getItem("selected-answers"))
      console.log(answers)
      this.isComplete = false
      this.$emit('testFinish', { part: 'part1' })
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
</style>