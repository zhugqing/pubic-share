<!--
*@Author：liuzumian
*@Date：2024/5/20  10:37
 * @LastEditors: zhuguangqiang zhuguangqiang@quant-cloud.com.cn
 * @LastEditTime: 2024-05-31 18:16:40
*@Description：
-->
<template>
  <div class="matrix-box" :class="props.type === 1 ? 'wind-farm-matrix' : 'photovoltaic-matrix'">
    <div
      class="matrix-item-box"
      v-for="(item, index) in matrixListFilter"
      :key="item.title"
      @click="mouseClick($event, item)"
      @mouseleave="mouseleave"
      @click.stop="jumpHandle(item)"
    >
      <div class="matrix-title">{{ item?.title }}</div>
      <div class="matrix-content">
        <template v-if="props.type === 1">
          <div class="matrix-content-left">
            <FanRotate :type-img="item.status" :color="resource.statusMapColor[item?.status]"></FanRotate>
          </div>
          <div class="matrix-content-right">
            <div style="padding-bottom: 25px;">
              <span>预警总数:</span>
              <span>{{ item?.alarmCount }}个</span>
            </div>
            <div>
              <span>严重:</span>
              <span>{{ item?.seriousMbs }}个</span>
            </div>
            <div>
              <span>一般:</span>
              <span>{{ item?.commonlyNbs }}个</span>
            </div>
            <div>
              <span>提示:</span>
              <span>{{ item?.promptNbs }}个</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="matrix-content-left">
            <Icon
              class="photovoltaic"
              size="35"
              :color="resource.statusMapColor[item?.status]"
              icon="svg-icon:photovoltaic"
            ></Icon>
          </div>
          <div class="matrix-content-right">
            <div>
              <span>{{ item?.conversion }}</span>
              <span>%</span>
            </div>
            <div>
              <span>{{ item?.power }}</span>
              <span>kW</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- <Popover
        v-show="resource.mouseObj.show"
        :x="resource.mouseObj.x"
        :y="resource.mouseObj.y"
        :title="resource.mouseObj.title"
        :list="resource.mouseObj.list"
      ></Popover> -->
      <Dialog
      v-model:dialogVisible="resource.dialogVisible"
      :dialogType="resource.dialogType"
      :dialogTitle="resource.dialogTitle"
      @search="search"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import FanRotate from './FanRotate.vue'
import Popover from './popover.vue'
import Dialog from './Dialog.vue'
import { resource } from '../config/index'
const props = defineProps({
  type: {
    type: Number,
    default: 1
  }
})
const matrixListFilter = computed(() => {
  if (!resource.filterStatusArr?.length) {
    return resource.matrixList
  } else {
    return resource.matrixList.filter((item) => resource.filterStatusArr.includes(item.status))
  }
})
const jumpHandle = (item) => {
  // router.push({
  //   path: '/monitoring/deviceMonitoring',
  //   query: {
  //     deviceId: item.id,
  //     treeType: props.type
  //   }
  // })
}
const mouseClick = (event, item) => {
  if (item.alarmCount == 0) return
  resource.dialogTitle = item.title
  resource.dialogType = 'detail'
  resource.dialogVisible = true
  console.log(event, item)
  resource.mouseObj = {
    ...resource.mouseObj,
    show: true,
    x: event.x,
    y: event.y,
    title: item?.title,
    list: [
      { label: props.type === 1 ? '风机型号' : '光伏型号', value: 'DEW-D2.0-87' },
      { label: '状态', value: resource.statusMapLabel[item.status] },
      { label: '风速', value: '10m/s' },
      { label: '有功功率', value: '78万kW' },
      { label: '理论功率', value: '80万kW' },
      { label: '出力率', value: '97.5%' },
      { label: '日发电量', value: '70万kW' }
    ]
  }
}
const mouseleave = () => {
  // resource.mouseObj.show = false
}
function search() {
}
</script>

<style lang="scss" scoped>
.matrix-box {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
  .matrix-item-box {
    position: relative;
    z-index: 100;
    cursor: pointer;
    width: 100%;
    height: 117px;
    background: linear-gradient(180deg, rgba(72, 170, 255, 0.2) 0%, rgba(126, 72, 255, 0.05) 100%);
    box-shadow: inset 0px 0px 16px 1px rgba(103, 158, 252, 0.2);
    border-radius: 5px 5px 5px 5px;
    border: 2px solid rgba(103, 158, 252, 0.3);
    display: flex;
    flex-direction: column;
    .matrix-title {
      height: 22%;
      background: linear-gradient(
        90deg,
        rgba(86, 114, 254, 0) 0%,
        rgba(103, 143, 252, 0.5) 50%,
        rgba(86, 114, 254, 0) 100%
      );
      border-radius: 5px 5px 0px 0px;
      font-family:
        Microsoft YaHei,
        Microsoft YaHei;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
    }
    .matrix-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      gap: 10px;
      .photovoltaic {
        width: 42px;
      }
      .matrix-content-left {
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
      }
      .matrix-content-right {
        min-width: 100px;
        max-width: 110px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-family:
          Microsoft YaHei,
          Microsoft YaHei;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 13px;
        }
      }
    }
  }
}
//.wind-farm-matrix{
//  grid-template-columns: repeat(8, 1fr);
//}
//.photovoltaic-matrix{
//  grid-template-columns: repeat(6, 1fr);
//}
</style>
