<template>
  <div class="vue-virtual-list" @scroll.passive="onScroll" ref="outer">
    <div class="vue-virtual-list-container" :style="containerStyle">
      <div>
        <slot name="before"></slot>
      </div>
      <div
        v-for="(item, index) in displayItems"
        class="cell-container"
        :key="item[$attrs['key-field']]"
        :style="getComputedStyle(item)"
      >
        <slot name="cell" :item="item" :index="index + startIndex"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      displayItems: [],
      totalHeight: "0",
    };
  },
  mounted() {
    if (ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.onContainerResized);
      this.resizeObserver.observe(this.$refs.outer);
    } else {
      this.$refs.outer.addEventListener("resize", this.onContainerResized);
    }
  },
  beforeDestroy() {
    if (ResizeObserver) {
      this.resizeObserver.disconnect();
    } else {
      this.$refs.outer.removeEventListener("resize", this.onContainerResized);
    }
  },
  computed: {
    containerStyle() {
      return {
        height: this.totalHeight + "px",
      };
    },
  },
  watch: {
    list: {
      handler() {
        this.resetCollection();
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * 利用二分法查找指定位置
     * */
    searchIndex(nums, target) {
      const n = nums.length;
      let left = 0,
        right = n - 1,
        ans = n;

      while (left <= right) {
        let mid = ((right - left) >> 1) + left;
        if (nums[mid].top >= target) {
          ans = mid;
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
      return ans;
    },
    /**
     * 计算管理结构
     * */
    collectionGroupManagers() {
      const size = Number(this.$attrs.size);
      const beforeHeight = Number(this.$attrs["before-height"]);

      let top = beforeHeight | 0;

      this.groupManagers = [];
      for (const item of this.list) {
        const height = item.size ? item.size : size;
        this.groupManagers.push({
          key: item[this.$attrs["key-field"]],
          top,
          height,
        });
        top += Number(height);
      }

      this.totalHeight = top;
    },
    /**
     * 计算可视区域需要渲染的元素
     * */
    resetCollection() {
      this.collectionGroupManagers();
      this.$nextTick(() => {
        this.flushDisplayItems();
      });
    },
    /**
     * 获取每个元素的样式
     * */
    getComputedStyle(displayItem) {
      if (!displayItem || !this.groupManagers) return;

      const groupManagerItem = this.groupManagers.find(
        (item) => displayItem[this.$attrs["key-field"]] == item.key
      );
      if (!groupManagerItem) return;

      const { top, height } = groupManagerItem;
      return {
        top: `${top}px`,
        height: `${height}px`,
      };
    },
    /**
     * 刷新显示区域
     * */
    flushDisplayItems() {
      let startHeight = 0;
      let endHeight = 0;

      if (this.$refs.outer) {
        const scrollTop = Number(this.$refs.outer.scrollTop);
        const clientHeight = Number(this.$refs.outer.clientHeight);
        const scrollHeight = Number(this.$refs.outer.scrollHeight);
        const bufHeight = Number(this.$attrs.buffer);
        startHeight = scrollTop - bufHeight;
        endHeight = scrollTop + clientHeight + bufHeight;

        if (startHeight < 0) {
          startHeight = 0;
        }

        if (endHeight > scrollHeight) {
          endHeight = scrollHeight;
        }
      }

      const startIndex = this.searchIndex(this.groupManagers, startHeight);
      const endIndex = this.searchIndex(this.groupManagers, endHeight);
      this.startIndex = startIndex;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          this.displayItems = this.list.slice(startIndex, endIndex);
          this.$forceUpdate();
        });
      } else {
        this.displayItems = this.list.slice(startIndex, endIndex);
        this.$forceUpdate();
      }
    },
    onScroll() {
      this.flushDisplayItems();
    },
    onContainerResized() {
      this.resetCollection();
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-virtual-list {
  width: 100%;
  height: 100%;
  overflow: scroll;

  &-container {
    position: relative;
    .cell-container {
      position: absolute;
      top: 0;
    }
  }
}
</style>