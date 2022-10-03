import React from "react";
import {useState} from "react";
import LeftNav from "../../components/leftNav";
import { Layout} from "antd";
import { Navigate, Outlet,useLocation} from "react-router-dom";
import TopHeader from "../../components/top-header/Top-header";
import {connect} from "react-redux"
const { Header, Footer, Sider, Content } = Layout;
function NewsSandBox() {
  const {pathname} = useLocation()
 
const [items,setItems] = useState([])
  const getItems = (value) => {
   setItems(value)
   }
   if(!localStorage.getItem("token"))  return <Navigate to="/login"/>
   
  return (
    
    <Layout style={{ minHeight: "100%" }}>
      <Sider
        style={{
          width: 256,
        }}
      >
        <LeftNav citems={getItems}></LeftNav>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "white" }}>
          <TopHeader items={items} pathname={pathname}></TopHeader>
        </Header>
        <Content style={{ padding: "20px" }}>
          <div style={{ backgroundColor: "white", height: "100%" }}>
          <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ backgroundColor: "white" }}>Footer</Footer>
      </Layout>
    </Layout>
  );
}
export default connect(
  (state) => { 
    return {
      user:state.user
    }
  } 
)(NewsSandBox)