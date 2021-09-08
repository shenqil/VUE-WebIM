<template>
  <div class="web-im-msg-list">
    <Scroll ref="scroll" :on-reach-top="handleReachTop" :height="420">
      <div class="web-im-msg-list__container">
        <div class="web-im-msg-list__item" v-for="item in msgList" :key="item.ID">
          <ImMsgItem :msg="item" />
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import ImMsgItem from "../ImMsgItem/index.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ImMsgItem,
  },
  computed: {
    ...mapGetters("__imStore", ["msgList"]),
  },
  watch: {
    msgList() {
      this.$nextTick(() => {
        this.scrollBottom();
      });
    },
  },
  methods: {
    ...mapActions("__imStore", ["getMsgList"]),
    handleReachTop() {
      return this.getMsgList();
    },
    /**
     * 滚动到底部
     * */
    scrollBottom() {
      const scrollElement = this.$refs.scroll.$el?.children[0];
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    },
  },
};
</script>

<style lang="scss">
.web-im-msg-list {
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

  &__container {
    width: 100%;
    min-height: 100%;
    padding: 10px 20px;
    cursor: default;
  }
}
</style>
