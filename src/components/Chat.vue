<template>
  <div class="chat">
    <section class="chat-wrap" ref="chatWrap">
      <div class="msg" v-for="(item, index) in messages" :key="index">
        <div class="msg-wrap ai is-flex is-align-items-flex-start" v-if="item.role == 'assistant'" >
          <img
            src="../assets/images/ai.png"
            alt=""
            style="margin-right: 14px"
          />
          <div class="msg-content" v-html="item.content"></div>
        </div>
        <div
          class="msg-wrap human is-flex is-align-items-flex-start is-justify-content-right"
          v-else
        >
          <div class="msg-content" v-html="item.content"></div>
          <img
            src="../assets/images/human.png"
            alt=""
            style="margin-left: 14px"
          />
        </div>
      </div>
    </section>
    <section class="btns">
      <button class="button is-primary" @click="handleGetBalance">
        查询余额
      </button>
      <button class="button is-primary" @click="download">下载聊天记录</button>
      <!-- <button class="button is-primary" @click="handleGetImage">生成图片</button> -->
      <a class="button is-link" href="https://newzone.top/chatgpt/" target="_blank">一些角色</a>
      <button class="button is-primary" @click="newChat">清空内容开始新话题</button>
    </section>
    <section class="tool-wrap is-flex is-align-items-center">
      <div class="left is-flex-grow-1">
        <textarea
          class="textarea has-fixed-size"
          @keydown.enter.prevent="handleTurboChat"
          v-model="question"
          placeholder="输入内容"
        ></textarea>
      </div>
      <div class="right">
        <button class="button is-primary" @click="handleTurboChat">发送</button>
      </div>
    </section>
    <Alert v-if="showingAlert" :title="alert.title" :message="alert.message" @close="dismissAlert"/>
  </div>
</template>
  
  <script>
import { turboChat, getBalance,getImage } from "@/service/index";
import Alert from "@/components/Alert.vue";
export default {
  name: "Chat",
  components: {
    Alert
  },
  props: {
    role: String,
    apiKey: String,
  },
  data() {
    let defaultRole = "You are a helpful assistant.";
    return {
      messages: [{ role: "system", content: this.role }],
      downArr:[{ role: "system", content: this.role }],
      question: "",
      showingAlert:false,
      alert:{
        title:'提示',
        message:'',
      }
    };
  },
  created() {
    // console.log('this.role',this.role);
  },
  mounted(){
    window.reanswer = this.reanswer
  },
  watch: {
    role(val) {
      this.messages = [];
      this.messages.push({ role: "system", content: val });
      this.downArr = [];
      this.downArr.push({ role: "system", content: val });
    },
    apiKey(val) {
      this.messages.push({ role: "assistant", content: "key设置完成" });
    },
  },
  methods: {
    handleTurboChat() {
      if(!this.question){
        this.showAlert('请输入内容');
        return
      }
      this.$emit('handleShowLoading');
      this.messages.push({ role: "user", content: this.question });
      turboChat({ apiKey: this.apiKey, messages: this.messages })
        .then((res) => {
          this.$emit('handleCloseLoading');
          // console.log('turboChat',res.data);
          this.downArr.push({
            role: "assistant",
            content: res.data,
          });
          let content = '';
          let retryHtml = `<p class="usage">这条信息使用了${res.usage.total_tokens}token<span class="reanswerBtn" onclick="reanswer()">重新回答<span></p>`;
          try {
            content = marked.parse(res.data) + retryHtml;
          } catch (error) {
            content = '出了点问题请,刷新重试'
          }
          this.messages.push({
            role: "assistant",
            content: content,
          });
          this.$nextTick(() => {
            hljs.highlightAll();
            this.scrollBottom();
          });
          this.question = "";
        })
        .catch((err) => {
          this.$emit('handleCloseLoading');
          console.log("err", err);
        });
    },
    handleGetImage(){
      if(!this.question){
        this.showAlert('请输入内容');
        return
      }
      let param = {
        prompt: this.question,
        size:'small',
        apiKey:this.apiKey
      }
      this.$emit('handleShowLoading');
      this.messages.push({ role: "user", content: this.question });
      getImage(param)
      .then((res) => {
        this.$emit('handleCloseLoading');
          // console.log('turboChat',res);
          this.messages.push({
            role: "assistant",
            content: `<img src="${res.data}" alt="">`,
          });
        })
        .catch((err) => {
          this.$emit('handleCloseLoading');
          console.log("err", err);
        });
    },
    scrollBottom() {
      let element = this.$refs.chatWrap;
      element.scrollTo(0, element.scrollHeight);
    },
    handleGetBalance() {
      if (!this.apiKey) {
        this.showAlert('请先设置key');
        return;
      }
      this.$emit('handleShowLoading');
      getBalance({ apiKey: this.apiKey })
        .then((res) => {
          this.$emit('handleCloseLoading');
          // console.log("getBalance", res);
          if (res.data.error) {
            this.messages.push({
              role: "assistant",
              content: res.data.error.message,
            });
          } else {
            this.messages.push({
              role: "assistant",
              content: "total_available:" + res.data.total_available,
            });
          }
        })
        .catch((err) => {
          this.$emit('handleCloseLoading');
          console.log("err", err);
        });
    },
    download() {
      // console.log('messages',messages);
      let stringData = "";
      for (let i = 0; i < this.downArr.length; i++) {
        stringData += this.downArr[i].role + ":" + this.downArr[i].content + "\n";
      }
      // dada 表示要转换的字符串数据，type 表示要转换的数据格式
      const blob = new Blob([stringData], {
        type: "text/markdown",
      });
      // 根据 blob生成 url链接
      const objectURL = URL.createObjectURL(blob);
      // 创建一个 a 标签Tag
      const aTag = document.createElement("a");
      // 设置文件的下载地址
      aTag.href = objectURL;
      // 设置保存后的文件名称
      aTag.download = "聊天记录.md";
      // 给 a 标签添加点击事件
      aTag.click();
      // 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
      // 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
      URL.revokeObjectURL(objectURL);
    },
    reanswer(){
      this.question = this.messages[this.messages.length-2].content; 
      this.messages.splice(-2);
      this.handleTurboChat();
    },
    showAlert(msg) {
      this.alert.message = msg;
      this.showingAlert = true;
    },
    dismissAlert() {
      this.showingAlert = false;
      this.alert.message = "";
    },
    newChat(){
      this.messages = [{ role: "system", content: this.role }];
      this.downArr = [];
    }
  },
};
</script>
  
  <style lang='scss' scoped>
.chat {
  position: relative;
  height: 100%;
  padding: 14px;
  background-color: #fff;
  border-radius: 5px;
  .chat-wrap {
    height: calc(100% - 125px);
    overflow-y: auto;
    .msg {
      padding-bottom: 24px;
      .msg-content{
        padding: 24px;
        border-radius: 5px;
        background-color: aliceblue;
      }
      .ai{
        .msg-content{
          background-color: #ffda44;
        }
      }
    }
  }
  .btns {
    .button {
      margin-left: 10px;
    }
  }

  .tool-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 100%;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px;

    .textarea {
      height: 100%;
      min-height: auto;
    }
    .right {
      margin-left: 14px;
    }
  }
  
}

@media screen and (max-width:800px) {
    .btns{
      display: none;
    }
    .chat{
      .chat-wrap{
        height: calc( 100vh - 125px);
      }
    }
}
</style>