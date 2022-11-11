import React from "react";
import LeftNav from "../../components/leftNav";
import { Layout } from "antd";
import { Navigate, Route, Routes,useLocation} from "react-router-dom";
import TopHeader from "../../components/top-header/Top-header";
import NotFound from "../NotFound";
import { useEffect ,useState} from "react";
import LocalRouterMap from "../../util/LocalRouterMap";
import axios from "../../api/request"
import { useSelector } from "react-redux";

const { Header, Footer, Sider, Content } = Layout;
export default function NewsSandBox() {

  const { pathname } = useLocation();
  const [backRouteList, setBackRouteList] = useState([]);
  const user = useSelector((state) => state.user.user)
 
  useEffect(() => {
    Promise.all([axios.get("/rights"), axios.get("/children")]).then((value) => {
      setBackRouteList([...value[0], ...value[1]])
    })
  },[]);
  const {role} = user
  
  return (
    <div >
       <Layout style={{ minHeight:"100%"}}>
      <Sider
      width={200}
        style={{
          minHeight:"100vh"
        }}
      >
        <LeftNav ></LeftNav>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "white" }}>
         <TopHeader pathname={pathname} items={backRouteList}></TopHeader> 
          
         
        </Header>
        <Content style={{ padding: "20px" }}>
          <div style={{ backgroundColor: "white", height: "100%" }}>
            <Routes>
              {
            backRouteList.map((item) => {
                if (
                  item.pagepermisson &&
                  LocalRouterMap[item.key] &&
                  role.rights.includes(item.key)
                ) {
                  return (<Route path={item.key} key={item.key} element={LocalRouterMap[item.key]}></Route>)
                } else {
                  return null
                }
              })}
             
              {
                 backRouteList.length !== 0 ? <Route path="*" element={<NotFound />} ></Route> : null
               
              }
              
                 <Route path="/" element={<Navigate to="/home"/>}></Route> 
              
               
            </Routes>
          </div>
        </Content>
        <Footer style={{ backgroundColor: "white" }}>Footer</Footer>
      </Layout>
    </Layout>
    </div>

   
  );
}
