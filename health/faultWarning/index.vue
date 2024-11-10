<!--
 * @Author: ZhuGuangqiang
 * @Date: 2024-05-31 16:32:00
 * @LastEditors: zhuguangqiang zhuguangqiang@quant-cloud.com.cn
 * @LastEditTime: 2024-05-31 18:29:59
 * @Description: 故障预警
-->
<template>
  <div class="baseReport-container no-wrapper">
    <BaseLayout>
      <template #left-menus>
        <div class="left-container">
          <el-tree
            ref="treeRef"
            node-key="id"
            default-expand-all
            :data="datas.treeData"
            :props="defaultProps"
            @node-click="handleNodeClick"
            highlight-current
          />
        </div>
      </template>
      <template #content>
        <div class="wrapper">
          <!-- <TabMenuView :tabs="tabs" :treeType="treeType" /> -->
          <div class="wrapper-left">
            <!-- <Popover
              v-show="resource.mouseObj.show"
              :x="resource.mouseObj.x"
              :y="resource.mouseObj.y"
              :title="resource.mouseObj.title"
              :list="resource.mouseObj.list"
            ></Popover> -->
            <StatusList
              :statusList="resource.totalStatusList"
              :filterStatusArr="resource.filterStatusArr"
              @statusClick="statusClick"
            ></StatusList>
            <div class="component-box">
              <Matrix :type="props.type"></Matrix>
            </div>
          </div>
          <div class="wrapper-right">
            <div class="wrapper-right-item">
              <ComponentAlarm :title="`风机预警数量TOP5`" :chartData="resource.chartData"></ComponentAlarm>
            </div>
            <div class="wrapper-right-item">
              <ComponentAlarm :title="`部件预警数量TOP5`" :chartData="resource.chartData2"></ComponentAlarm>
            </div>
          </div>
        </div>
      </template>
    </BaseLayout>
    <!-- <transition name="el-fade-in" mode="out-in">
      <Popover
        v-show="resource.mouseObj.show"
        :x="resource.mouseObj.x"
        :y="resource.mouseObj.y"
        :title="resource.mouseObj.title"
        :list="resource.mouseObj.list"
      ></Popover>
    </transition> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, shallowRef, defineAsyncComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseLayout from '@/layouts/BaseLayout.vue'
import StatusList from './components/StatusList.vue'
import Matrix from './components/Matrix.vue'
import WindaarningNbs from './components/WindaarningNbs.vue'
import ComponentAlarm from './components/ComponentAlarmBox.vue'
import Popover from './components/popover.vue'
import { useTreeDataStore } from '@/store/modules/treeData'
import { resource } from './config/index'

const props = defineProps({
  type: {
    type: Number,
    default: 1
  }
})

const useTreeData = useTreeDataStore()
const route = useRoute()
const treeRef = ref(null)
const treeType = ref(1)
const treeData = computed(() => useTreeData.treeData)
const datas = reactive({
  treeData: [
    {
      label: '区域集控中心',
      type: 1,
      children: [
        { id: 1, label: '某风场1', type: 2 },
        { id: 2, label: '某风场2', type: 2 },
        { id: 3, label: '某风场3', type: 2 },
        { id: 4, label: '某风场4', type: 2 },
        { id: 5, label: '某风场5', type: 2 },
        { id: 6, label: '某光伏电站1', type: 2 },
        { id: 7, label: '某光伏电站2', type: 2 }
      ]
    }
  ]
})

const defaultProps = {
  children: 'children',
  label: 'label'
}
const handleNodeClick = (node) => {
  treeType.value = node.type
}
const statusClick = (statusObj) => {
  if (resource.filterStatusArr.includes(statusObj.status)) {
    resource.filterStatusArr = resource.filterStatusArr.filter((item) => item !== statusObj.status)
  } else {
    resource.filterStatusArr.push(statusObj.status)
  }
}
onMounted(() => {
  let treeId = route?.query?.treeId ? Number(route?.query?.treeId) : treeData.value[0].children[0].id
  let treeType = route?.query?.treeType ? Number(route?.query?.treeType) : treeData.value[0].children[0].type
  treeRef.value.setCurrentKey(treeId)
  handleNodeClick({ type: treeType })
})
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.baseReport-container {
  height: 100%;
  .left-container {
    @extend %scrollbar;
    height: 100%;
    width: 100%;
    background-color: var(--el-fill-color-bgBox);
    border-radius: 5px;
    .el-tree {
      height: 100%;
      --el-tree-bg-color: transparent;
    }
  }
  .wrapper {
    height: 100%;
    background-color: var(--el-fill-color-bgBox);
    padding: 10px;
    border-radius: 5px;
    display: flex;
    gap: 10px;
    .wrapper-left {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-right: 1px solid #678ffc;
      padding-right: 10px;
      /* border-right: 1px solid var(--el-fill-color-bgBox); */
      /* background-color: paleturquoise; */
      .component-box {
        overflow: auto;
        flex: 1;
        @extend %scrollbar;
      }
    }
    .wrapper-right {
      flex: 1;
      /* background-color: palevioletred; */
      display: flex;
      flex-direction: column;
      gap: 10px;
      .wrapper-right-item {
        flex: 1;
        /* background-color: pink; */
      }
    }
  }
}
</style>
