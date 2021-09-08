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
        <im-convers-item
          v-for="item in conversList"
          :key="item.conversationID"
          :conversation="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ImConversItem from "../ImConversItem/index.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    ImConversItem,
  },
  data() {
    return {
      activeTab: "all",
    };
  },
  computed: {
    ...mapGetters("__imStore", ["conversationList"]),
    conversList() {
      if (this.activeTab === "unread") {
        return this.conversationList.filter((item) => item.unreadCount != 0) || [];
      }
      return this.conversationList;
    },
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
    cursor: pointer;
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
    cursor: pointer;
  }
  &__container {
    display: flex;
    flex-flow: column;
  }
}
</style>
