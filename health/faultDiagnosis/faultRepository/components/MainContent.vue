<!--
*@Author： ZhuGuangqiang
*@Date：2024/5/23  14:17
 * @LastEditors: weiquanzhu
 * @LastEditTime: 2024-05-23 16:12:27
*@Description： 告警规则管理
-->
<template>
  <div class="template-table-container">
    <SearchForm @operateHandle="operateHandle" @search="search" />
    <Table @getTable="getTable" @operateHandle="operateHandle"></Table>
    <UpdateDialog
      ref="indicatorDialogRef"
      v-model:dialogVisible="datas.dialogVisible"
      :dialogType="datas.dialogType"
      :dialogTitle="datas.dialogTitle"
      :rowData="datas.ruleForm"
      @search="search"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import SearchForm from './SearchForm.vue'
import Table from './Table.vue'
import UpdateDialog from './UpdateDialog.vue'
import { getFanStatusManagePage, deleteFanStatusManage } from '@/api/systemManage/dictionaryManage/fanStatusManage'
import { getAlarmRulesManagePage } from '@/api/alarm/rulesManage'
const indicatorDialogRef = ref<HTMLInputElement | null>(null)
const multipleTableRef = ref<HTMLInputElement | null>(null)
import { datas } from '../config/index'
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
    case 'update':
      datas.dialogTitle = '编辑'
      datas.ruleForm = JSON.parse(JSON.stringify(row))
      datas.dialogVisible = true
      break
    case 'delete':
      deleteHandle([row.id])
      break
    case 'deleteAll':
      if (!datas.multipleSelection?.length) {
        ElMessage({
          type: 'warning',
          center: true,
          message: `请至少选择一条数据进行删除！`
        })
      }
      break
  }
}
async function deleteHandle(arr) {
  const confirmRes = await ElMessageBox.confirm('此操作将删除数据, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {})
  if (confirmRes !== 'confirm') return
  const res = await deleteFanStatusManage(arr)
  ElMessage({
    type: 'success',
    center: true,
    message: `删除成功！`
  })
  search()
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
}
</style>
