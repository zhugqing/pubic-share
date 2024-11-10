<!--
*@Author：liuzumian
*@Date：2024/5/21  11:29
 * @LastEditors: zhuguangqiang zhuguangqiang@quant-cloud.com.cn
 * @LastEditTime: 2024-05-31 16:41:09
*@Description：
-->
<template>
  <div class="echarts-box">
    <div class="echarts-title-box">
      <TitleBox :title="title"></TitleBox>
      <TabBox :activeValue="activeValue" @tabClick="tabClick" :tabList="resource.runTrendTabList"></TabBox>
    </div>
    <!-- <Echart class="data-table-wrap" :options="chartOptions" /> -->
    <div class="box-contanier">
      <div class="progress-item">
        <div>1. 008#</div>
        <el-progress :percentage="100" :show-text="false" :stroke-width="30" style="flex: 1;" class="progress"></el-progress>
        <div>200个</div>
      </div>
      <div class="progress-item">
        <div>2. 008#</div>
        <el-progress :percentage="100" :show-text="false" :stroke-width="30" style="flex: 1;" class="progress"></el-progress>
        <div>200个</div>
      </div>
      <div class="progress-item">
        <div>3. 008#</div>
        <el-progress :percentage="100" :show-text="false" :stroke-width="30" style="flex: 1;" class="progress"></el-progress>
        <div>200个</div>
      </div>
      <div class="progress-item">
        <div>4. 008#</div>
        <el-progress :percentage="100" :show-text="false" :stroke-width="30" style="flex: 1;" class="progress"></el-progress>
        <div>200个</div>
      </div>
      <div class="progress-item">
        <div>5. 008#</div>
        <el-progress :percentage="100" :show-text="false" :stroke-width="30" style="flex: 1;" class="progress"></el-progress>
        <div>200个</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TitleBox from './TitleBox.vue'
import TabBox from './TabBox.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useResize } from '@/hooks/useResize'
import { getRadiationInfo } from '@/api/monitoring/station'
const { scale } = useResize()
import { resource } from '../config'
const activeValue = ref('1')
let legendLable = ref(['平均风速', '有功功率', '理论功率'])
let yAxisTitle = ref('风速(m/s)')
const tabClick = (value) => {
  if (value == 'windSpeed') {
    legendLable.value = ['平均风速', '有功功率', '理论功率']
    yAxisTitle.value = '风速(m/s)'
  } else {
    legendLable.value = ['幅照度', '有功功率', '理论功率']
    yAxisTitle.value = '幅照度(W/㎡)'
  }
  activeValue.value = value
}
const props = defineProps({
  title: {
    type: String,
    default: '风机预警数量TOP5'
  },
  data: {
    type: Array,
    default: () => []
  },
  legend: {
    type: Array,
    default: () => []
  }
})
const fanRunInfo = reactive({
  data: [],
  max: [],
  yAxisMin: [0, 0, 0, 0, -40, 0, 0],
  yAxisMax: [40, 40, 40, 40, 40, 100, 100],
  yAxisMinValue: -1,
  yAxisMaxValue: 1,
  isMax: 40,
  colors: ['#00D7FF', '#3AF1FC', '#C08DFE', '#B3D9D9', '#F98C56', '#EA68A2', '#3ACCA2']
})

const loadData = async () => {
  // const { data } = await getRadiationInfo()
  fanRunInfo.data = resource.echartsData
}

onMounted(() => {
  loadData()
})
const chartOptions = computed(() => {
  let yAxis = [
    {
      type: 'value',
      name: yAxisTitle.value,
      position: 'left',
      nameGap: 5,
      nameTextStyle: {
        color: '#fff',
        fontSize: 14,
        padding: [0, 0, 10, 0]
      },
      axisLabel: {
        color: '#FFF',
        fontSize: 14
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(103, 158, 252, 0.43)',
          width: 1
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      }
    },
    {
      type: 'value',
      name: '功率(万kW)',
      position: 'right',
      nameGap: 5,
      nameTextStyle: {
        color: '#fff',
        fontSize: 14,
        padding: [0, 0, 10, 0]
      },
      axisLabel: {
        color: '#FFF',
        fontSize: 14
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(103, 158, 252, 0.43)',
          width: 1
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisTick: {
        show: false
      }
    }
  ]
  return {
    color: fanRunInfo.colors,
    legend: {
      show: true,
      type: 'scroll',
      textStyle: {
        color: '#FFF'
      },
      pageIconColor: '#fff',
      pageIconInactiveColor: '#2f4554',
      pageTextStyle: {
        color: '#fff'
      }
    },
    grid: {
      left: 15 * scale.value,
      top: 40 * scale.value,
      right: 15 * scale.value,
      bottom: 5 * scale.value,
      width: 'auto', // grid 组件的宽度。默认自适应。
      height: 'auto',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      confine: true,
      borderColor: 'rgba(64, 47, 157, 0.5)',
      backgroundColor: 'rgba(64, 47, 157, 0.5)', // 提示气泡背景颜色
      textStyle: {
        color: '#ffffff'
      }
    },
    xAxis: [
      {
        type: 'category',
        name: '',
        axisLabel: {
          //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#fff',
            fontSize: 14 * scale.value
          }
          // formatter: function(data) {
          //     return data
          // }
        },
        axisLine: {
          lineStyle: { color: 'rgba(103, 158, 252, 0.43)' }
        },
        splitLine: {
          lineStyle: { color: '#ffffff', opacity: 0.5 }
        },
        axisTick: {
          show: false
        },
        data: fanRunInfo.data.map((item) => item.time)
      }
    ],
    yAxis,
    series: [
      {
        color: 'rgba(1, 241, 203, 1)',
        name: legendLable.value[0],
        symbol: 'circle',
        yAxisIndex: 0,
        type: 'line',
        showSymbol: false,
        // 曲线
        smooth: true,
        data: fanRunInfo.data.map((item) => item.tilted)
      },
      {
        color: 'rgba(241, 201, 1, 1)',
        name: legendLable.value[1],
        symbol: 'circle',
        yAxisIndex: 1,
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: fanRunInfo.data.map((item) => item.standard)
      },
      {
        color: 'rgba(187, 1, 241, 1)',
        name: legendLable.value[2],
        symbol: 'circle',
        yAxisIndex: 1,
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: fanRunInfo.data.map((item) => item.straight)
      }
    ]
  }
})
</script>

<style lang="scss" scoped>
.echarts-box {
  display: grid;
  grid-template-rows: auto 2fr;
  border: 1px solid #678ffc !important;
  height: 100%;
  .box-contanier {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 20px;
    .progress-item {
      display: flex;
      justify-content: start;
      gap: 10px;
      .progress {
        :deep(.el-progress-bar__outer){
          border-radius: 0 !important;
        }
        :deep(.el-progress-bar__inner){
          border-radius: 0 !important;
        }
      }
    }
  }
  .echarts-title-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
