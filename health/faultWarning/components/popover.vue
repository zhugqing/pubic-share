<!--
*@Author：liuzumian
*@Date：2024/5/20  18:53
*@LastEditors：liuzumian
*@LastEditTime：2024/5/20  18:53
*@Description：
-->
<template>
  <!--      弹窗内容-->
  <div class="popoverBox" :class="`popoverBox${direction}`" :style="{left: x + 'px', top: y + 'px'}">
    <div class="triangleBox">
      <div class="triangle" :class="direction"></div>
    </div>
    <div class="contentBox">
      <!-- <el-dialog title="收货地址" v-model="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </el-dialog> -->
      <div class="popoverTitle">{{ props.title }}
        <el-icon>
          <CircleClose  @click="closeClick"/>
        </el-icon>
      </div>
      <div class="popoverLine"></div>
      <div class="popoverListBox">
        <div class="popoverContentTop">
          <div>预警总数：100个</div>
          <div @click="confirm" style="cursor: pointer;" class="confrimBtn">预警确认 >></div>
        </div>
        <el-table
          :data="gridData"
          style="width: 100%">
          <el-table-column
            prop="partName"
            label="部件名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="modleNmae"
            label="模型名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="markPoint"
            label="标签点"
            width="250">
          </el-table-column>
          <el-table-column
            prop="dataValue"
            label="数值"
            width="150">
          </el-table-column>
          <el-table-column
            prop="warningLevel"
            label="预警等级"
            width="150">
          </el-table-column>
        </el-table>
        <!-- <div class="popoverItemBox" v-for="item in props.list" :key="item.label">
          <span>{{ item?.[props.label] }}:</span>
          <span>{{ item?.[props.value] }}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CircleClose } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { resource } from '../config'
const props = defineProps({
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: 'title'
  },
  list: {
    type: Array,
    default: [
      { label: '风机型号', value: ''},
      { label: '状态', value: ''},
      { label: '风速', value: ''},
      { label: '有功功率', value: ''},
      { label: '理论功率', value: ''},
      { label: '出力率', value: ''},
      { label: '日发电量', value: ''},
    ]
  },
  label: {
    type: String,
    default: 'label'
  },
  value: {
    type: String,
    default: 'value'
  },
})
const direction = computed(() => {
  if ((document.documentElement.clientHeight - props.y) < 300) {
    return 'bottom'
  } else {
    return 'top'
  }
})
const dialogTableVisible = ref(true)
const gridData = ref([
        {
          partName: '发电机',
          modleNmae: '发电机绕组U温度异常',
          markPoint: '发电机定子绕组U温度1秒平均值',
          dataValue: '',
          warningLevel: '严重',
        },
        {
          partName: '变桨系统',
          modleNmae: '',
          markPoint: '',
          dataValue: '',
          warningLevel: '',
        },
        {
          partName: '齿轮箱',
          modleNmae: '',
          markPoint: '',
          dataValue: '',
          warningLevel: '',
        },
      ])
const closeClick = () => {
  resource.mouseObj.show = false
}
const confirm = () => {
  router.push({
    path: `/alarm/realTimeAralrm`
  })
}
</script>

<style lang="scss" scoped>
.popoverBox{
  position: fixed;
  z-index: 10000;
  width: 900px;
  // pointer-events: none;
  transform: translateX(-50%);
  .triangleBox{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .triangle{
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid rgba(71,95,186,0.87);
  }
  .top{
    top: -20px;
  }
  .bottom{
    bottom: -20px;
    transform: rotateZ(180deg);
    transform-origin: 50% 50%;
  }
  .contentBox{
    background: linear-gradient( 180deg, rgba(71,95,186,0.87) 0%, rgba(24,27,94,0.91) 100%);
    border: 1px solid rgba(103,143,252,0.59);
    .popoverTitle{
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-size: 16px;
    }
    .popoverLine{
      height: 2px;
      width: 100%;
      background: linear-gradient( 65deg, rgba(49,35,123,0) 0%, #31237B 50%, rgba(64,47,157,0) 100%);
    }
    .popoverListBox{
      padding: 10px 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-size: 14px;
      .popoverContentTop {
        display: flex;
        justify-content: space-between;
        .confrimBtn {
          background: linear-gradient( 134deg, rgba(72,170,255,0.2) 0%, rgba(126,72,255,0.05) 100%);
          border-radius: 5px 5px 5px 5px;
          border: 1px solid #678FFC;
          font-family: MicrosoftYaHei, MicrosoftYaHei;
          font-weight: normal;
          font-size: 14px;
          color: #678FFC;
          line-height: 20px;
          text-align: right;
          font-style: normal;
          text-transform: none;
        }
      }
      .popoverItemBox{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
.popoverBoxbottom{
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column-reverse;
}
</style>
