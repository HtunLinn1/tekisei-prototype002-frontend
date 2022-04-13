<template>
  <v-container fluid>
    <v-row
      v-if="!showQuestionList"
      class="d-flex justify-space-around mb-6"
    >
      <v-col>
        <v-btn color="primary" @click="showQuestionList = true">
          第I部
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary">
          第II部
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary">
          回答・採点
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else justify="center" align="center">
      <v-col cols="12">
        <QuestionList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TestTopPage',
  data() {
    return {
      showQuestionList: false
    }
  },
}
</script>