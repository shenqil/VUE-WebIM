<template>
  <div class="web-im-convers-item">
    <Badge dot>
      <img
        v-if="userProfile.avatar"
        class="web-im-convers-item__avatar"
        :src="userProfile.avatar"
      />
      <img v-else class="web-im-convers-item__avatar" src="./img/none.png" />
    </Badge>

    <div class="web-im-convers-item__info">
      <div class="web-im-convers-item__top">
        <div class="web-im-convers-item__user">
          <div class="web-im-convers-item__user-name">{{ userProfile.nickName }}</div>

          <div class="web-im-convers-item__user-lable">{{ userProfile.roleName }}</div>
        </div>

        <div class="web-im-convers-item__time">{{ lastMsg.time }}</div>
      </div>

      <div class="web-im-convers-item__info-company">{{ userProfile.companyName }}</div>

      <div class="web-im-convers-item__info-msg">
        {{ lastMsg.content }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    conversation: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    userProfile() {
      const userProfile = this.conversation.userProfile || {};
      return {
        avatar: userProfile.avatar,
        nickName: userProfile.nick || userProfile.userID,
        roleName: "展商",
        companyName: "深圳市前海手绘科技文化有限公司",
      };
    },
    lastMsg() {
      const lastMessage = this.conversation.lastMessage || {};
      return {
        time: lastMessage.lastTime || 0,
        content: lastMessage.payload?.text || "",
      };
    },
  },
};
</script>
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
