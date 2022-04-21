<template>
  <v-container fluid>
    <v-row
      v-if="!partOneQuestionList && !partTwoQuestionList"
      class="d-flex justify-space-around mb-6"
    >
      <v-col>
        <v-btn color="primary" :disabled="isFinishPartOne" @click="clickPart('part1')">
          第I部
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary" :disabled="isFinishPartTwo" @click="clickPart('part2')">
          第II部
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary" :disabled="isFinishIT" @click="clickPart('part2')">
          ITテスト
        </v-btn>
      </v-col>
      <v-col>
        <v-btn :disabled="isFinishResult" color="primary">
          回答・採点
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="partOneQuestionList" justify="center" align="center">
      <v-col cols="12">
        <Part1Explain @testFinish="testFinish($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TestTopPage",
  data() {
    return {
      partOneQuestionList: false,
      isFinishPartOne: false,

      partTwoQuestionList: false,
      isFinishPartTwo: true,

      ITQuestionList: false,
      isFinishIT: true,

      showResult: false,
      isFinishResult: false
    }
  },
  mounted() {
    this.isFinishPartOne = localStorage.getItem("isfinish-part-one") === null? false : JSON.parse(localStorage.getItem("isfinish-part-one"))

    this.isFinishPartTwo = localStorage.getItem("isfinish-part-two") === null? true : JSON.parse(localStorage.getItem("isfinish-part-two"))
    if (localStorage.getItem("user-click-part") === 'part1') {
      this.partOneQuestionList = true
    } else if (localStorage.getItem("user-click-part") === 'part2') {
      this.partTwoQuestionList = true
    }
    console.log(this.isFinishPartTwo)
  },
  methods: {
    clickPart(status) {
      if (status === 'part1') {
        this.partOneQuestionList = true
        localStorage.setItem("user-click-part", status)
        localStorage.setItem("isfinish-part-one", false)
      } else if (status === 'part2') {
        this.partTwoQuestionList = true
        localStorage.setItem("user-click-part", status)
        localStorage.setItem("isfinish-part-two", false)
      }
    },
    testFinish(status) {
      if (status.part === 'part1') {
        this.partOneQuestionList = false
        this.isFinishPartOne = true
        localStorage.setItem("isfinish-part-one", JSON.stringify(this.isFinishPartOne))
        localStorage.removeItem("user-click-part")

        this.isFinishPartTwo = false
        localStorage.setItem("isfinish-part-two", false)
      }
    }
  },
}
</script>