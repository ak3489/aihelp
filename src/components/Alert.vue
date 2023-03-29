<template>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background" @click="close"></div>
      <div class="modal-content">
        <div class="box">
          <p class="title">{{ title }}</p>
          <p class="alert-message">{{ message }}</p>
          <button class="button is-primary" @click="close">确定</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: "Alert"
      },
      message: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        isActive: false
      };
    },
    methods: {
      open() {
        this.isActive = true;
        document.documentElement.classList.add("is-clipped");
      },
      close() {
        this.$emit('close')
        this.isActive = false;
        document.documentElement.classList.remove("is-clipped");
      }
    }
  };
  </script>
  
  <style lang="scss">
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.4s ease-in-out;
  }
  
  .modal-background {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  
  .modal-content {
    transition: transform 0.4s ease-in-out;
  }
  
  .box {
    padding: 16px;
    text-align: center;
    .alert-message{
        margin-bottom: 24px;
    }
  }
  
  .is-active {
    z-index: 1000;
    pointer-events: auto;
  }
  
  .is-clipped {
    overflow: hidden;
  }
  </style>