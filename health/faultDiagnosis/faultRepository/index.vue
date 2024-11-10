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
          <MainContent></MainContent>
        </div>
      </template>
    </BaseLayout>

  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, shallowRef, defineAsyncComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseLayout from '@/layouts/BaseLayout.vue'
import { useTreeDataStore } from '@/store/modules/treeData'
import MainContent from './components/MainContent.vue'
import { datas } from './config/index'

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
      label: '某风场1',
      type: 1,
      children: [
        { id: 1, label: '风场场站1', type: 2 },
        { id: 2, label: '风场场站2', type: 2 },
      ]
    },
    {
      label: '某风场2',
      type: 1,
      children: [
        { id: 1, label: '风场场站1', type: 2 },
        { id: 2, label: '风场场站2', type: 2 },
      ]
    },
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
  if (datas.filterStatusArr.includes(statusObj.status)) {
    datas.filterStatusArr = datas.filterStatusArr.filter((item) => item !== statusObj.status)
  } else {
    datas.filterStatusArr.push(statusObj.status)
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
