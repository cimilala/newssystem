import React from 'react'
import './App.less';
import { useRoutes } from 'react-router-dom';
import router from "./router"
import LocalRouterMap from "./util/AuthRouter"
import { useEffect, useState } from 'react';
import axios from "./api/request"
import {connect} from "react-redux"
 function App(props) {
  console.log(props);
  const [celement,setcElement] = useState(router)
  console.log(celement);
  const element = useRoutes(celement)
  useEffect((first) => { 
    if(props.user) {
      const {role} = props.user
      Promise.all([axios.get("/rights"), axios.get("/children")]).then((value) => {
      const  backRouteList = [...value[0], ...value[1]];
        const currentRouter = backRouteList.map((item) => {
          if (
            item.pagepermisson &&
            LocalRouterMap[item.key] &&
            role.rights.includes(item.key)
          ) {
            return {
              path: item.key,
              element: LocalRouterMap[item.key],
            };
          } else {
            return null
          }
        }).filter((item) => {return  item !== null });
    const newrouter = router.map((item) => { 
        if(item.path === "/") {
          item.children = [...item.children,...currentRouter]
          return item
        }else{
          return item
        }
        
      })
    
        setcElement(newrouter)
      });
    }
     
    
  
   },[props.user])
  return (
   <div style={{height:'100%'}}>
   {element}
   </div>
   
  )
}

export default connect(
  (state) => { 
    return {
      user:state.user
    }
  } 
)(App)
