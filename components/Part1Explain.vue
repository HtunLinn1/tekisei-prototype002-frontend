<template>
  <v-container>
    <v-row v-if="!isStartTest">
      <v-col>
        <v-carousel
          v-model="slide"
          cycle
          height="400"
          hide-delimiter-background
        >
          <template #prev="{ on, attrs }">
            <v-btn
              color="info"
              icon
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
              v-if="slide + 1 < slides.length"
              color="info"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-btn
              v-if="slide + 1 === slides.length"
              color="info"
              icon
              @click="startTest"
            >
              開始
            </v-btn>
          </template>
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-sheet
              :color="colors[i]"
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="text-h2">
                  {{ slide }} Slide
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row v-if="isStartTest" justify="center" align="center" class="pt-7">
      <v-col cols="12">
        <Part1QuestionList @testFinish="testFinish($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        slide: 0,
        isStartTest: false,
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
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