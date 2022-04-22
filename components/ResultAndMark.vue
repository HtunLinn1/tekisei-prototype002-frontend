<template>
  <v-container>
    <v-card
      class="mx-auto"
    >
      <v-card-title class="font-weight-bold">適性検査結果</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>
                </th>
                <th class="font-weight-black text-left text-body-1">
                  正
                </th>
                <th class="font-weight-black text-left text-body-1">
                  誤
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="test in results.part1_result"
                :key="test.test_type"
              >
                <td class="font-weight-bold text-body-1">
                  <v-expansion-panels flat accordion>
                    <v-expansion-panel>
                      <v-expansion-panel-header>{{ test.test_type }}</v-expansion-panel-header>
                      <v-expansion-panel-content v-if="test.test_type === '第Ⅰ部-①'">
                        <div v-for="ans in test.choosed_answers" :key="ans.qusCount">
                          <span class="pr-5">{{ ans.qusCount }}</span>{{ ans.choosed_ans }}
                        </div>
                      </v-expansion-panel-content>
                      <v-expansion-panel-content v-if="test.test_type === '第Ⅰ部-②'">
                        <div v-for="ans in test.choosed_answers" :key="ans.qusCount">
                          <span class="pr-5">{{ ans.qusCount }}</span>{{ ans.choosed_ans }}
                        </div>
                      </v-expansion-panel-content>
                      <v-expansion-panel-content v-if="test.test_type === '第Ⅰ部-③'">
                        <div v-for="ans in test.choosed_answers" :key="ans.qusCount">
                          <span class="pr-5">{{ ans.qusCount }}</span>{{ ans.choosed_ans }}
                        </div>
                      </v-expansion-panel-content>
                      <v-expansion-panel-content v-if="test.test_type === '第Ⅰ部-④'">
                        <div v-for="ans in test.choosed_answers" :key="ans.qusCount">
                          <span class="pr-5">{{ ans.qusCount }}</span>{{ ans.choosed_ans }}
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
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
  </v-container>
</template>

<script>
export default {
  name: "ResultAndMarkPage",
  data() {
    return {
      results: '',
      totalCorrect: 0,
      totalMistake: 0
    }
  },
  mounted() {
    this.results = JSON.parse(localStorage.getItem("results"))
    // total result
    this.totalCorrect = this.results.part1_result.reduce((a, b) => a + b.correct, 0);
    this.totalMistake = this.results.part1_result.reduce((a, b) => a + b.mistake, 0);
  }
}
</script>