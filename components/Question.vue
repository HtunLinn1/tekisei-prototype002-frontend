<template>
  <v-card>
    <v-row justify="center" align="center" class="fill-height pt-5">
      <v-card-text class="text-center" justify="center" align="center">
        <v-row v-if="'qus_text' in qus" class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-body-1 text-sm-h5"
          >
            <span class="pr-4">{{ onboarding + 1 }}.</span> {{ qus.qus_text }}
          </v-col>
          <div v-for="(ans, i) in qus.ans" :key="i" class="text-body-1 text-sm-h5 ml-8">
            ({{ i + 1 }})&nbsp;<br>
            {{ ans }}
          </div><br>
        </v-row>
        <v-row v-else>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <div class="d-flex justify-start">
              <span class="pt-2 text-sm-h5">
                {{ onboarding + 1 }}.
              </span>
              <span>
                <v-img :src="require(`~/assets/images/${qus.url_qus}`)" />
              </span>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <v-img :src="require(`~/assets/images/${qus.url_ans}`)" />
          </v-col>
        </v-row><v-row><v-col></v-col></v-row>
        <v-chip-group v-model="selection" active-class="primary--text " column class="answer-btn">
          <v-chip
            v-for="(ans, i) in qus.ans"
            :key="i"
            :value="ans"
            class="button"
            pill
          >
          <div v-if="'qus_text' in qus">({{ i + 1 }})&nbsp;{{ qus.ans[i] }}</div>
          <div v-else>({{ i + 1 }})</div>
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-row>
  </v-card>
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
  data() {
    return {
      selection: ''
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