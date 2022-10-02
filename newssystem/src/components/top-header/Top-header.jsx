import React from 'react'
import {  UserOutlined } from '@ant-design/icons';
import {Dropdown, Menu, Space,Button} from "antd"
import "./top-header.less"
import { useNavigate } from 'react-router-dom';
export default function TopHeader(props) {
 
  const navigate = useNavigate()
  const {role,username} = JSON.parse(localStorage.getItem("token"))
    const getTitle = () => {
        let title;
      props.items.forEach((item) => { 
        if(item.key ===props.pathname) {
          title = item.label
        } else if(item.children) {
          const cItem = item.children.find((cItem) =>props.pathname === cItem.key  )
          if(cItem) {
            title = cItem.label
          }
        }
       
        })
        return title
       }
      const menu = (
        <Menu items={[
          {
            key:"1",
            label:(<Button type='link'>{role.roleName}</Button>)
          },
          {
            key:"2",
            label:(<Button type='link' onClick={()=>{
              localStorage.removeItem("token")
              navigate("/login",{replace:true})}}>退出</Button>)
          }
        ]}>
        </Menu>
      )
  return (
    <div className='box'>
        <div className="title">{getTitle()}</div>
        <div className="loginInfo">
         <Dropdown overlay={menu}>
        
      <Space>
       
        <Button type='link'> 欢迎{username}回来!</Button>
       
        <Button
         type="primary" shape="circle" size="large" icon={ <UserOutlined />} style={{backgroundColor:"gray",border:"gray"}}/>
      </Space>
    
         </Dropdown>
        </div>
    </div>
  )
}
