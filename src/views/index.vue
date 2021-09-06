<template>
  <div class="web-im">
    <FloatButton />
    <ImMsg />
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
      suspendModal: true,
      isShowMsg: false,
    };
  },
};
</script>
