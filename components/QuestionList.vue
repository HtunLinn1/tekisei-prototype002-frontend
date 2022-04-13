<template>
  <v-container>
    <v-card
      color="white"
      flat
      tile
      height="420"
    >
      <v-card>
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
      <div v-if="onboarding + 1 <= part1Qus.length" class="text-right">
        {{ onboarding + 1 }} / {{ part1Qus.length }}
      </div>
      <v-window v-model="onboarding">
        <v-window-item
          v-for="qus in part1Qus"
          :key="qus.id"
        >
          <Question :qus="qus" :onboarding="onboarding" />
        </v-window-item>
      </v-window>

      <v-card-actions class="justify-space-between">
        <v-btn
          text
          @click="prev"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          text
          @click="next"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import questions from '@/assets/data/questionList.json'
export default {
  data: () => ({
      length: 3,
      part1Qus: questions,
      onboarding: 0,
  }),
  methods: {
      next() {
        this.onboarding = this.onboarding + 1 === this.part1Qus.length
            ? 0
            : this.onboarding + 1;
      },
      prev() {
        this.onboarding = this.onboarding - 1 < 0
            ? this.part1Qus.length - 1
            : this.onboarding - 1;
      },
  },
}
</script>