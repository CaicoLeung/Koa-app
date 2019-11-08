interface IDataInterface {
    status: number;
    data: {
        title: string;
        content: string;
    }
}
export default {
    register: (name: string, pwd: string) => {
        let data: IDataInterface;
        if(name === 'caico' && pwd === '123456') {
            data = {
                status: 0,
                data: {
                    title: '个人中心',
                    content: '欢迎进入个人中心'
                }
            }
        } else {
            data = {
                status: -1,
                data: {
                    title: '登录失败',
                    content: '请输入正确的账号信息'
                }
            }
        }
        return data
    }
}
