import React, { forwardRef, useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const UserForm = forwardRef((props, ref) => {
  const [regionStatus, setRegionStatus] = useState(false);
  //判断
  const {roleId,region} = JSON.parse(localStorage.getItem("token"))
 const checkRegionDisable =(item) => { 
  if(props.isUpdata) {
    if(roleId === 1) {
      return false
    }else return true
  } else {
    if(roleId === 1) {
      return false
    }else{
      return item.value !== region
    }
  }
 }
  useEffect(() => {
    setRegionStatus(props.disabled);
  }, [props.disabled]);
  return (
    <Form ref={ref} layout="vertical">
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username",
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="区域"
        name="region"
        rules={
          !regionStatus
            ? [
                {
                  required: true,
                  message: "Please input your region",
                },
              ]
            : []
        }
      >
        <Select disabled={regionStatus}>
          {props.regionList.map((item) => {
            return (
              <Option value={item.label} key={item.id} disabled={checkRegionDisable(item) }>
                {item.value}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[
          {
            required: true,
            message: "Please input your role",
          },
        ]}
      >
        <Select
          onChange={(value) => {
            if (value === 1) {
              setRegionStatus(true);
              ref.current.setFieldsValue({
                region: "",
              });
            } else {
              setRegionStatus(false);
            }
          }}
        >
          {
             props.roleList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.roleName}
                </Option>
              ))
          
               }
        </Select>
      </Form.Item>
    </Form>
  );
});
export default UserForm;
