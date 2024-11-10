<template>
  <div class="fanRotateCotainer">
    <Icon
      class="turbine-box"
      size="42"
      :color="props.color"
      :icon="animateArr.includes(props.typeImg) ? `svg-icon:turbine-animate` : `svg-icon:turbine`"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const props = defineProps({
  color: {
    type: String,
    default: 'unconnect'
  },
  typeImg: {
    type: String,
    default: 'unconnect'
  }
})
const animateArr = reactive(['online', 'limit'])
</script>

<style lang="scss" scoped>
.fanRotateCotainer {
  width: 42px;
  height: 55px;
  position: relative;
  box-sizing: border-box;
  transform: translateY(-1px);
  .turbine-box{
    width: 100%;
    height: 100%;
  }
  .tur-grid-top {
    box-sizing: border-box;
    width: 120%;
    padding-top: 120%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: translate(-50%, -50%);
    transform-origin: 50% 39%;
    position: absolute;
    top: 40%;
    left: 50%;
  }
  .tur-grid-bottom {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 120%;
    width: 112%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: translateY(28%);
  }
  .tur-icon-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .tur-icon {
      background-size: 100% 100%;
    }
  }
}
</style>
