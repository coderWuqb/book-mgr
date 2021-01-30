<template>
  <div>
    <!-- Ant Design 弹窗 -->
    <!-- 该窗口是否显示需要 父传子和子传父 -->
    <a-modal title="添加书籍" :visible="props.show" @ok="submit" @cancel="close">
      <a-form :label-col="{ span: 6 }">
        <a-form-item label="书名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="价格">
          <!-- Ant Design 数字输入框 -->
          <a-input-number :min="0" :max="999" v-model:value="addForm.price" />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="addForm.author" />
        </a-form-item>
        <a-form-item label="出版日期">
          <!-- Ant Design 日期选择器 -->
          <a-date-picker v-model:value="addForm.publishDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-input v-model:value="addForm.classify" />
        </a-form-item>
        <a-form-item label="库存">
          <a-input v-model:value="addForm.count" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { book } from "@/service";
import { message } from "ant-design-vue";

export default defineComponent({
  props: {
    show: Boolean,
  },

  setup(props, context) {
    const addForm = reactive({
      name: "",
      price: 0,
      author: "",
      publishDate: 0,
      classify: "",
      count: 0,
    });

    const submit = async () => {
      // 复制一份
      const form = JSON.parse(JSON.stringify(addForm));

      // 将Ant Design 日期选择器默认的Moment对象转化为时间戳
      form.publishDate = addForm.publishDate.valueOf();

      // 向服务器发送请求并接收从服务器返回的数据
      const res = await book.add(form);

      // 添加成功
      if (res.data.code === 1) {
        // 清空表单
        addForm.name = "";
        addForm.price = 0;
        addForm.author = "";
        addForm.publishDate = 0;
        addForm.classify = "";
        addForm.count = 0;
        message.success(res.data.msg);
      }
    };

    const close = () => {
        // 触发父组件自定义的事件（子传父）
        // 参数1：自定义事件名
        // 参数2：要传递的参数
        context.emit('setShow', false);
    }

    return {
      addForm,
      submit,
      props,
      close,
    };
  },
});
</script>

<style lang='scss' scoped>
</style>