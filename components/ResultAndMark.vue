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
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th>
                </th>
                <th class="font-weight-bold text-left text-h6">
                  正
                </th>
                <th class="font-weight-bold text-left text-h6">
                  誤
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="test in results.part1_result"
                :key="test.test_type"
              >
                <td class="font-weight-bold text-body-1 d-flex justify-center pt-2">
                  <div class="pt-1">{{ test.test_type }}</div>
                  <div class="text-center">
                    <v-menu 
                      offset-y
                      transition="slide-x-transition"
                      bottom
                      right
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>
                            mdi-menu-down
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(ans, index) in test.choosed_answers"
                          :key="index"
                        >
                          <v-list-item-title class="d-flex justify-space-around">
                            <span class="pr-5">
                              {{ ans.qusCount }}
                            </span>
                            {{ ans.choosed_ans }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </td>
                <td>{{ test.correct }}</td>
                <td>{{ test.mistake }}</td>
              </tr>
              <tr class="font-weight-bold text-body-1">
                <td class="text-center">計</td>
                <td>{{ totalCorrect }}</td>
                <td>{{ totalMistake }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
      result: ''
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

<style scoped>
  .v-list-item {
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 25px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
  }
</style>