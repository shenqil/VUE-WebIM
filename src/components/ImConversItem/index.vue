<template>
  <div class="web-im-convers-item">
    <Badge dot>
      <img class="web-im-convers-item__avatar" src="./img/none.png" alt="" />
    </Badge>

    <div class="web-im-convers-item__info">
      <div class="web-im-convers-item__top">
        <div class="web-im-convers-item__user">
          <div class="web-im-convers-item__user-name">张三</div>

          <div class="web-im-convers-item__user-lable">展商</div>
        </div>

        <div class="web-im-convers-item__time">2020/12/25</div>
      </div>

      <div class="web-im-convers-item__info-company">深圳市前海手绘科技文化有限公司</div>

      <div class="web-im-convers-item__info-msg">
        消息内容消息内容消息内容消息内容消息内容消息内容
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/style/base.scss";
.web-im-convers-item {
  width: 100%;
  padding: 14px 20px;
  display: flex;
  flex-flow: row;
  .ivu-badge-dot {
    width: 10px;
    height: 10px;
  }
  &__avatar {
    width: 40px;
    height: 40px;
  }

  &__top {
    width: 220px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
  }
  &__user {
    display: flex;
    flex-flow: row;
    align-items: center;
    &-name {
      height: 22px;
      font-size: 14px;
      font-weight: 600;
      color: #262626;
      line-height: 22px;
      margin-right: 6px;
    }
    &-lable {
      padding: 2px 8px;
      border-radius: 11px;
      border: 1px solid #45bf11;

      font-size: 12px;
      font-weight: 600;
      color: #45bf11;
      line-height: 12px;
    }
  }
  &__time {
    height: 20px;
    font-size: 12px;
    color: #8c8c8c;
    line-height: 20px;
  }
  &__info {
    margin-left: 12px;
    &-company {
      width: 220px;
      height: 20px;
      font-size: 12px;
      font-weight: 400;
      color: #262626;
      line-height: 20px;
      margin-bottom: 2px;
      @include webim-ellipsis(1);
    }
    &-msg {
      width: 220px;
      height: 20px;
      font-size: 12px;
      font-weight: 400;
      color: #8c8c8c;
      line-height: 20px;
      @include webim-ellipsis(1);
    }
  }
}
</style>
