<template>
    <div>
        <!-- Ant Design 卡片 -->
        <a-card>
            <h2>图书列表</h2>

            <!-- Ant Design 下划线 -->
            <a-divider/>

            <div class="app-search">
                <div class="search">
                    <!-- Ant Design 搜索框 -->
                    <a-input-search placeholder="根据书名搜索" enter-button v-model:value="keyword" @search="onSearch"/>
                    <div class="search-back" v-if="isSearch"><a-button @click="back">返回</a-button></div>
                </div>
                <a-button @click="showAdd = true">添加一条</a-button>
            </div>
            
            <a-divider/>
            
            <!-- Ant Design 表格 -->
            <a-table :columns="columns" :data-source="list">
                <template #publishDate="data">
                        {{formatTimestamp(data.record.publishDate)}}
                </template>
                <template #deleteActions="data">
                    <a href="javascript:;" @click="remove(data.record._id)">删除</a>
                </template>
                <template #count="data">
                    <a href="javascript:;" @click="updateCount(0, data.record._id)">出库</a>
                    {{ data.record.count }}
                    <a href="javascript:;" @click="updateCount(1, data.record._id)">入库</a>
                </template>
                <template #updateActions="data">
                    <a @click="update(data.record)" >编辑</a>
                </template>
            </a-table>
            
            <!-- 父传子 和 子传父 -->
            <!-- 添加窗口 -->
            <add-one :show='showAdd' @setShow='setShow'/>
            <!-- 编辑窗口 -->
            <Update :show='showEdit' :item='curEdit' @updateClose='updateClose'/>
        </a-card>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import AddOne from '../AddOne/index.vue';
import Update from '../Update/index.vue';
import { book } from "@/service";
import { message , Modal} from "ant-design-vue";

export default defineComponent({
    components:{
        AddOne,
        Update,
    },

    setup(){
        // 表格绑定的数据源 
        const list = ref(list);
        // 表格绑定的属性名
        const columns = [
            {
                title: '书名',
                dataIndex: 'name',
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '书籍分类',
                dataIndex: 'classify',
            },
            {
                title: '出版日期',
                dataIndex: 'publishDate',
                // 自定义模板，即一个插槽(将时间戳以日期的形式显示)
                slots:{
                    // 当前插槽的名字
                    customRender:'publishDate'
                }
            },
            {
                title: '库存',
                slots:{
                    customRender:'count'
                }
            },
            {
                title: '操作',
                slots:{
                    customRender:'updateActions'
                }
            },
            {
                title: '操作',
                slots:{
                    customRender:'deleteActions'
                }
            },
        ];


        // 是否显示添加书籍窗口
        const showAdd = ref(false);
        const setShow = async (bool) => {
            showAdd.value = bool;
            // 关闭添加窗口后刷新列表
            if(bool === false){
                const res = await book.list();
                if(res.data.code === 1){
                    list.value = res.data.datas;
                }
            }
        }


        // 搜索框的数据
        const keyword = ref('');
        // 是否显示返回按钮
        const isSearch = ref(false);
        // 搜索按钮触发
        const onSearch = async () => {
            // 把keyword传给服务器按条件获取列表
            const res = await book.list({
                keyword: keyword.value,
            });
            if(res.data.code === 1){
                list.value = res.data.datas;
                // 由搜索框的内容来决定是否显示返回按钮
                // 字符串非空的时候 -> true
                // 字符串为空的时候 -> false
                isSearch.value = Boolean(keyword.value);
            }

        };
        // 返回按钮触发
        const back = async () => {
            // 刷新列表
            const res = await book.list();
            if(res.data.code === 1){
                list.value = res.data.datas;
                // 将按钮隐藏
                isSearch.value = false;
            }
        }


        // 当前组件被挂载后触发
        onMounted(async () => {
            // 获取数据库中的书籍列表
            const res = await book.list();
            if(res.data.code === 1){
                list.value = res.data.datas;
            }
        });


        // 将时间戳转为日期格式
        const formatTimestamp = (ts) => {
            const date = new Date(Number(ts));
            const YYYY = date.getFullYear();
            const MM = date.getMonth() + 1;
            const DD = date.getDate();
            return `${YYYY}/${MM}/${DD}`;
        }


        // 删除按钮触发
        const remove = async (_id) => {
            let res = await book.remove(_id);
            if(res.data.code === 1){
                message.success(res.data.msg);
                // 删除后刷新列表
                res = await book.list();
                if(res.data.code === 1){
                    list.value = res.data.datas;
                }
            }
        };


        // 出入库存按钮触发
        const updateCount = (type, id) => {
            let word = '增加';
            if(type === 0){
                word = '减少';
            }
            // ant-design 弹窗
            Modal.confirm({
                title: `要${word}多少库存`,
                content: (
                    <div>
                        <input class = "bookCount"/>
                    </div>
                ),
                // 确认按钮触发
                onOk: async () => {
                    const el = document.querySelector('.bookCount');
                    let res = await book.updateCount({
                        num: el.value,
                        id,
                        type,
                    });
                    // 出入库成功
                    if(res.data.code === 1){
                        // 刷新列表
                        res = await book.list();
                        if(res.data.code === 1){
                        list.value = res.data.datas;
                        }
                        message.success(`成功${word}${el.value}本书`);
                    }else{
                        message.error('出库量大于库存，出库失败');
                    }
                }
            });
        };

        // 是否显示编辑窗口
        const showEdit = ref(false);
        // 当前要编辑的项
        const curEdit = ref({});
        const update = (record) =>{
            showEdit.value = true;
            curEdit.value = record;
        };
        const updateClose = async (bool) => {
            showEdit.value = bool;
            // 刷新列表
            const res = await book.list();
            if(res.data.code === 1){
                list.value = res.data.datas;
            }
        };

        return{
            list,
            columns,

            showAdd,
            setShow,

            formatTimestamp,

            keyword,
            onSearch,
            isSearch,
            back,

            remove,

            updateCount,

            showEdit,
            update,
            curEdit,
            updateClose,
        }
    },
});
</script>

<style lang='scss' scoped>
    .app-search{
        display: flex;
        justify-content: space-between;

        .search{
            display: flex;
            .search-back{
                margin-left: 10px;
            }
        }
    }
</style>