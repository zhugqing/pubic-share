<!--
*@Author：liuzumian
*@Date：2024/5/20  10:38
*@LastEditors：liuzumian
*@LastEditTime：2024/5/20  10:38
*@Description：
-->
<template>
  <div class="structure-container">
    <div class="structure-content-box">
      <!--    左边-->
      <!-- <StructureContent
        position="left"
        :structureList="leftStructureList"
        :type="props.type"
      /> -->
      <!--      中间-->
      <div class="structure-center">
        <!-- <div class="rowLine leftRowLine"></div> -->
        <img @click="imgClick" class="structure-center-img" src="@/assets/images/health/faultTreeIcon.png" alt="">
        <div class="structure-center-text">主轴超速等级2</div>
        <div class="rowLine rightRowLine"></div>
      </div>
      <!--    右边-->
      <StructureContent
        position="right"
        :structureList="rightStructureList"
        :type="props.type"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, computed, inject} from "vue";
import FanRotate from './FanRotate.vue'
import StructureContent from './StructureContent.vue'
import { useRouter } from "vue-router"
const router = useRouter()
import { datas } from '../config/index'
const changeTabProvide = inject('changeTabProvide') as Function
const props = defineProps({
  type: {
    type: Number,
    default: 1
  },
})
const leftStructureList =  computed(() => {
  let half = Math.ceil(datas.structureList.length / 2)
  return datas.structureList.slice(0, half)
})
const rightStructureList =  computed(() => {
  let half = Math.ceil(datas.structureList.length / 2)
  return datas.structureList.slice(half, datas.structureList.length)
})
const minLength = computed(() => { // css使用v-bind(minLength)
  let min = Math.min(leftStructureList.value.length, rightStructureList.value.length)
  if (min === 0) {
    min = 1
  }
  return min - 1
})
const imgClick = () => {
  changeTabProvide('StationMonitor')
}
</script>

<style lang="scss"  scoped>
$scale: 0.7;
.structure-container{
  height: 100%;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  .structure-content-box{
    padding-top: 20px;
    display: flex;
    justify-content: center;
    .structure-center{
      width: calc(239.82px * $scale);
      height: calc(239.82px * $scale);
      position: relative;
      margin: 0 80px;
      transform: translateY(calc(-50% + 117px + (153px * v-bind(minLength)) / 2 ));
      .rowLine{
        width: 101px;
        height: 2px;
        background: #455FB9;
        border-radius: 2px;
        position: absolute;
        top: 50%;
      }
      .leftRowLine{
        left: -80px;
      }
      .rightRowLine{
        right: -80px;
      }
      .structure-center-img{
        width: 132px;
        height: 90px;
        cursor: pointer;
      }
      .structure-center-text{
        font-family: Microsoft YaHei, Microsoft YaHei;
        font-weight: 400;
        font-size: calc(16px * $scale);
        color: #FFFFFF;
        position: absolute;
        bottom: 30%;
        left: 43%;
        transform: translateX(-50%);
      }
    }
    .structure-left-container{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      //justify-content: center;
      .structure-line-box{
        display: flex;
        flex-direction: row-reverse;
        .structure-item-box{
          border-bottom: 1px solid #455FB9;
          padding: 35px 10px 0 10px;
          .structure-item-card{
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
                font-size: 35px !important;
              }
            }
          }
        }
        .pdt0{
          padding-top: 0;
        }
      }
      .noFirst{
        border-right: 1px solid #455FB9;
      }
    }
    .structure-right-container{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      //justify-content: center;
      .structure-line-box{
        display: flex;
        .structure-item-box{
          border-bottom: 1px solid #455FB9;
          padding: 35px 10px 0 10px;
          .structure-item-card{
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
                font-size: 35px !important;
              }
            }
          }
        }
        .pdt0{
          padding-top: 0;
        }
      }
      .noFirst{
        border-left: 1px solid #455FB9;
      }
    }
  }
}
</style>
