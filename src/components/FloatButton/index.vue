<template>
  <div class="web-im-float-btn" v-imDrag="'web-im-float-btn'">
    <div class="web-im-float-btn__left" @click="handleExpand">
      <img class="web-im-float-btn__left-msg" src="./img/server.png" alt="" />
      <span class="web-im-float-btn__left-text">我的沟通</span>
      <span class="web-im-float-btn__left-point"></span>
    </div>
    <img
      class="web-im-float-btn__arrow"
      src="./img/arrow.png"
      alt=""
      @click="handleExpand"
    />
  </div>
</template>

<script>
export default {
  created() {},
  methods: {
    handleExpand() {},
  },
};
</script>

<style lang="scss">
.web-im-float-btn {
  width: 230px;
  height: 44px;
  background: #ffffff;
  box-shadow: 6px 6px 12px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 13px 14px 13px 16px;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  &__left {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &-msg {
      display: block;
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }

    &-text {
      width: 56px;
      height: 22px;
      font-size: 14px;
      font-weight: 400;
      color: #262626;
      line-height: 22px;
      margin-right: 8px;
    }

    &-point {
      width: 10px;
      height: 10px;
      background: #f24951;
      border-radius: 50%;
    }
  }

  &__arrow {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
}
</style>
