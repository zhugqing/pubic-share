<!--
*@Author： ZhuGuangqiang
*@Date：2024-06-04 16:59:59
*@LastEditors： ZhuGuangqiang
*@LastEditTime： 2024-06-04 16:59:59
*@Description：
-->
<template>
  <el-form inline ref="form" class="header-search" label-width="150px">
    <el-form-item label="机型：" prop="address">
      <el-select v-model="datas.ruleForm.eqmType" filterable placeholder="请选择机型">
        <el-option v-for="item in datas.eqmTypeOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="故障树名称：" prop="address">
      <el-select v-model="datas.ruleForm.eqmType" filterable placeholder="请选择故障树名称">
        <el-option v-for="item in datas.eqmTypeOptions2" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button class="search-form-queryBtn" :icon="Search" type="primary" @click="search" style="margin-left: 25px"
        >查询</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { Search, Plus, Delete } from '@element-plus/icons-vue'
import { datas } from '../config/index'
const emit = defineEmits(['search', 'operateHandle'])
const search = () => {
  emit('search')
}
const operateHandle = (type) => {
  emit('operateHandle', type)
}
</script>

<style lang="scss" scoped></style>
