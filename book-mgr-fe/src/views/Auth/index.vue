<template>
  <div class="auth">
    <div class="bg"></div>

    <div class="title-info">
      <img src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1" alt="" />
      <h2 class="title">图书管理系统 后台</h2>
    </div>

    <div class="form">
      <!-- Ant Design 标签页 -->
      <a-tabs>
        <a-tab-pane key="1" tab="登录"> 
            <!-- Ant Design 输入框 -->
            <div class="item">
                <a-input placeholder="账户" size="large" v-model:value="loginForm.account"/>
            </div>
            <div class="item">
                <a-input placeholder="密码" size="large" v-model:value="loginForm.password"/>
            </div>
            <div class="item">
                <a href="">忘记密码</a>
            </div>
            <!-- Ant Design 按钮 -->
            <div class="item">
                <a-button type="primary" size="large" @click="login" >登录</a-button>
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
             <div class="item">
                <a-input placeholder="账户" size="large" v-model:value="regForm.account" />
            </div>
            <div class="item">
                <a-input placeholder="密码" size="large" v-model:value="regForm.password" />
            </div>
            <div class="item">
                <a-input placeholder="邀请码" size="large"/>
            </div>
            <div class="item">
                <a-button type="primary" size="large" @click="register">注册</a-button>
            </div>
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script src='./index.js'>
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>