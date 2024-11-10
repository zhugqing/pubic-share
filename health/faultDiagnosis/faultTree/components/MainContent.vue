<!--
*@Author： ZhuGuangqiang
*@Date：2024/6/4  10:00:00
 * @LastEditors: ZhuGuangqiang
 * @LastEditTime: 2024-06-04 16:59:59
*@Description：
-->
<template>
  <div class="template-table-container">
    <div class="content-top">
      <SearchForm @operateHandle="operateHandle" @search="search" />
      <el-button class="search-form-queryBtn"  type="primary" @click="faultTreeBDetail" style="margin-left: 25px"
        >故障树编制</el-button
      >
    </div>
    <tree container="treeModel" :treeData="datas.alarmTreeDatas"></tree>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from 'vue'
import SearchForm from './SearchForm.vue'
import Tree from "./tree-huo.vue";
import { getAlarmRulesManagePage } from '@/api/alarm/rulesManage'
import { datas } from '../config/index'
const emit = defineEmits(['faultTreeBDetail'])
function search() {
  datas.page = {
    index: 1,
    size: 20,
    total: 0
  }
  // getTable()
}
async function getTable() {
  const queryObj = {
    current: datas.page.index,
    data: {
      nameLike: datas.searchForm.nameLike,
      type: datas.searchForm.type,
      updateTimeStart: datas.searchForm.dateRange?.length ? datas.searchForm.dateRange[0] : '',
      updateTimeEnd: datas.searchForm.dateRange?.length ? datas.searchForm.dateRange[1] : ''
    },
    size: datas.page.size
  }
  const res = await getAlarmRulesManagePage(queryObj)
  datas.tableData = res.data?.records ?? []
  datas.page.total = res.data?.total ?? res.data?.records?.length
}
function operateHandle(type, row) {
  datas.dialogType = type
  switch (type) {
    case 'add':
      datas.dialogVisible = true
      datas.dialogTitle = '新增'
      for (let key in datas.ruleForm) {
        datas.ruleForm[key] = ''
      }
      break
    case 'detail':
      datas.dialogTitle = '详情'
      datas.ruleForm.taskName = '任务1'
      datas.ruleForm.monitorObj = ['11#', '12#']
      // datas.ruleForm = JSON.parse(JSON.stringify(row))
      datas.dialogVisible = true
      break
  }
}

const faultTreeBDetail = () => {
  emit('faultTreeBDetail')
}
onMounted(() => {
  // getTable()
})
</script>

<style lang="scss" scoped>
.template-table-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  .content-top {
    display: flex;
    justify-content: space-between;
  }
}
</style>
