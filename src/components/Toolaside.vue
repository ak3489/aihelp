<template>
  <div class='toolaside'>
    <div class="useinfo">
      <img src="../assets/images/human.png" alt="">
      <div class="name">未登录</div>
    </div>
    <div class="key-wrap is-flex is-align-items-center">
      <input class="input is-primary" v-model="apiKey" type="text" placeholder="输入你的key">
      <button class="button is-primary" @click="setKey">设置</button>
    </div>
    <!-- <img style="margin-top: 34px;" src="../assets/images/reward_qr.jpg" alt=""> -->
    <!-- <div class="btns is-flex is-flex-wrap-wrap is-justify-content-flex-start">
      <button class="button is-primary" @click="handleGetBalance">查询余额</button>
      <button class="button is-primary">下载聊天记录</button>
      <button class="button is-primary">生成图片</button>
    </div>  -->
  </div>
</template>

<script>
  // import { getBalance } from '@/service/index';
  export default {
    name: 'Toolaside',
    components: {},
    data () {
      return {
        apiKey:''
      };
    },
    created(){
      let apiKey = localStorage.getItem('apiKey');
      if(apiKey){ this.apiKey = apiKey };
    },
    methods: {
      // handleGetBalance(){
      //   this.$emit('getBalance',this.apiKey)
      //   // console.log('handleGetBalance');
      // },
      setKey(){
        // if(!this.apiKey){
        //   alert('请输入key');
        //   return
        // }
        this.$emit('setKey',this.apiKey)
      }
    },
  }
</script>

<style lang='scss' scoped>
.toolaside{
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  .useinfo{
    padding-top: 24px;
    padding-bottom: 24px;
    // margin-bottom: 24px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  .btns{
    padding: 0 14px;
    margin-bottom: 24px;
    .button{margin-top: 10px;margin-left: 10px;}
  }
  .key-wrap{
    padding: 24px;
    .button{margin-left: 5px;}
  }
}

</style>