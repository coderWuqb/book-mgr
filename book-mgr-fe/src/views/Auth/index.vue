<template>
  <div class="auth">
    <div class="bg"></div>

    <div class="title-info">
      <img
        src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1"
        alt=""
      />
      <h2 class="title">图书管理系统 后台</h2>
    </div>

    <div class="form">
      <!-- Ant Design 标签页 -->
      <a-tabs>
        <a-tab-pane key="1" tab="登录">
          <!-- Ant Design 输入框 -->
          <div class="item">
            <a-input
              placeholder="账户"
              size="large"
              v-model:value="loginForm.account"
            />
          </div>
          <div class="item">
            <a-input
              placeholder="密码"
              size="large"
              v-model:value="loginForm.password"
            />
          </div>
          <div class="item">
            <a href="">忘记密码</a>
          </div>
          <!-- Ant Design 按钮 -->
          <div class="item">
            <a-button type="primary" size="large" @click="login">登录</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input
              placeholder="账户"
              size="large"
              v-model:value="regForm.account"
            />
          </div>
          <div class="item">
            <a-input
              placeholder="密码"
              size="large"
              v-model:value="regForm.password"
            />
          </div>
          <div class="item">
            <a-button type="primary" size="large" @click="register"
              >注册</a-button
            >
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
// @/ 代表src这个文件夹的路径
import { auth } from "@/service";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    // 注册用的表单数据
    const regForm = reactive({
      account: "",
      password: "",
    });

    // 注册逻辑
    const register = async () => {
      if (regForm.account === "") {
        // ant-design 的消息框
        message.info("账户不能为空");
        return;
      }

      if (regForm.password === "") {
        message.info("密码不能为空");
        return;
      }
      // register()返回的是一个promise对象,该对象包含请求的相关信息，包括服务器返回的数据
      const { data } = await auth.register(regForm.account, regForm.password);

      // 注册成功提示
      if (data.code === 1) {
        message.success(data.msg);
        return;
      }

      // 注册失败提示
      message.error(data.msg);
    };

    // 登录用的表单数据
    const loginForm = reactive({
      account: "",
      password: "",
    });

    // 登录逻辑
    const login = async () => {
      if (loginForm.account === "") {
        // ant-design 的消息框
        message.info("账户不能为空");
        return;
      }

      if (loginForm.password === "") {
        message.info("密码不能为空");
        return;
      }

      // 拿取服务器返回的数据
      const { data } = await auth.login(loginForm.account, loginForm.password);

      // 登录成功提示
      if (data.code === 1) {
        message.success(data.msg);
        return;
      }

      // 登陆失败提示
      message.error(data.msg);
    };

    return {
      regForm,
      register,

      login,
      loginForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.bg {
  // 开启固定定位,其会脱离文档流,不设置宽高且上下左右设置为0则将窗口撑满
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

// scss支持嵌套,相当于.auth .title{}
.auth {
  .title-info {
    margin-top: 100px;
    margin-bottom: 32px;
    // flex布局
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 60px;
      height: 60px;
    }

    h2 {
      margin: 0px;
      margin-left: 18px;
    }
  }

  .form {
    width: 400px;
    margin: 0 auto;

    .item {
      margin-bottom: 16px;

      button {
        width: 100%;
      }
    }
  }
}
</style>