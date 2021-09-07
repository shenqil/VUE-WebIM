<template>
  <div class="web-im-msg" v-imDrag="'web-im-msg__head'">
    <div class="web-im-msg__left">
      <!-- 搜索栏 -->
      <div class="web-im-msg__left-serch">
        <Input placeholder="搜索：姓名/公司名" clearable>
          <Icon type="ios-search" slot="suffix" />
        </Input>
      </div>

      <!-- 会话列表 -->
      <div class="web-im-msg__left-convers">
        <ImConvers />
      </div>
    </div>

    <div class="web-im-msg__right">
      <!-- 右侧头部 -->
      <div class="web-im-msg__head">
        <div class="web-im-msg__head-info">
          <div class="web-im-msg__head-user">
            <div class="web-im-msg__head-name">张三</div>

            <div class="web-im-msg__head-label">观众</div>
          </div>

          <div class="web-im-msg__head-company">深圳市前海手绘科技文化有限公司</div>
        </div>

        <Icon type="ios-close" class="web-im-msg__head-close" @click="handleClose" />
      </div>

      <!-- 消息列表 -->
      <div class="web-im-msg__right-list"></div>
      <!-- 输入框 -->
      <div class="web-im-msg__right-input">
        <ImInput />
      </div>
    </div>
  </div>
</template>

<script>
import ImConvers from "../ImConvers/index.vue";
import ImInput from "../ImInput/index.vue";
export default {
  components: {
    ImConvers,
    ImInput,
  },
  methods: {
    handleClose() {
      this.$emit("on-collapse");
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/style/base.scss";
.web-im-msg {
  width: 832px;
  height: 640px;
  background: #ffffff;
  box-shadow: 6px 6px 12px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: flex;
  flex-flow: row nowrap;

  &__left {
    width: 312px;
    height: 100%;
    border-right: 1px solid #f0f0f0;
    &-serch {
      width: 100%;
      height: 72px;
      padding: 20px 20px 16px;
      .ivu-input {
        height: 36px;
        line-height: 36px;
        &:focus {
          border-color: $webim-primary;
        }
      }
      .ivu-icon {
        height: 36px;
        line-height: 36px;
      }
    }
    &-convers {
      width: 100%;
      height: calc(100% - 72px);
    }
  }

  &__right {
    width: calc(100% - 313px);
    height: 100%;
    &-input {
      width: 100%;
      height: 132px;
      background: #ffffff;
      border-top: 1px solid #f0f0f0;
    }
    &-list {
      width: 100%;
      height: calc(100% - 213px);
    }
  }
  &__head {
    width: 100%;
    height: 80px;
    padding: 20px 20px 0 20px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: flex-start;
    cursor: move;
    border-bottom: 1px solid #f0f0f0;
    &-info {
      cursor: text;
    }
    &-user {
      display: flex;
      flex-flow: row;
      align-items: center;
    }
    &-name {
      width: 40px;
      height: 28px;
      font-size: 20px;
      font-weight: 600;
      color: #262626;
      line-height: 28px;
    }
    &-label {
      padding: 2px 8px;
      border-radius: 11px;
      border: 1px solid #45bf11;

      font-size: 12px;
      font-weight: 600;
      color: #45bf11;
      line-height: 12px;
    }

    &-close {
      font-size: 28px;
      color: #646566;
      cursor: pointer;
    }
  }
}
</style>
