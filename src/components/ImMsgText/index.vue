<template>
  <div class="web-im-msg-text">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    text() {
      return this.msg.payload?.text || "";
    },
  },
};
</script>

<style lang="scss">
.web-im-msg-text {
  max-width: 320px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
  color: #262626;
  line-height: 18px;
}
</style>
