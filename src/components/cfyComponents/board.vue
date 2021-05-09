<template>
  <div class="board">
    <slot/>
  </div>
</template>

<script>
export default {
 name: 'Board'
}
</script>

<style lang="scss" scoped>
.board {
  margin-top: 20px;
  padding: 20px;
  min-height: 700px;
  background-color:#F8F8F8;
  border: 1px solid #ddd;
}
</style>