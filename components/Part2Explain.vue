<template>
  <v-container>
    <div v-if="!isStartTest" class="text-center">
      <v-row>
        <v-col class="text-h4">
          第Ⅱ部
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-h5">
          制限時間 ： 30分
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-h6">
          第Ⅱ部は計算に関する問題です。<br>
          そ各問題を解き、正しいと思う答を5択より選択し解答してください。
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Part2Explain',
  data() {
    return {
      isStartTest: false
    }
  },
}
</script>