<template>
  <div>
    <v-card
      color="transparent"
      height="390"
    >
      <v-row
        class="fill-height"
        align="center"
        justify="center"
      >
        <v-card-text class="text-center" color="black">
          <div v-if="('qus_text' in qus)">
            <div class="d-flex justify-start mb-6">
              <span class="pr-3">
                {{ onboarding + 1 }}.
              </span>
              <p>
                {{ qus.qus_text }}
              </p>
            </div>
            <v-chip-group
              active-class="primary--text"
              column
              class="answer-btn"
            >
              <v-chip
                v-for="(ans, index) in qus.ans"
                :key="index"
                class="button"
              >
                {{ ans }}
              </v-chip>
            </v-chip-group>
          </div>
          <div v-else>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <div class="d-flex justify-start mb-6">
                  <span class="pt-2">
                    {{ onboarding + 1 }}.
                  </span>
                  <v-img
                    max-height="500"
                    :src="require(`../assets/images/${qus.url_qus}`)"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-img :src="require(`../assets/images/${qus.url_ans}`)" />
              </v-col>
            </v-row>
            <v-chip-group
              active-class="primary--text"
              column
              class="answer-btn"
            >
              <v-chip
                v-for="(ans, index) in 5"
                :key="index"
                class="button"
              >
                {{ ans }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-card-text>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionPage',
  props: {
    qus: {
      type: Object, default: null
    },
    onboarding: {
      type: Number, default: null
    }
  },
}
</script>

<style scoped>
.text {
  min-height: 180px;
  white-space: pre-wrap;
}
.answer-btn {
  max-width: 200px;
}
.button {
  min-width: 90%;
}
</style>