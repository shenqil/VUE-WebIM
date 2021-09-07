<template>
  <div id="app">
    <div>
      <h2>普通消息</h2>
      <div>
        <Input v-model="userId" placeholder="对方用户id" style="width: 300px" />
      </div>
      <div>
        <Input v-model="msg" placeholder="消息" style="width: 300px" />
      </div>

      <div>
        <Button type="primary" @click="handleSend">发送</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userId: "",
      msg: "",
    };
  },
  methods: {
    ...mapActions("__imStore", ["sendTextMsg"]),
    handleSend() {
      this.sendTextMsg({ msg: this.msg, to: this.userId });
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 800px;
}
</style>
