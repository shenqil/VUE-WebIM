<template>
  <div class="web-im-msg" v-imDrag="'web-im-msg__darg'">
    <div class="web-im-msg__darg">1122233</div>
  </div>
</template>

<script>
export default {
  created() {},
};
</script>

<style lang="scss">
.web-im-msg {
  width: 832px;
  height: 640px;
  &__darg {
    width: 100%;
    height: 80px;
    cursor: move;
    background-color: plum;
  }
}
</style>
