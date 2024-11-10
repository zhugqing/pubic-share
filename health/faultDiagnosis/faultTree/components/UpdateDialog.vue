<template>
  <el-dialog
    :title="props.dialogTitle"
    v-model="props.dialogVisible"
    width="40%"
    @opened="opened"
    :before-close="cancelHandle"
    class="rules-manage-modal-style"
  >
    <el-form
      inline
      label-position="right"
      :model="datas.ruleForm"
      :rules="datas.rules"
      ref="ruleFormRef"
      label-width="150px"
      class="update-dialog-ruleForm"
    >
      <div class="base-info">
        <div class="block-title">基本信息</div>
        <el-form-item label="故障代码" :prop="dialogType == 'detail' ? '' : 'taskName'" style="width: 45%">
          <el-input
            v-model="datas.ruleForm.taskName"
            placeholder="请输入"
            :disabled="dialogType == 'detail'"
          ></el-input>
        </el-form-item>
        <el-form-item label="人员需求预计" :prop="dialogType == 'detail' ? '' : 'taskName'" style="width: 45%">
          <el-input
            v-model="datas.ruleForm.taskName"
            placeholder="请输入"
            :disabled="dialogType == 'detail'"
          ></el-input>
        </el-form-item>
        <el-form-item label="故障预计工时" :prop="dialogType == 'detail' ? '' : 'taskName'" style="width: 45%">
          <el-input
            v-model="datas.ruleForm.taskName"
            placeholder="请输入"
            :disabled="dialogType == 'detail'"
          ></el-input>
        </el-form-item>
        <el-form-item label="模型名称" :prop="dialogType == 'detail' ? '' : 'taskName'" style="width: 45%">
          <el-input
            v-model="datas.ruleForm.taskName"
            placeholder="请输入"
            :disabled="dialogType == 'detail'"
          ></el-input>
        </el-form-item>
      </div>
      <div class="alarm-mode">
        <el-form-item label="故障现象描述" :prop="dialogType == 'alarmLevel' ? '' : 'alarmDatas'" style="width: 100%">
          <el-input
            v-model="datas.ruleForm.alarmDatas"
            :autosize="{ minRows: 4, maxRows: 8 }"
            type="textarea"
            placeholder="请输入"
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="故障原因分析" :prop="dialogType == 'alarmLevel' ? '' : 'alarmDatas'" style="width: 100%">
          <el-input
            v-model="datas.ruleForm.alarmDatas"
            :autosize="{ minRows: 4, maxRows: 8 }"
            type="textarea"
            placeholder="请输入"
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
        <el-form-item label="建议解决方案" :prop="dialogType == 'alarmLevel' ? '' : 'alarmDatas'" style="width: 100%">
          <el-input
            v-model="datas.ruleForm.alarmDatas"
            :autosize="{ minRows: 4, maxRows: 8 }"
            type="textarea"
            placeholder="请输入"
            :disabled="dialogType == 'detail'"
          />
        </el-form-item>
      </div>
    </el-form>
    <template #footer v-if="dialogType != 'detail'">
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { addModelManage, editModelManage } from '@/api/systemManage/dictionaryManage/modelManage'
const ruleFormRef = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['update:dialogVisible', 'search'])
import { datas } from '../config/index'
const props = defineProps({
  dialogType: {
    type: String,
    default: 'add'
  },
  rowData: {
    type: Object,
    default: null
  },
  dialogTitle: {
    type: String,
    default: '新增'
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
    datas.dialogVisible = val
  }
)

interface TreeNode {
  id: number
  label: string
  children?: TreeNode[]
  level: number
}

const selectTree = ref([5])
const tree = ref()
const list = ref<TreeNode[]>([
  {
    id: 1,
    label: '某风场1',
    level: 0,
    children: [
      {
        id: 3,
        label: 'DEW-D2.0-87',
        level: 1,
        children: [
          {
            id: 4,
            label: '1#'
          },
          {
            id: 5,
            label: '2#'
          },
          {
            id: 6,
            label: '3#'
          },
          {
            id: 7,
            label: '4#'
          }
        ]
      },
      {
        id: 2,
        label: 'MySE3.6-135',
        level: 1,
        children: [
          {
            id: 8,
            label: '5#'
          },
          {
            id: 9,
            label: '6#'
          }
        ]
      }
    ]
  }
])
const symbolsList = ref([])
const selectRef = ref(null)
const treeRef = ref(null)

const defaultProps = {
  children: 'children',
  label: 'label'
}

const handleRemoveTag = () => {
  selectTree.value.splice(0, 1)
  const setlist = tree.value?.getCheckedNodes()
  setlist?.splice(0, 1)
  nextTick(() => {
    tree.value?.setCheckedNodes(setlist || [])
  })
}
const handleClearAll = () => {
  selectTree.value = []
  nextTick(() => {
    tree.value?.setCheckedNodes([])
  })
}
const handleNodeClick = () => {
  const checkedKeys = treeRef.value?.getCheckedKeys()
  const getLeafNodes = (nodes) => {
    const leafNodes = []

    const findLeafNodes = (nodes) => {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          findLeafNodes(node.children)
        } else {
          leafNodes.push(node)
        }
      })
    }

    findLeafNodes(nodes)

    return leafNodes
  }

  const leafNodes = getLeafNodes(list.value)
  const checkedNodes = leafNodes.filter((item) => checkedKeys.includes(item.id))

  if (checkedNodes) {
    selectTree.value = []
    datas.ruleForm.monitorObj = []
    checkedNodes.forEach((item: TreeNode) => {
      selectTree.value.push({ id: item.id, label: item.label })
      datas.ruleForm.monitorObj.push(item.label)
    })
  }
}
const confirm = () => {
  selectRef.value.blur()
}
const addCondition = () => {
  if (symbolsList.value.length < 3) {
    symbolsList.value.push({
      andOr: '1',
      testPoint: '',
      symbols: '',
      describe: ''
    })
  } else {
    ElMessage.error('最多添加3个')
  }
}

function opened() {
  switch (props.dialogType) {
    case 'add':
      resetForm()
      break
    case 'detail':
      // console.log(datas.ruleForm)
      break
    case 'update':
      break

    default:
      break
  }
}
function cancelHandle() {
  emit('update:dialogVisible', false)
}
function submitForm() {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      let res
      if (props.dialogType === 'add') {
        res = await addModelManage(datas.ruleForm)
      } else {
        res = await editModelManage(datas.ruleForm)
      }
      emit('update:dialogVisible', false)
      ElMessage({
        type: 'success',
        center: true,
        message: `${props.dialogType === 'add' ? '新增' : '编辑'}成功！`
      })
      emit('search')
    }
  })
}
function resetForm() {
  ruleFormRef.value.resetFields()
}
onMounted(() => {})
</script>

<style lang="scss" scoped>
.el-dialog {
  padding: 0 !important;
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
.tree-select-dropdown {
  padding: 0;
}
</style>
<style lang="scss">
/* .base-info,
.alarm-rules,
.alarm-mode {
  width: 100%; */
.el-scrollbar {
  .el-select-dropdown__wrap {
    .el-scrollbar__view {
      .el-select-dropdown__item {
        /* padding: 0 !important; */
        height: auto !important;
      }
    }
  }
}
.rules-manage-modal-style {
  .el-tag.is-closable {
    background: #678ffc !important;
  }
  .el-tag.el-tag--info {
    --el-tag-text-color: #fff !important;
  }
}
/* } */
</style>
