<!--
*@Author： ZhuGuangqiang
*@Date：2024/5/23  14:17
*@LastEditors： ZhuGuangqiang
*@LastEditTime： 2024/5/23  14:17
*@Description：
-->
<template>
  <el-form inline ref="form" class="header-search" label-width="120px">
    <el-form-item label="故障关键字">
      <el-input v-model="datas.searchForm.alarmName" placeholder="请输入内容" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="search-form-queryBtn" :icon="Search" type="primary" @click="search" style="margin-left: 25px"
        >查询</el-button
      >
      <el-button
        class="search-form-addBtn"
        :icon="Plus"
        type="info"
        @click="operateHandle('add')"
        style="margin-left: 25px"
        >新增</el-button
      >
      <!-- <el-button
        class="search-form-addBtn"
        type="info"
        @click="operateHandle('add')"
        style="margin-left: 25px"
        >导出</el-button
      > -->
      <!--      <el-button :icon="Delete" type="danger" @click="operateHandle('deleteAll')" style="margin-left: 25px">批量删除</el-button>-->
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
