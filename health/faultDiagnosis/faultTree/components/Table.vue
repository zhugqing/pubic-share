<template>
  <div class="body-table">
    <div style="height: calc(100% - 3rem); width: 100%">
      <el-auto-resizer>
        <template #default="{ height }">
          <el-table
            ref="multipleTableRef"
            :data="datas.tableData"
            stripe
            empty-text="暂无数据"
            :height="height"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              v-for="item in datas.tableHeader"
              :type="item?.type"
              :width="item.width || 'auto'"
              :key="item.key"
              :prop="item.key"
              align="center"
              :label="item.name"
            >
              <template #default="scope">
                <div v-if="item.type === 'index'">{{ scope.$index + 1 }}</div>
                <div v-else-if="item.key === 'alarmLevel'" :style="`color: ${alarmLevelColor(scope.row[item.key])};`">{{
                  scope.row[item.key]
                }}</div>
                <el-switch v-else-if="item.key === 'status'" v-model="scope.row[item.key]" />
                <div v-else-if="item.formatter" v-html="item.formatter(scope.row)"></div>
                <div v-else>{{ scope.row[item.key] }}</div>
              </template>
            </el-table-column>
            <el-table-column width="350" align="center" label="操作">
              <template #default="scope">
                <div v-if="scope.row.type !== 0">
                  <!-- <el-button size="small" type="success" @click="operateHandle('copy', scope.row)">复制</el-button>
                  <el-button size="small" @click="operateHandle('detail', scope.row)">详情</el-button> -->
                  <el-button size="small" @click="operateHandle('update', scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="operateHandle('delete', scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-auto-resizer>
    </div>
    <Pagination
      style="height: 3rem"
      v-if="datas.tableData.length !== 0"
      :total="datas.page.total"
      v-model:page="datas.page.index"
      v-model:limit="datas.page.size"
      @pagination="getTable"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { datas } from '../config/index'
import Pagination from '@/components/Pagination/index.vue'
const emit = defineEmits(['operateHandle', 'getTable'])
const multipleTableRef = ref<HTMLInputElement | null>(null)
const handleSelectionChange = (val) => {
  datas.multipleSelection = val
}
const operateHandle = (type, row) => {
  emit('operateHandle', type, row)
}
const getTable = (obj) => {
  datas.page.index = obj.page
  datas.page.size = obj.limit
  emit('getTable')
}
const alarmLevelColor = (v) => {
  let color = ''
  switch (v) {
    case '严重':
      color = '#F41B1B'
      break
    case '提示':
      color = '#FFAF10'
      break
    case '一般':
      color = '#FFED4D'
      break

    default:
      break
  }
  return color
}
watch(
  () => datas.tableData,
  () => {
    multipleTableRef.value!.clearSelection()
  }
)
</script>

<style lang="scss" scoped>
.body-table {
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  padding: 0 !important;
}
</style>
