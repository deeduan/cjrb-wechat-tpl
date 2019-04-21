import Mock from 'mockjs';

const login = (options) => {
    console.log('mock: options', options);
    return {
        code:0,
        message:'success',
        result:{
            user_name:'段123',
            age:12,
            gender:'男'
        }
    }
}

// Mock.mock('/api/user/info', 'post', info);
Mock.mock(/\/user\/login/, 'post', login);
