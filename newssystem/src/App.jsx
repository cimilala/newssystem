import React from 'react'
import './App.less';
import { useRoutes } from 'react-router-dom';
import router from "./router"
import { useEffect } from 'react';
import { useState } from 'react';
export default function App() {
  const [celement,setcElement] = useState([])
  console.log(celement);
  const element = useRoutes(celement)
  useEffect((first) => { 
  const getElement =async (first) => { 
    const result = await router()
    setcElement(result)
   }
      getElement()
   },[celement.length])
  return (
   <div style={{height:'100%'}}>
   {element}
   </div>
   
  )
}
