import React from 'react';
import axios from 'axios';
import {
    LockOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import {
    LoginForm,
    ProFormCheckbox,
    ProFormText,
    ProConfigProvider,
  } from '@ant-design/pro-components';
  import { message, notification } from 'antd';
  
  

  
const Login : React.FC<{
  setIslogin:React.Dispatch<React.SetStateAction<boolean>>
}> = ({setIslogin}) => {
   
    return (
        <ProConfigProvider hashed={false}>
          <div style={{ backgroundColor: 'white' }}>
            <LoginForm
              logo="/src/assets/icon.png"
              title="博客管理系统"
              subTitle="欢迎使用，只有管理员才能登录哦"
              onFinish={async (values) => {
                console.log(values);
                message.success('提交成功');
                const {data} = await axios.post('login',{
                    username:values.username,
                    password:values.password
                  })
                  console.log(data.data);
                  if(data.state.ok && data.data.user.is_admin) {
                    localStorage.setItem("ACCESS_TOKEN", data.data.Token);
                    setIslogin(true);
                    notification.success({message:"管理员登录成功"})
                  }
                  else {
                    notification.error({message:"登录失败"})
                  }
        
              }}
              
              >
  
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                    fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
              <div
                style={{
                  marginBlockEnd: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">
                  自动登录
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                  忘记密码
                </a>
              </div>
            </LoginForm>
          </div>
        </ProConfigProvider>
      );
}


export default Login;

  