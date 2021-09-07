<template>
  <div class="web-im-msg-list">
    <Scroll :on-reach-top="handleReachTop" :height="420">
      <div class="web-im-msg-list__container">
        <div class="web-im-msg-list__item" v-for="item in msgList" :key="item.id">
          <ImMsgItem :msg="item" />
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import ImMsgItem from "../ImMsgItem/index.vue";
let addIndex = 0;
export default {
  data() {
    return {
      msgList: [],
    };
  },
  components: {
    ImMsgItem,
  },
  created() {
    for (let index = 0; index < 20; index++) {
      this.msgList.push({
        id: addIndex++,
        name: `张三${addIndex}`,
      });
    }
  },
  methods: {
    handleReachTop() {
      return new Promise((resolve) => {
        setTimeout(() => {
          for (let index = 0; index < 20; index++) {
            this.msgList.unshift({
              id: addIndex++,
              name: `张三${addIndex}`,
            });
          }
          resolve();
        }, 1000);
      });
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
