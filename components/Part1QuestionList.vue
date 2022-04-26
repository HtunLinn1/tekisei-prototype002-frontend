<template>
  <v-container class="question" fluid>
    <div class="timer-absolute">
      <div class="timer">
        <div :class="parseInt(formatTime.min) < 1? 'less-time' : 'time'">
          残り時間：<span v-if="formatTime.min.length < 2">
                    {{ "0" + formatTime.min }}
                   </span>
                   <span v-else>
                    {{ formatTime.min }}
                   </span> : 
                   <span v-if="formatTime.sec.length < 2">
                    {{ "0" + formatTime.sec }}
                   </span>
                   <span v-else>
                    {{ formatTime.sec }}
                   </span>
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
        <v-card-title v-if="onboarding < 15" class="font-weight-black body-2">
          ①次の計算式の□に当てはまる数値を５択より選択してください。（１５問）
        </v-card-title>
        <v-card-title v-else-if="onboarding >= 15 && onboarding < 35 " class="font-weight-black body-2">
          ②次の文字列について法則性を見つけ出し、次にくる文字を５択より選択してください。（２０問）
        </v-card-title>
        <v-card-title v-else-if="onboarding >= 35 && onboarding < 55 " class="font-weight-black body-2">
          ③次の数列について法則性を見つけ出し、（ ）内にくる数字を５択より選択してください。（２０問）
        </v-card-title>
        <v-card-title v-else-if="onboarding >= 55 && onboarding < 70 " class="font-weight-black body-2">
          ④各列の左側の四つの図形は一定の法則に基づいて並んでいます。次にくる図形を５択より選択してください。（１５問）
        </v-card-title>
      </v-card>
      <span v-if="!isComplete" class="d-flex justify-space-between">
        <div class="font-weight-medium">
          {{ qusCount }}
        </div>
        <div class="font-weight-medium">
          {{ onboarding + 1 }} / {{ part1Qus.length }}
        </div>
      </span>
      <v-window v-model="onboarding" :touch="{ left : next, right: prev }">
        <v-window-item
          v-for="qus in part1Qus"
          :key="qus.id"
        >
          <Question v-if="!isComplete" :qus="qus" :onboarding="onboarding" @selectedAnswer="selectedAnswer($event)" />
        </v-window-item>
      </v-window>
      <CompleteForm v-if="isComplete" @jumpQus="jumpQus($event)" />
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
          color="red"
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
import { request } from 'http'
import questions from '@/assets/data/part1QuestionList.json'
import answersJson from '@/assets/data/part1AnswerList.json'
import UserRequest from '~/plugins/axios/request/request'
export default {
  data: () => ({
    part1Qus: questions,
    part1Answers: answersJson,
    onboarding: 0,
    // timer
    min: localStorage.getItem("timer")? Math.floor(JSON.parse(localStorage.getItem("timer")) / 60) : 55,
    sec: localStorage.getItem("timer")? JSON.parse(localStorage.getItem("timer")) % 60 : 0,
    timerObj: null,
    selected_answer: {},
    isComplete: false,
    // checkbox flag
    checkbox: false,
    isJump: false,
    qusCount: 1,
    qusType: 1
  }),
  computed: {
    // timer
    formatTime() {
      return {
        min: this.min.toString(),
        sec: this.sec.toString()
      }
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
    // is jump
    this.isJump = JSON.parse(localStorage.getItem("jump-question"))
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

      this.setNextQusCount()
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
        this.selected_answer.qusCount = this.qusCount
        this.selected_answer.qusType = this.qusType
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
        '未回答があります。本当に完了してよろしいでしょうか。'
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
      // calculate point
      this.calculatePoint()
      this.isComplete = false
      localStorage.removeItem("is-complete")
      localStorage.removeItem("onboarding")
      localStorage.removeItem("timer")
      this.$emit('testFinish', { part: 'part1' })
      localStorage.removeItem("selected-answers")

      UserRequest.userRequest(request, 'TEST-1 FINISH')
    },
    calculatePoint () {
      const selectedAnswers = JSON.parse(localStorage.getItem("selected-answers"))

      let correctAns1 = 0
      let mistakeAns1 = 0

      let correctAns2 = 0
      let mistakeAns2 = 0

      let correctAns3 = 0
      let mistakeAns3 = 0

      let correctAns4 = 0
      let mistakeAns4 = 0

      const choosedAnswersQus1 = []
      const choosedAnswersQus2 = []
      const choosedAnswersQus3 = []
      const choosedAnswersQus4 = []

      for (const answer of selectedAnswers) {
        // calculate correct and mistake
        const index = this.part1Answers.findIndex(ans => ans.qusId === answer.qusId)
        if (index !== -1 && this.part1Answers[index].answer === answer.answer && answer.qusType === 1) {
          correctAns1 = correctAns1 + 1
          answer.choosed_ans = '〇'
          choosedAnswersQus1.push(answer)
        } else if (index !== -1 && answer.answer !== "" && this.part1Answers[index].answer !== answer.answer && answer.qusType === 1) {
          mistakeAns1 = mistakeAns1 + 1
          answer.choosed_ans = '×'
          choosedAnswersQus1.push(answer)
        } else if (index !== -1 && answer.answer === "" && this.part1Answers[index].answer !== answer.answer && answer.qusType === 1) {
          answer.choosed_ans = '-'
          choosedAnswersQus1.push(answer)
        }

        if (index !== -1 && this.part1Answers[index].answer === answer.answer && answer.qusType === 2) {
          correctAns2 = correctAns2 + 1
          answer.choosed_ans = '〇'
          choosedAnswersQus2.push(answer)
        } else if (index !== -1 && answer.answer !== "" && this.part1Answers[index].answer !== answer.answer && answer.qusType === 2) {
          mistakeAns2 = mistakeAns2 + 1
          answer.choosed_ans = '×'
          choosedAnswersQus2.push(answer)
        } else if (index !== -1 && answer.answer === "" && this.part1Answers[index].answer !== answer.answer && answer.qusType === 2) {
          answer.choosed_ans = '-'
          choosedAnswersQus2.push(answer)
        }

        if (index !== -1 && this.part1Answers[index].answer === answer.answer && answer.qusType === 3) {
          correctAns3 = correctAns3 + 1
          answer.choosed_ans = '〇'
          choosedAnswersQus3.push(answer)
        } else if (index !== -1 && answer.answer !== "" && this.part1Answers[index].answer !== answer.answer && answer.qusType === 3) {
          mistakeAns3 = mistakeAns3 + 1
          answer.choosed_ans = '×'
          choosedAnswersQus3.push(answer)
        } else if (index !== -1 && answer.answer === "" && this.part1Answers[index].answer !== answer.answer && answer.qusType === 3) {
          answer.choosed_ans = '-'
          choosedAnswersQus3.push(answer)
        }

        if (index !== -1 && this.part1Answers[index].answer === answer.answer && answer.qusType === 4) {
          correctAns4 = correctAns4 + 1
          answer.choosed_ans = '〇'
          choosedAnswersQus4.push(answer)
        } else if (index !== -1 && answer.answer !== "" && this.part1Answers[index].answer !== answer.answer && answer.qusType === 4) {
          mistakeAns4 = mistakeAns4 + 1
          answer.choosed_ans = '×'
          choosedAnswersQus4.push(answer)
        } else if (index !== -1 && answer.answer === "" && this.part1Answers[index].answer !== answer.answer && answer.qusType === 4) {
          answer.choosed_ans = '-'
          choosedAnswersQus4.push(answer)
        }
      }
      const part1Result = [
        { qus_type: '第Ⅰ部-①', correct: correctAns1, mistake: mistakeAns1, choosed_answers: choosedAnswersQus1 },
        { qus_type: '第Ⅰ部-②', correct: correctAns2, mistake: mistakeAns2, choosed_answers: choosedAnswersQus2 },
        { qus_type: '第Ⅰ部-③', correct: correctAns3, mistake: mistakeAns3, choosed_answers: choosedAnswersQus3 },
        { qus_type: '第Ⅰ部-④', correct: correctAns4, mistake: mistakeAns4, choosed_answers: choosedAnswersQus4 }
      ]
      localStorage.setItem("results", JSON.stringify({ part1_result: part1Result, part2_result: '', it_result: '' }))
    },
    setCheckbox () {
      const selectedAnswers = JSON.parse(localStorage.getItem("selected-answers"))
      const index = selectedAnswers.findIndex(ans => ans.onboarding === this.onboarding)
      if ( index !== -1) {
        this.checkbox = selectedAnswers[index].checkbox
        this.qusCount = selectedAnswers[index].qusCount
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
    },
    setNextQusCount() {
      if (this.onboarding < 15) {
        this.qusType = 1
      } else if (this.onboarding >= 15 && this.onboarding < 35) {
        this.qusType = 2
      } else if (this.onboarding >= 35 && this.onboarding < 55) {
        this.qusType = 3
      } else if (this.onboarding >= 55) {
        this.qusType = 4
      }

      if (this.onboarding === 0) {
        this.qusCount = 0
      } else if (this.onboarding === 15) {
        this.qusCount = 0
      } else if (this.onboarding === 35) {
        this.qusCount = 0
      } else if (this.onboarding === 55) {
        this.qusCount = 0
      }
      this.qusCount = this.qusCount + 1
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
    font-size: 17px;
    font-weight: 200px;
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
  .less-time {
    color: red;
    font-size: 25px;
  }
</style>