<template>
  <div class="web-im-convers">
    <div class="web-im-convers__tabs">
      <div
        class="web-im-convers__tab"
        :class="{ 'web-im-convers__tab-active': activeTab == 'all' }"
        @click="activeTab = 'all'"
      >
        <span class="web-im-convers__tab-text"> 全部</span>
        <span class="web-im-convers__tab-point"></span>
      </div>

      <div
        class="web-im-convers__tab"
        :class="{ 'web-im-convers__tab-active': activeTab == 'unread' }"
        @click="activeTab = 'unread'"
      >
        <span class="web-im-convers__tab-text">未读</span>
        <span class="web-im-convers__tab-point"></span>
      </div>
    </div>

    <div class="web-im-convers__scroll">
      <div class="web-im-convers__container">
        <ImConversItem v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="i" />
      </div>
    </div>
  </div>
</template>

<script>
import ImConversItem from "../ImConversItem/index.vue";
export default {
  components: {
    ImConversItem,
  },
  data() {
    return {
      activeTab: "all",
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/style/base.scss";
.web-im-convers {
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
  &__tabs {
    width: 100%;
    height: 39px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    flex-flow: row;
  }
  &__tab {
    padding-left: 20px;
    &-text {
      display: inline-block;
      height: 39px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      border-bottom: 4px solid transparent;
      cursor: pointer;
    }
    &-point {
      margin-left: 8px;
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #f24951;
      border-radius: 50%;
    }
    &-active {
      .web-im-convers__tab-text {
        font-weight: 600;
        color: $webim-primary;
        border-bottom: 4px solid $webim-primary;
      }
    }
  }

  &__scroll {
    width: 100%;
    height: calc(100% - 40px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__container {
    display: flex;
    flex-flow: column;
  }
}
</style>
