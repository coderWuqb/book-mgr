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
                    <a-input-search placeholder="根据书名搜索" enter-button/>
                </div>
                <a-button>添加一条</a-button>
            </div>
            
            <a-divider/>
            
            <!-- Ant Design 表格 -->
            <a-table :columns="columns" :data-source="dataSource">

            </a-table>

        </a-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    setup(){
        // 表格属性名
        const columns = [
            {
                title: '名字',
                dataIndex: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
        ];

        // 数据源 
        const dataSource = [
            {
                name: '小红',
                age: '18',
            },
        ];

        return{
            columns,
            dataSource,
        }
    },
});
</script>

<style lang='scss' scoped>
    .app-search{
        display: flex;
        justify-content: space-between;

        .search{
        width:200px;
        }
    }
</style>