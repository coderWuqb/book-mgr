<template>
    <div class="basic-layout">
        <div class="app-header">
            <div class="left">
                <img src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1" alt="">
                <div class="title">图书管理系统</div>
            </div>

            <div class="right">
                <div class="hello-msg">你好，admin</div>
                <div class="logout">退出</div>
            </div>
        </div>

        <div class="placeholder"></div>

        <div class="app-content">
            <div class="left">
                <App-nav/>
            </div>
            
            <div class="right">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Nav from '../Nav/index.vue'

export default defineComponent({
    components:{
        AppNav:Nav,
    }
});
</script>

<style lang='scss' scoped>
.basic-layout{
    .app-header{
        height: 64px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        box-shadow: 0 2px 8px #f0f1f2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        width: 100%;
        z-index: 1;

        .left{
            display: flex;
            align-items: center;

            img{
            height: 50px;
            margin-right: 16px;
            }

            .title{
                font-size: 18px;
                font-weight: bolder;
            }
        }

        .right{
            display: flex;
            align-items: center;

            .logout{
                width: 80px;
                height: 64px;
                text-align: center;
                line-height: 64px;
                // 设置小指头
                cursor: pointer;
                margin-left: 16px;

                &:hover{
                    background-color: #eee;
                }
            }
        }
    }

    .placeholder{
        height: 64px;
        width: 100%;
    }

    .app-content{
        display: flex;

        .left{
            width: 256px;
            background-color: #efefef;
            // 使高度占满
            position: fixed;
            top: 64px;
            bottom: 0;
        }

        .right{
            // 将剩下的空间占满
            flex: 1;
            padding: 24px;
            margin-left: 256px;
        }
    }
}
</style>