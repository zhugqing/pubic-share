<!--
*@Author：liuzumian
*@Date：2024/5/21  16:40
*@LastEditors：liuzumian
*@LastEditTime：2024/5/21  16:40
*@Description：
-->
<template>
  <div class="titleBox">{{props.title}}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
})
</script>

<style lang="scss" scoped>
.titleBox{
  width: 255px;
  height: 32px;
  background: linear-gradient( 90deg, rgba(72,170,255,0.68) 0%, rgba(64,47,157,0.24) 100%);
  display: flex;
  align-items: center;
  padding-left: 24px;
}
</style>
