import { Table, Tag, Space, Button, Tooltip,Modal } from "antd";
import { EditOutlined, DeleteOutlined,ExclamationCircleOutlined } from "@ant-design/icons";
import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../api/request"
export default function RightList() {
  const [dataSource, setdataSource] = useState([]);
  const [loading,setLoading] = useState(false)
  const confirm = (item) => {
    Modal.confirm({
      title: '确认删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk:(first) => { 
        return new Promise((resolve, reject) => {
          if(item.grade === 1) {
            setdataSource(dataSource.filter((data) => data.id !== item.id))
             //  axios.delete("http://localhost:5000/right/${item.id}")
          }
          if(item.grade === 2) {
          const list=  dataSource.find((data) =>  data.id === item.rightId )
          list.children = list.children.filter((m) => m.id !== item.id)
        setdataSource([...dataSource])
          }
        //   axios.delete("http://localhost:5000/right/${item.id}")
          resolve()
        })
      },
      onCancel:(first) => {
        return Promise.resolve()
      }
    });
  };
  useEffect((first) => {
   
    const getdataSource = async (first) => {
      setLoading(true)
      const lists = await axios.get("/rights?_embed=children");
      setLoading(false)
      lists.forEach((list) => {
        if(list.children.length === 0) {
          delete list.children
        }
       })
      setdataSource(lists);
    };
  
    getdataSource();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "权限名称",
      dataIndex: "label",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        let color = key.length > 10 ? "pink" : "blue";
        return <Tag color={color}>{key}</Tag>;
      },
    },
    {
      title: "操作",
      render: (_,item) => {
        return (
          <div>
            <Space>
              <Tooltip title="编辑">
                <Button type="primary" shape="circle" size="large" icon={ <EditOutlined />}>
                </Button>
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  shape="circle"
                  size="large"
                  style={{ backgroundColor: "pink" }}
                  onClick={() => { confirm(item)}}
                  icon={ <DeleteOutlined />}
                >
                </Button>
              </Tooltip>
            </Space>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={"id"}
        pagination={{
          pageSize: 5,
        }}
        loading={loading}
      />
      ;
    </div>
  );
}
