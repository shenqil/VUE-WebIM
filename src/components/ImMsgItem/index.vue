<template>
  <div class="web-im-msg-item" :class="{ 'web-im-msg-item--end': isSelf }">
    <div class="web-im-msg-item__user">{{ userName }}</div>

    <div class="web-im-msg-item__content">
      <ImMsgText :msg="msg" />
    </div>
  </div>
</template>

<script>
import ImMsgText from "../ImMsgText/index.vue";
import { mapState } from "vuex";
export default {
  props: {
    msg: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ImMsgText,
  },
  computed: {
    ...mapState("__imStore", ["userID"]),
    isSelf() {
      return this.msg.from == this.userID;
    },
    userName() {
      return this.msg.from;
    },
  },
};
</script>

<style lang="scss">
.web-im-msg-item {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-bottom: 8px;
  &--end {
    align-items: flex-end;
    .web-im-msg-text {
      background: #e2ecfc;
    }
  }
  &__user {
    height: 20px;
    font-size: 12px;
    font-weight: 400;
    color: #595959;
    line-height: 20px;
    margin-bottom: 4px;
  }
}
</style>
