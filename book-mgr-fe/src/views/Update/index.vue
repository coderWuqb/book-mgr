<template>
  <div>
    <!-- Ant Design 弹窗 -->
    <!-- 该窗口是否显示需要 父传子和子传父 -->
    <a-modal title="编辑书籍" :visible="props.show" @ok="submit" @cancel="close">
      <a-form :label-col="{ span: 6 }">
        <a-form-item label="书名">
          <a-input v-model:value="editForm.name" />
        </a-form-item>
        <a-form-item label="价格">
          <!-- Ant Design 数字输入框 -->
          <a-input-number :min="0" :max="999" v-model:value="editForm.price" />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="editForm.author" />
        </a-form-item>
        <a-form-item label="出版日期">
          <!-- Ant Design 日期选择器 -->
          <a-date-picker v-model:value="editForm.publishDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-input v-model:value="editForm.classify" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { book } from "@/service";
import { message } from "ant-design-vue";
import moment from 'moment';

export default defineComponent({
  props: {
    show: Boolean,
    // 要编辑的那本书的所有数据
    item: Object,
  },

  setup(props, context){
    const editForm = reactive({
      name: "",
      price: 0,
      author: "",
      publishDate: 0,
      classify: "",
    });

    const submit = async () => {
      // 把moment类型转为时间戳
      editForm.publishDate = editForm.publishDate.valueOf();
      let res = await book.update({
        id: props.item.id,
        name: editForm.name,
        price: editForm.price,
        author: editForm.author,
        publishDate: editForm.publishDate,
        classify: editForm.classify,
      });
      if(res.data.code === 1){
        message.success('编辑成功');
      }
      close();
    }

    const close = () => {
        context.emit('updateClose', false);
    }

    // 监听某个响应式数据是否发生变化,发生时执行第二个参数的函数
    watch(() => props.item, (current) => {
      // 将数据拼给editForm
      Object.assign(editForm, current);
      // 将时间戳改为moment类型
      editForm.publishDate = moment(Number(editForm.publishDate));
    });

    return {
      editForm,
      props,

      submit,
      close,
    };
  },
});
</script>

<style lang='scss' scoped>
</style>