<!--
*@Author： ZhuGuangqiang
*@Date：2024/5/24  17:12:00
*@LastEditors：ZhuGuangqiang
*@LastEditTime：2024/6/03  15:00:00
*@Description：
-->
<template>
  <div class="body-table">
    <div style="height: 350px; width: 100%">
      <el-auto-resizer>
        <template #default="{ height }">
          <el-table
            ref="multipleTableRef"
            :data="resource.tableData"
            stripe
            empty-text="暂无数据"
            :height="height"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              v-for="item in resource.tableHeader"
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
                <div v-else-if="item.formatter" v-html="item.formatter(scope.row)"></div>
                <div v-else>{{ scope.row[item.key] }}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column width="350" align="center" label="操作">
              <template #default="scope">
                <div v-if="scope.row.type !== 0">
                  <el-button size="small" @click="operateHandle('detail', scope.row)">详情</el-button>
                  <el-button
                    :style="`min-width: 60px; ${scope.row.status == '已确认' ? 'border-color: #bbbec6; color: #bbbec6' : ''}`"
                    size="small"
                    @click="operateHandle('confirm', scope.row)"
                    :disabled="scope.row.status == '已确认'"
                    >{{ scope.row.status == '已确认' ? '已确认' : '确认' }}</el-button
                  >
                </div>
              </template>
            </el-table-column> -->
          </el-table>
        </template>
      </el-auto-resizer>
    </div>
    <!-- <Pagination
      style="height: 3rem"
      v-if="resource.tableData.length !== 0"
      :total="resource.page.total"
      v-model:page="resource.page.index"
      v-model:limit="resource.page.size"
      @pagination="getTable"
    /> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

import { resource } from '../config/index'
import { alarmLevelColor } from '../methods/index'
import Pagination from '@/components/Pagination/index.vue'

const emit = defineEmits(['operateHandle', 'getTable'])
const multipleTableRef = ref<HTMLInputElement | null>(null)

const handleSelectionChange = (val) => {
  resource.multipleSelection = val
}
const operateHandle = (type, row) => {
  emit('operateHandle', type, row)
}

const getTable = (obj) => {
  resource.page.index = obj.page
  resource.page.size = obj.limit
  emit('getTable')
}

watch(
  () => resource.tableData,
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
