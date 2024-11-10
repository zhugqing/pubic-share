<!--
*@Author：liuzumian
*@Date：2024/5/21  16:43
*@LastEditors：liuzumian
*@LastEditTime：2024/5/21  16:43
*@Description：
-->
<template>
  <div class="tabBox">
    <div
      class="tabItem"
      v-for="item in props.tabList"
      :key="item.value"
      :class="{active: props.activeValue === item.value}"
      @click="tabClick(item.value)"
    >
      {{item.label}}
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['tabClick'])
const props = defineProps({
  tabList: {
    type: Array,
    default: [
      { label: '日', value: 'day' },
      { label: '月', value: 'month' },
      { label: '年', value: 'year' },
    ]
  },
  activeValue: {
    type: String,
    default: 'day'
  }
})
const tabClick = (value) => {
  emit('tabClick', value)
}
</script>

<style lang="scss" scoped>
.tabBox{
  display: flex;
  align-items: center;
  padding-right: 16px;
  .tabItem{
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    background: url("@/assets/images/monitoring/regional/indicatorsBg.png") no-repeat;
    background-size: 100% 100%;
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    cursor: pointer;
  }
  .active{
    background: url("@/assets/images/monitoring/regional/activeIndicatorsBg.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
