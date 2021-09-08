<template>
  <div class="web-im-imput">
    <div class="web-im-imput__scroll">
      <div ref="editor" class="web-im-imput__content" contenteditable="true"></div>
    </div>

    <div class="web-im-imput__bottom">
      <div class="web-im-imput__btn" @click="handleSend">发送</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("__imStore", ["sendTextMsg"]),
    handleSend() {
      const content = this.$refs.editor.innerHTML;
      this.$refs.editor.innerHTML = "";
      this.sendTextMsg({ msg: content });
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/style/base.scss";
.web-im-imput {
  width: 100%;
  height: 100%;
  ::-webkit-scrollbar {
    background: none;
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    width: 2px;
    height: 2px;
    border-radius: 2px;
    background: #9d9d9d;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #c1c1c1;
  }
  &__scroll {
    width: 100%;
    height: 80px;
    overflow-x: hidden;
    overflow-y: auto;
    cursor: pointer;
  }
  &__content {
    padding: 5px 10px;
    width: 100%;
    min-height: 80px;
    cursor: text;
    outline: none;
  }
  &__bottom {
    margin-top: 8px;
  }
  &__btn {
    width: 80px;
    height: 32px;
    line-height: 32px;
    background: $webim-primary;
    border-radius: 2px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    float: right;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
