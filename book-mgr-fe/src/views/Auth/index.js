import { defineComponent , reactive} from 'vue';
// @/ 代表src这个文件夹的路径
import { auth } from '@/service';

export default defineComponent({
    setup(){
        const regForm = reactive({
            account: '',
            password: '',
        });

        const register = () => {
            auth.register(regForm.account, regForm.password);
        }; 

        return {
            regForm,
            register,
        }
    }
});