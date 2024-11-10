<!--
*@Author：liuzumian
*@Date：2024/5/17  11:13
 * @LastEditors: zhuguangqiang zhuguangqiang@quant-cloud.com.cn
 * @LastEditTime: 2024-05-31 17:47:08
*@Description：
-->
<template>
  <div class="status-list-container">
    <div
      class="status-item"
      v-for="item in props.statusList"
      :key="item.label"
      :style="`border: 1px solid ${statusMapColor[item.label] || '#26CC26'};`"
      @click="statusClick(item)"
    >
      <div class="status-radio" :style="`background: ${statusMapColor[item.label] || '#26CC26'};`">
        <div v-if="props.filterStatusArr.includes(item.status)" class="status-radio-check"></div>
        <!--        <Check v-if="props.filterStatusArr.includes(item.status)" style="width: 80%;height: 80%;font-weight: bolder" />-->
      </div>
      <div class="status-label">{{ item.label }}&nbsp;</div>

      <div class="status-value" :style="`color: ${statusMapColor[item.label] || '#26CC26'};`">
        <CountTo
          :startVal="0"
          :endVal="Number(item.value)"
          :duration="2000"
          :decimals="Number.isInteger(Number(item.value)) ? 0 : 2"
          :autoplay="true"
        /></div
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CountTo } from 'vue3-count-to'
const emit = defineEmits(['statusClick'])
const props = defineProps({
  statusList: {
    type: Array,
    default: []
  },
  filterStatusArr: {
    type: Array,
    default: []
  }
})
const statusMapColor = {
  严重: '#FF1D1D',
  一般: '#FF688C',
  提示: '#FF8800',
  绿色: '#26CC26',
}
const statusClick = (item) => {
  emit('statusClick', item)
}
</script>

<style lang="scss" scoped>
.status-list-container {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  .status-item {
    border-radius: 3px;
    height: 39px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    .status-radio {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .status-radio-check {
        width: 50%;
        height: 50%;
        border-radius: 50%;
        background-color: #fff;
      }
    }
    .status-label {
    }
    .status-value {
    }
  }
}
</style>
