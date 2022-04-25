<template>
  <v-container>
    <v-card
      class="mx-auto"
    >
      <v-card-title class="font-weight-bold">適性検査結果</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-simple-table style="max-width: 200px;">
          <template #default>
            <tbody>
              <tr>
                <td class="font-weight-bold text-body-1">得点</td>
                <td class="font-weight-bold">{{ totalScore }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold text-body-1">評価</td>
                <td class="font-weight-bold">{{ result }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-data-table
          :headers="resultHeaders"
          :items="choosed_answers"
          :expanded.sync="expanded"
          item-key="test_type"
          single-expand
          show-expand
          class="elevation-1"
          hide-default-footer
          mobile-breakpoint="0"
          @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
        >
          <template #[`item.data-table-expand`]="{ item, isExpanded }">
            <td v-if="'choosed_answers' in item" class="text-end">
              <v-btn
                icon
                class="v-data-table__expand-icon"
                :class="{'v-data-table__expand-icon--active' : isExpanded}"
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </td>
          </template>
          <template #expanded-item="{ headers, item }">
            <td v-if="'choosed_answers' in item" :colspan="headers.length">
              <table>
                <tr v-for="(ans, index) in item.choosed_answers" :key="index">
                  <td class="pr-5 pl-16">
                    {{ ans.qusCount }}
                  </td>
                  <td>
                    {{ ans.choosed_ans }}
                  </td>
                </tr>
              </table>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-row class="pt-5 text-center">
      <v-col>
        <v-btn
          depressed
          color="primary"
          @click="homePage"
        >
          ホームページ
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ResultAndMarkPage",
  data() {
    return {
      results: '',
      totalCorrect: 0,
      totalMistake: 0,
      totalScore: 0.0,
      result: '',
      choosed_answers: [],

      expanded: [],
      singleExpand: false,
      resultHeaders: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'test_type',
        },
        { text: '正', value: 'correct', sortable: false },
        { text: '誤', value: 'mistake', sortable: false },
      ]
    }
  },
  mounted() {
    this.caculateScore()
  },
  methods: {
    caculateScore() {
      this.results = JSON.parse(localStorage.getItem("results"))
      // total result
      this.totalCorrect = this.results.part1_result.reduce((a, b) => a + b.correct, 0);
      this.totalMistake = this.results.part1_result.reduce((a, b) => a + b.mistake, 0);

      const totalCorrectMistake = { test_type: '計', correct: this.totalCorrect, mistake: this.totalMistake }

      this.choosed_answers = this.results.part1_result
      this.choosed_answers.push(totalCorrectMistake)
      
      this.totalScore = this.totalCorrect - this.totalMistake * 0.25

      if (this.totalScore >= 71.0) {
        this.result = "S" 
      }
      // 61点以上はA評価
      else if (this.totalScore >= 61.0) {
        this.result = "A" 
      }
      // 51点以上はB評価
      else if (this.totalScore >= 51.0) {
        this.result = "B" 
      }
      // 36点以上はC評価
      else if (this.totalScore >= 36.0) {
        this.result = "C" 
      }
      // それ以下はD評価
      else {
        this.result = "D"
      }
    },
    homePage () {
      this.$emit("toHomeFromResult", { part: 'result' } )
    }
  },
}
</script>

<style>
.v-data-table .v-data-table-header tr th {
  font-size: 18px !important;
}

.v-data-table .v-data-table-item tr td {
  font-size: 18px !important;
}

td {
  font-size: 17px !important;
}
</style>
