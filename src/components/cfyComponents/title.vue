<template>
  <div class="title clearfix">
    <div class="line-wrapper">
      <div class="line line-one"></div>
      <div class="line line-two"></div>
    </div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: ["title"]
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables";

.title {

  .line-wrapper {
    float: left;
    height: 100%;
    width: 20px;
    padding-top: 5px;

    .line {
      float: left;
      height: 24px;
      margin-right: 2px;
      background-color: $blue;

      &.line-one {
        width: 4px;
      }

      &.line-two {
        width: 2px;
      }
    }
  }

  h1 {
    float: left;
    margin: 0;
    font-size: 24px;
  }
}
</style>
