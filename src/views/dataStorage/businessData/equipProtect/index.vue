<template>
  <div class="equip-protect">
    <common-title :title="title"/>
  </div>
</template>

<script>
import CommonTitle from '@/components/cfyComponents/title';
export default {
  name: 'EquipProtect',
  components: {
    CommonTitle
  },
  data () {
    return {
      title: '装备维保'
    }
  }
};
</script>

<style>

</style>