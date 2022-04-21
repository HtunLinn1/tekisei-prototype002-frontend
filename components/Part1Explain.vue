<template>
  <v-container>
    <div v-if="!isStartTest" class="text-center">
      <v-row>
        <v-col class="text-h4">
          第Ⅰ部
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-h5">
          制限時間 ： 25分
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-h6">
          第Ⅰ部には以下のような4種類の問題があります。<br>
          それぞれの問題について5択より選択し解答してください。
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-carousel
            v-model="slide"
            cycle
            height="400"
            interval="30000"
            hide-delimiter-background
          >
            <template #prev="{ on, attrs }">
              <v-btn
                color="blue"
                icon
                large
                :disabled="slide === 0"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
            </template>
            <template #next="{ on, attrs }">
              <v-btn
                color="blue"
                icon
                large
                :disabled="slide + 1 === questionList.length"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
            </template>
            <v-carousel-item
              v-for="(qus, i) in questionList"
              :key="i"
            >
              <v-sheet
                height="100%"
              >
                <v-row v-if="'question_description' in qus">
                  <v-col class="text-body1">
                    {{ i + 1 }}.{{ qus.question_description }}
                  </v-col>
                </v-row>
                <v-row v-if="'question' in qus">
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    class="text-h6"
                  >
                    {{ qus.question }}
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    class="text-body1"
                  >
                    <v-row class="text-h6 ml-8">
                      <v-col v-for="(ans, index) in qus.answer" :key="index">
                        ({{ index + 1 }})&nbsp;<br>
                        {{ ans }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row v-if="'question_img' in qus">
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-img :src="require(`~/assets/images/${qus.question_img}`)" />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-img :src="require(`~/assets/images/${qus.answer_img}`)" />
                  </v-col>
                </v-row>
                <v-row v-if="'start_btn' in qus">
                  <v-col>
                   <v-row class="text-body2">
                      <v-col>
                      {{ qus.start_description1 }}
                      </v-col>
                    </v-row> 
                   <v-row class="text-body2" style="white-space: pre-line; color: red;">
                      <v-col>
                      {{ qus.start_description2 }}
                      </v-col>
                    </v-row> 
                    <v-row>
                      <v-col>
                      <v-btn
                        color="primary"
                        large
                        @click="startTest"
                      >
                        開始
                      </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-body2">
                    {{ qus.answer_description }}
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </div>
    <v-row v-if="isStartTest" justify="center" align="center" class="pt-7">
      <v-col cols="12">
        <Part1QuestionList @testFinish="testFinish($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import questions from '@/assets/data/part1Explain.json'
export default {
  data () {
    return {
      questionList: questions,
      slide: 0,
      isStartTest: false,
    }
  },
  created() {
    this.isStartTest = localStorage.getItem("is-start-test")
  },
  methods: {
    startTest () {
      this.isStartTest = true
      localStorage.setItem("is-start-test", this.isStartTest)
    },
    testFinish(status) {
      localStorage.removeItem("is-start-test")
      this.$emit('testFinish', { part: status.part })
    }
  },
}
</script>