<template>
  <div class="web-im">
    <!-- IM聊天主题 不用v-show是因为内部指令，需要记录组件位置-->
    <div :class="{ 'web-im__hidden': !isShowMsg }">
      <ImMsg @on-collapse="isShowMsg = false" />
    </div>

    <!-- IM 悬浮按钮 不用v-show是因为内部指令，需要记录组件位置-->
    <div :class="{ 'web-im__hidden': isShowMsg }">
      <FloatButton @on-expand="isShowMsg = true" />
    </div>
  </div>
</template>

<script>
import FloatButton from "../components/FloatButton/index.vue";
import ImMsg from "../components/ImMsg/index.vue";

export default {
  components: {
    FloatButton,
    ImMsg,
  },
  data() {
    return {
      isShowMsg: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.web-im {
  &__hidden {
    opacity: 0;
    z-index: -1;
  }
}
</style>
