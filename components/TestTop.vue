<template>
  <v-container fluid>
    <v-row
      v-if="!partOneQuestionList"
      class="d-flex justify-space-around mb-6"
    >
      <v-col>
        <v-btn color="primary" :disabled="isFinishPartOne" @click="clickPart('part1')">
          第I部
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary">
          第II部
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary">
          回答・採点
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else justify="center" align="center" class="pt-7">
      <v-col cols="12">
        <Part1QuestionList @testFinish="testFinish($event)" />
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
      isFinishPartOne: false
    }
  },
  mounted() {
    this.isFinishPartOne = JSON.parse(localStorage.getItem("isfinish-part-one"))
    if (localStorage.getItem("user-click-part") === 'part1') {
      this.partOneQuestionList = true
    }
  },
  methods: {
    clickPart(status) {
      if (status === 'part1') {
        this.partOneQuestionList = true
        localStorage.setItem("user-click-part", status)
        localStorage.setItem("isfinish-part-one", false)
      }
    },
    testFinish(status) {
      if (status.part === 'part1') {
        this.partOneQuestionList = false
        localStorage.setItem("user-click-part", '')
        this.isFinishPartOne = true
        localStorage.setItem("isfinish-part-one", JSON.stringify(this.isFinishPartOne))
      }
    }
  },
}
</script>