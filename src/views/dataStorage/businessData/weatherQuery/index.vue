<template>
  <div class="doc-data">
    <common-title :title="title"/>
  </div>
</template>

<script>
import CommonTitle from '@/components/cfyComponents/title';
export default {
  name: 'weatherQuery',
  components: {
    CommonTitle
  },
  data () {
    return {
      title: '天气答询'
    }
  }
};
</script>

<style></style>
