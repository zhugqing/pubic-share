<!--
*@Author：liuzumian
*@Date：2024/5/21  10:54
*@LastEditors：liuzumian
*@LastEditTime：2024/5/21  10:54
*@Description：
-->
<template>
  <div class="structure-container">
    <div class="structure-line-box" :class="`${props.position} ${index !== 0 ? 'noFirst' + props.position : ''}`" v-for="(item, index) in structureList" :key="item.title">
      <div class="structure-line-name" :class="`structure-line-name-${props.position}`">{{item.title}}</div>
      <div class="structure-item-box"  :class="{pdt0: index === 0}" v-for="(item2, index2) in item.list" :key="item2.title">
        <div class="structure-item-card" @click.stop="jumpHandle(item2)" @mousemove="mousemove($event, item2)" @mouseleave="mouseleave">
          <div class="structure-item-card-title">{{item2.title}}</div>
          <div class="structure-item-card-img">
            <template v-if="props.type === 1">
              <FanRotate :type-img="item2.status" :color="datas.statusMapColor[item2?.status]"></FanRotate>
            </template>
            <template v-else>
              <Icon class="photovoltaic" size="35"  :color="datas.statusMapColor[item2?.status]" icon="svg-icon:photovoltaic" ></Icon>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FanRotate from './FanRotate.vue'
import { datas } from '../config/index'
import { useRouter } from "vue-router"
const router = useRouter()
const props = defineProps({
  position: {
    type: String,
    default: 'left'
  },
  type: {
    type: Number,
    default: 1
  },
  structureList: {
    type: Array,
    default: []
  },
})
const jumpHandle = (item) => {
  router.push({
    path: "/monitoring/deviceMonitoring",
    query: {
      deviceId: item.title,
      treeType: props.type,
    }
  })
}
const mousemove = (event, item) => {
  datas.mouseObj = {
    ...datas.mouseObj,
    show: true,
    x: event.x,
    y: event.y,
    title: item?.title,
  }
}
const mouseleave = () => {
  datas.mouseObj.show = false
}
</script>

<style lang="scss" scoped>
.structure-container{
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  .structure-line-box{
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    .structure-line-name{
      position: absolute;
      bottom: 0;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 14px;
      color: #FFFFFF;
    }
    .structure-line-name-left{
      right: 0;
      transform: translateX(110%);
    }
    .structure-line-name-right{
      left: 0;
      transform: translateX(-110%);
    }
    .structure-item-box{
      border-bottom: 1px solid #455FB9;
      padding: 35px 10px 0 10px;
      .structure-item-card{
        cursor: pointer;
        width: 84px;
        height: 117px;
        background: linear-gradient( 180deg, rgba(72,170,255,0.2) 0%, rgba(126,72,255,0.05) 100%);
        box-shadow: inset 0px 0px 16px 1px rgba(103,158,252,0.2);
        border-radius: 5px 5px 5px 5px;
        border: 2px solid rgba(103,158,252,0.3);
        display: grid;
        grid-template-rows: auto 1fr;
        .structure-item-card-title{
          height: 32px;
          background: linear-gradient( 90deg, rgba(86,114,254,0) 0%, rgba(103,143,252,0.5) 50%, rgba(86,114,254,0) 100%);
          border-radius: 5px 5px 0px 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
          color: #FFFFFF;
        }
        .structure-item-card-img{
          display: flex;
          align-items: center;
          justify-content: center;
          .photovoltaic{
          }
        }
      }
    }
    .pdt0{
      padding-top: 0;
    }
  }
  .right{
    flex-direction: row;
  }
  .noFirstleft{
    border-right: 1px solid #455FB9;
  }
  .noFirstright{
    border-left: 1px solid #455FB9;
  }
}
</style>
