<template>
  <div class="dS-bd">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dS-bd {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  height: 100%;
  width: 100%;
  
}
</style>
<style lang="scss">
.dS-bd {
  .el-date-editor.el-input {
    width: 100%;
  }

  .el-button--primary {
    width: 100%;
    background-color: #1c84c6;
  }

  .el-table .el-table__header-wrapper th {
  background-color: #f3f3f3;
}
}
</style>