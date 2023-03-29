<template>
  <div class=''>
    <Loading v-show="showLoading" />
    <div class="outwrap columns" >
      <section class="prompts-section column is-3">
        <!-- style="background-color:aquamarine;" -->
        <Prompts :role="role" @setRole="setRole" />
      </section>
      <section class="column">
        <Chat :role="role" :apiKey="apiKey" @handleShowLoading="handleShowLoading" @handleCloseLoading="handleCloseLoading" />
      </section>
      <section class="column is-2">
        <Toolaside @setKey="setKey" />
      </section>
    </div>

    <!-- <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div> -->
  </div>
</template>

<script>
 import Prompts from '../components/Prompts.vue';
 import Chat from '../components/Chat.vue';
 import Toolaside from '../components/Toolaside.vue';
 import Loading from '@/components/loading.vue';
  export default {
    name: '',
    components: {
      Prompts,
      Chat,
      Toolaside,
      Loading
    },
    data () {
      return {
        apiKey:'',
        role:'You are a helpful assistant.',
        showLoading:false
      };
    },
    created(){
      let apiKey = localStorage.getItem('apiKey');
      if(apiKey){ this.apiKey = apiKey };
    },
    methods: {
      setRole(e){
        this.role = e;
      },
      setKey(e){
        this.apiKey = e;
        localStorage.setItem('apiKey',e)
      },
      handleShowLoading(){
        this.showLoading = true
      },
      handleCloseLoading(){
        this.showLoading = false
      },
    },
  }
</script>

<style lang='scss' scoped>
//@import url()
@media screen and (max-width:800px) {
    .prompts-section{
      display: none;
    }
}
</style>