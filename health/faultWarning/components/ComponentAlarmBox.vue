<!--
*@Author：liuzumian
*@Date：2024/5/21  11:29
*@LastEditors：liuzumian
*@LastEditTime：2024/5/21  11:29
*@Description：
-->
<template>
  <div class="echarts-box">
    <div class="echarts-title-box">
      <TitleBox :title="title"></TitleBox>
      <TabBox :activeValue="activeValue" @tabClick="tabClick" :tabList="resource.runTrendTabList"></TabBox>
    </div>
    <div class="content-box">
      <!-- <div class="tabbar-box">
        <div class="tabbar-item" v-for="item in resource.tabbarList" :key="item.id" @click="clickTabbar(item.label)">
          <div class="tabbar-item-bg" :style="`background: ${item.color};`"></div>
          <div class="tabbar-item-text">{{item.label}}</div>
        </div>
      </div> -->
      <div class="list-box">
        <div class="list-item"  v-for="(item, index) in chartData" :key="item.id">
          <div class="list-left" :style="`width: ${item.lableWidth}`">
            <div class="number-box">
              {{index + 1}}
              <div class="number-box-bg" :style="`background: ${item.color};`"></div>
            </div>
            <div class="text-box" :style="`background: ${item.bgc};`">{{item.name}}</div>
          </div>
          <div class="list-right">
            <el-progress v-show="!clickTabbarList.includes('故障数量')" :text-inside="true" :stroke-width="15" :percentage="item.value/2.5" class="progress progress-one" >
              <span>{{ item.value }}个</span>
            </el-progress>
            <!-- <el-progress  v-show="!clickTabbarList.includes('占比')" :text-inside="true" :stroke-width="10" :percentage="item.percentage" class="progress progress-two" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TitleBox from './TitleBox.vue'
import TabBox from './TabBox.vue'
import { resource } from '../config'
const props = defineProps({
  title: {
    type: String,
    default: '风机预警数量TOP5'
  },
  chartData: {
    type: Array,
    default: []
  },
})
const activeValue = ref('1')
const clickTabbarList = ref([])
let legendLable = ref(['平均风速', '有功功率', '理论功率'])
let yAxisTitle = ref('风速(m/s)')
const tabClick = (value) => {
  if (value == 'windSpeed') {
    legendLable.value = ['平均风速', '有功功率', '理论功率']
    yAxisTitle.value = '风速(m/s)'
  } else {
    legendLable.value = ['幅照度', '有功功率', '理论功率']
    yAxisTitle.value = '幅照度(W/㎡)'
  }
  activeValue.value = value
}
const clickTabbar = (label) => {
  if (clickTabbarList.value.includes(label)) {
    clickTabbarList.value = clickTabbarList.value.filter((item) => item !== label)
  } else {
    clickTabbarList.value.push(label)
  }
}
</script>

<style lang="scss" scoped>
.echarts-box{
  height: 100%;
  display: flex;
  flex-direction: column;
  .echarts-title-box{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .content-box{
    flex: 1;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .tabbar-box{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 92px;
      .tabbar-item{
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        .tabbar-item-bg{
          width: 20px;
          height: 15px;
          background: rgba(251,100,0,0.8);
          border-radius: 2px 2px 2px 2px;
        }
        .tabbar-item-text{
          font-weight: 400;
          font-size: 14px;
          color: #FFFFFF;
        }
      }
    }
    .list-box{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 35px;
      .list-item{
        display: flex;
        align-items: center;
        .list-left{
          display: flex;
          align-items: center;
          position: relative;
          padding-left: 13px;
          .number-box{
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            .number-box-bg{
              z-index: -1;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(195, 84, 75, 1);
              transform: rotateZ(45deg);
            }
          }
          .text-box{
            padding: 4px 10px 4px 25px;
          }
        }
        .list-right{
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          .progress {
            :deep(.el-progress-bar__innerText){
              position: absolute;
              right: 0;
              top: 0;
              transform: translateX(150%);
            }
            :deep(.el-progress-bar__outer){
              background-color: rgba(134,134,135,0.28) !important;
            }
          }
          .progress-one{
            :deep(.el-progress-bar__inner){
              background: linear-gradient( 270deg, rgba(50,198,228,0.8) 0%, rgba(133,110,249,0.54) 100%);;
            }
          }
          .progress-two{
            :deep(.el-progress-bar__inner){
              background: linear-gradient( 270deg, rgba(50,198,228,0.8) 0%, rgba(133,110,249,0.54) 100%);
            }
          }
        }
      }


    }
  }
}
</style>
