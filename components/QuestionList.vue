<template>
  <v-container>
    <v-card
      color="white"
      flat
      tile
      height="420"
    >
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