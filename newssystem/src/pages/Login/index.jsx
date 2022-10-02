import React from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message} from "antd"
import "./login.less"
import axios from "../../api/request";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const navigate = useNavigate()
  const onFinish =async (values) => {
   const response = await axios.get("/users",{
    params:{
      username:values.username,
      password:values.password,
      roleState:true,
      _expand:'role'

    }
   })
    if(response.length === 0) {
      message.error("用户名或密码不正确")
   } else {
    localStorage.setItem("token",JSON.stringify(response[0]))
    navigate("/")
   }
  };
  return (
    <div style={{background:'rgb(35,39,65)',height:"100%"}}>
   
     <div className="formContainer">
     <div className="title">xxxx系统</div>
     <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          autoComplete="current-username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
     </div>
    </div>
   
  );
};

export default Login;
