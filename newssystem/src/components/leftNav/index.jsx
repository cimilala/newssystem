import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./nav-header.less";
import { useEffect, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import axios from "../../api/request";
import { useSelector } from "react-redux";
export default function LeftNav() {
  const [items, setItems] = useState([]);
  const user = useSelector((state) => state.user.user)
  const getItems = async (first) => {
    const icons = {
      "/home": <AppstoreOutlined />,
      "/user-manage/add": <AppstoreOutlined />,
    };
    const response = await axios.get("/rights?_embed=children");
    const newItems = response;
    const {role:{rights}} = user
    //对请求回来的数据进行过滤,来判断是否展示在页面
    const renderMenu = (filterItems) => {
      return filterItems.map((newItem) => {
        if (newItem.pagepermisson && rights.includes(newItem.key)) {
          if(newItem.children) {
            newItem.children= newItem.children.filter((item) => item.pagepermisson)
            return newItem
          }
         else {
          return newItem
         }
        } else {
          return null
        }
      }).filter((item) => {return  item!==null });
    };
    // console.log(rights);
    
    //对过滤完的数据进行处理
    //1.对数组的一级属性追加icon图标
    //2.判断数组的一级属性是否有children属性，如果有，为childern中的每一个对象追加一个icon属性
    const handlerItems = renderMenu(newItems)
    handlerItems.forEach((newItem) => {
      newItem.icon = icons[newItem.key];
      if (newItem.children.length === 0) {
        delete newItem.children;
      }
      if (newItem.children) {
        newItem.children = newItem.children.map((item) => ({
          grade:item.grade,
          id:item.id,
          key:item.key,
          label:item.label,
          pagepermisson:item.pagepermisson,
          icon: icons[item.key],
        }));
      }
    });
    setItems(renderMenu(newItems));
  };
  useEffect(() => {
    getItems();
  }, []);
  const navgate = useNavigate();
  const goSearch = (itemObj) => {
    const { key } = itemObj;
    navgate(`${key}`, {
      replace: false,
    });
  };

  return (
    <div>
      <div>
        <h2 className="nav-header">全球新闻发布系统</h2>
      </div>
      <div >
        <Menu
          defaultSelectedKeys={["/home"]}
          // defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          items={items}
          onClick={goSearch}
        />
      </div>
    </div>
  );
}
