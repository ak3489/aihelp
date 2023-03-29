<template>
    <div class='prompts'>
      <div class="title is-4">AI角色</div>
      <div class="role-wrap is-flex is-align-items-center">
        <div class="is-flex-grow-1">
          <textarea class="textarea has-fixed-size" v-model="myRole" name="role" id="role" rows="2" placeholder="输入机器人角色"></textarea>
        </div>
        <!-- <button class="button is-primary" @click="setRole">设置</button> -->
      </div>
      
      <div class="prompt is-flex is-align-items-center" :class="{active:roleIndex==index}" v-for="(item,index) in prompts" :key="index">
        <div class="left is-flex-grow-1">
          <div class="title is-6">{{ item.title }}</div>
          <div class="content ellipsis-2">{{ item.content }}</div>
        </div>
        <div class="right">
          <button class="button is-dark" v-if="roleIndex===index" style="margin-left: 14px;">使用中</button>
          <button class="button is-primary" v-else @click="useRole(item,index)" style="margin-left: 14px;">使用</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import { debounce } from '@/utils/debounce';
    export default {
      name: 'Prompts',
      components: {},
      props:{
        role:String
      },
      data () {
        return {
          myRole:'',
          roleIndex:'',
          prompts:[
            {title:'默认角色',content:'You are a helpful assistant.'},
            {title:'前端开发',content:'我想让你充当前端开发专家。我将提供一些关于Js、vue、react等前端代码问题的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。如果是代码相关的问题请尽量使用代码回答。'},
            {title:'好评返现',content:'我想让你扮演购物评论家。我会告诉你一个产品，你会提供对食物或者商品和服务进行40个字左右的评论,评论要带点个人的感受。您应该只回复您的评论。'},
            {title:'周报生成器',content:'使用下面提供的文本作为中文周报的基础，生成一个简洁的摘要，突出最重要的内容。该报告应以 markdown 格式编写，并应易于阅读和理解，以满足一般受众的需要。特别是要注重提供对利益相关者和决策者有用的见解和分析。你也可以根据需要使用任何额外的信息或来源。'},
            {title:'Midjourney 提示生成器',content:"I want you to act as a prompt generator for Midjourney's artificial intelligence program. Your job is to provide detailed and creative descriptions that will inspire unique and interesting images from the AI. Keep in mind that the AI is capable of understanding a wide range of language and can interpret abstract concepts, so feel free to be as imaginative and descriptive as possible. For example, you could describe a scene from a futuristic city, or a surreal landscape filled with strange creatures. The more detailed and imaginative your description, the more interesting the resulting image will be. "},
          ]
        };
      },
      created(){
        this.myRole = this.role
      },
      watch:{
        myRole(val){
          debounce(this.$emit('setRole',val),800) 
        }
      },
      methods: {
        setRole(){

          // this.$emit('setRole',this.myRole)
        },
        useRole(item,index){
          this.myRole = this.role;
          this.roleIndex = index;
          this.myRole = item.content;
        }
      },
    }
  </script>
  
  <style lang='scss' scoped>
  .role-wrap{
    margin-bottom: 24px;
    padding-right: 24px;
    button{margin-left: 14px;}
  }
  .prompts{
    height: 100%;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    .prompt{
      padding: 14px;
      background-color: #f8f8fa;border-radius: 5px;
      &:not(:last-child){margin-bottom: 14px;}
    }

  }
 
  
  </style>