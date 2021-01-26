import { defineComponent , reactive} from 'vue';
// @/ 代表src这个文件夹的路径
import { auth } from '@/service';
import { message } from 'ant-design-vue';

export default defineComponent({
    setup(){
        // 注册用的表单数据
        const regForm = reactive({
            account: '',
            password: '',
        });

        // 注册逻辑
        const register = async () => {
            if(regForm.account === ''){
                // ant-design 的消息框
                message.info('账户不能为空');
                return;
            }

            if(regForm.password === ''){
                message.info('密码不能为空');
                return;
            }
            // register()返回的是一个promise对象,该对象包含请求的相关信息，包括服务器返回的数据
            const { data } = await auth.register(regForm.account, regForm.password);

            // 注册成功提示
            if(data.code === 1){
                message.success(data.msg);
                return;
            }
            
            // 注册失败提示
            message.error(data.msg);
        }; 

        // 登录用的表单数据
        const loginForm = reactive({
            account: '',
            password: '',
        });

        // 登录逻辑
        const login = async () => {
            if(loginForm.account === ''){
                // ant-design 的消息框
                message.info('账户不能为空');
                return;
            }

            if(loginForm.password === ''){
                message.info('密码不能为空');
                return;
            }

            // 拿取服务器返回的数据
            const { data } = await auth.login(loginForm.account, loginForm.password);
           
            // 登录成功提示
            if(data.code === 1){
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
        }
    }
});