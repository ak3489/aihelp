<template>
  <div class="">
    <div id="full-loading">
      <div class="sk-chasing-dots">
        <div class="sk-child sk-dot-1"></div>
        <div class="sk-child sk-dot-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang='scss' scoped>
#full-loading
{position: fixed;left: 0;right: 0;top: 0;width: 100vw;height: 100vh;background-color: rgba(0, 0, 0, 0.7);color: aliceblue;display: flex;
align-items: center;
text-align: center;
font-size: 60px;
justify-content: center;
z-index: 9999;
}
/*loading*/
.sk-chasing-dots {
  width: 4em;
  height: 4em;
  position: relative;
  margin: auto;
  text-align: center;
  -webkit-animation: sk-chasing-dots-rotate 2s infinite linear;
          animation: sk-chasing-dots-rotate 2s infinite linear;
}
.sk-chasing-dots .sk-child {
  width: 2em;
  height: 2em;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #098eff;
  border-radius: 100%;
  -webkit-animation: sk-chasing-dots-bounce 2s infinite ease-in-out;
          animation: sk-chasing-dots-bounce 2s infinite ease-in-out;
}
.sk-chasing-dots .sk-dot-2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1s;
          animation-delay: -1s;
}
@-webkit-keyframes sk-chasing-dots-rotate {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes sk-chasing-dots-rotate {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@-webkit-keyframes sk-chasing-dots-bounce {
  0%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@keyframes sk-chasing-dots-bounce {
  0%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
</style>