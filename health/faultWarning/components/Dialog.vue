<!--
*@Author：liuzumian
*@Date：2024/3/29  14:55
*@LastEditors：liuzumian
*@LastEditTime：2024/6/03  15:00:00
*@Description：
-->
<template>
  <el-dialog
    :title="props.dialogTitle"
    v-model="props.dialogVisible"
    width="40%"
    top="30vh"
    @opened="opened"
    :before-close="cancelHandle"
  >
    <div class="modelContentTop">
      <div>预警总数：100个</div>
      <div @click="confirm" class="confrimBtn">预警确认</div>
    </div>

    <Table @getTable="getTable" @operateHandle="operateHandle"></Table>
    <template #footer v-if="dialogType == 'confrim'">
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { addStationManage, editStationManage } from '@/api/systemManage/stationManage'
import Table from './Table.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const ruleFormRef = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['update:dialogVisible', 'search'])
import { resource } from '../config/index'
const props = defineProps({
  dialogType: {
    type: String,
    default: 'confirm'
  },
  dialogTitle: {
    type: String,
    default: '确定'
  },
  resource: {
    type: String,
    default: ''
  },
  dialogVisible: {
    type: Boolean,
    default: false
  }
})
watch(
  () => props.dialogVisible,
  (val) => {
    resource.dialogVisible = val
  }
)
function opened() {
  if (props.dialogType === 'add') {
    resetForm()
  }
}
function cancelHandle() {
  emit('update:dialogVisible', false)
}
function submitForm() {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      emit('search')
    }
  })
}
function resetForm() {
  ruleFormRef.value.resetFields()
}
const confirm = () => {
  router.push({
    path: `/alarm/realTimeAralrm`
  })
}
const operateHandle = (type, row) => {
}
async function getTable() {
}
onMounted(() => {})
</script>

<style lang="scss" scoped>
.el-dialog {
  .modelContentTop {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    cursor: pointer;
    .confrimBtn {
      width: 80px;
      height: 32px;
      background: linear-gradient( 134deg, rgba(72,170,255,0.2) 0%, rgba(126,72,255,0.05) 100%);
      border-radius: 5px 5px 5px 5px;
      border: 1px solid #678FFC;
      font-family: MicrosoftYaHei, MicrosoftYaHei;
      font-weight: normal;
      font-size: 12px;
      color: #678FFC;
      line-height: 32px;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
  }
  .base-info,
  .alarm-rules,
  .alarm-mode {
    width: 100%;
    .block-title {
      position: relative;
      width: 100%;
      height: 30px;
      padding-left: 30px;
      font-family:
        Microsoft YaHei,
        Microsoft YaHei;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      line-height: 15px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .block-title::before {
      content: '';
      position: absolute;
      top: 0;
      left: 20px;
      width: 3px;
      height: 16px;
      background: #ffffff;
      border-radius: 0px 0px 0px 0px;
    }
    .condition-box {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      .el-select,
      .el-input {
        width: 30%;
        padding-right: 20px;
      }
    }
    .condition-box2 {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      .custom-select {
        width: 13.5% !important;
        padding-left: 25px !important;
        padding-right: 10px !important;
      }
      .el-select,
      .el-input {
        width: 26%;
        padding-right: 20px;
      }
    }
  }
  .split-line {
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background: rgba(103, 143, 252, 0.23);
    border-radius: 0px 0px 0px 0px;
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
    .el-button {
      min-width: 320px;
      height: 40px;
    }
  }
}
</style>
