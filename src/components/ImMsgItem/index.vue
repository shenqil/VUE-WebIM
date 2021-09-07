<template>
  <div class="web-im-msg-item" :class="{ 'web-im-msg-item--end': msg.id % 2 == 0 }">
    <div class="web-im-msg-item__user">{{ msg.name }}</div>

    <div class="web-im-msg-item__content">
      <ImMsgText />
    </div>
  </div>
</template>

<script>
import ImMsgText from "../ImMsgText/index.vue";
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
