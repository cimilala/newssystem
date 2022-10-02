import { Table, Space, Button, Tooltip, Modal,Tree } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
export default function RoleList() {
  const [dataSource, setdataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [treeData, setTreeData] = useState([])
  const [currentRights,setCurrentRights] = useState([])
  const [currentId,setCurrentId] = useState(0)
  const checked = (checkKeys) => { 
    setCurrentRights(checkKeys)
   
   }
  const showModal = (item) => {
    setIsModalOpen(true);
    setCurrentRights(item.rights)
    setCurrentId(item.id)
  };

  const handleOk = () => {
    setdataSource(dataSource.map((item) => { 
      if(item.id === currentId) {
        return {
          ...item,
          rights:currentRights,
        }
      }
      return item

    }))
    axios.patch(`http://localhost:5000/roles/${currentId}`,{
      rights:currentRights
    })
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const confirm = (item) => {
    Modal.confirm({
      title: "确认删除吗?",
      icon: <ExclamationCircleOutlined />,
      onOk: (first) => {
       
        return new Promise((resolve) => {
        
          resolve();
        });
       
      },
      onCancel: (first) => {
        return Promise.resolve();
      },
    });
  
  };
  useEffect((first) => {
    const getdataSource = async (first) => {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/roles");
      const lists = response.data;
      setLoading(false);
      setdataSource(lists);
    };
    getdataSource();
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(response => {
        // console.log(res.data)
        const treeLists  = response.data
     let newTreeLists =  JSON.parse(JSON.stringify(treeLists).replace(/label/g,"title"))
          setTreeData(newTreeLists)
    })
}, [])
  const colums = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "操作",
      render: (_, item) => {
        return (
          <div>
            <Space>
              <Tooltip title="设置权限">
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  icon={<EditOutlined />}
                  onClick={(first) => {showModal(item) }}
                ></Button>
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  shape="circle"
                  size="large"
                  style={{ backgroundColor: "pink" }}
                  onClick={() => {
                    confirm(item);
                  }}
                  icon={<DeleteOutlined />}
                ></Button>
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
        dataSource={dataSource}
        columns={colums}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title="权限分配"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree 
         checkable
        treeData={treeData}
        checkedKeys={currentRights}
        onCheck={checked}
      
        />
      </Modal>
    </div>
  );
}
