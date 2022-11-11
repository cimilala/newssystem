import axios from "../../../api/request";
import React from "react";
import { Table, Space, Tooltip, Button, Switch, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import UserForm from "../../../components/user-manage/UserForm";
import { useDispatch } from "react-redux";
export default function UserLists() {
 

  //初始化表格数据状态
  const [dataSource, setdataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [roleList, setroleList] = useState([]);
  const [regionList, setregionList] = useState([]);
  const [regionDisabled, setRegionDisabled] = useState(false);
  const [saveSelectItem, setSavaSelectItem] = useState({});
  const addForm = useRef();
  const updateForm = useRef();

  const user = useDispatch((state) => { return state.user.user })

  const currentUser = user
 
  //页面加载时发送请求,获取表格数据
  useEffect((first) => {
    setLoading(true);
    const getdataSource = async (first) => {
      const response = await axios.get("/users?_expand=role");
      setLoading(false);
     if(currentUser.roleId === 1) {
      setdataSource(response)
     }else {
      setdataSource([
        ...response.filter((item) => item.username === currentUser.username),
        ...response.filter((item) => item.region === currentUser.region && item.roleId === 3)
      ])
     }
    };
    getdataSource();
  }, [currentUser.region,currentUser.roleId,currentUser.username]);
  useEffect(() => {
    axios.get("/regions").then((res) => {
      const list = res;
      setregionList(list);
    });
  }, []);

  useEffect(() => {
    axios.get("/roles").then((res) => {
      if(currentUser.roleId === 1) {
        setroleList(res)
      }else{
        const list =  res.filter((item) => {
          return  item.roleName === "区域编辑"
          
        })
        setroleList(list);
      }
   
    });
  }, [currentUser.roleId]);
  //定义表格列
  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      filters:[...regionList.map((item) => { 
        return {
          text:item.label,
          value:item.value
        }
      }),
    {
      text:"全球",
      value:"全球"
    }],
    onFilter:(value,item) => {
      if(value === '全球') {
        return item.region ===''
      }
      return item.region === value
    },
      render: (text) => {
        return text === "" ? "全球" : text;
      },
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return role.roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (text, record) => {
        return (
          <Switch
            checked={text}
            disabled={record.default}
            onChange={() => {
              axios.patch(`/users/${record.id}`, {
                roleState: !text,
              });
              setdataSource(
                dataSource.map((item) => {
                  return item.id === record.id
                    ? { ...record, roleState: !text }
                    : item;
                })
              );
            }}
          ></Switch>
        );
      },
    },
    {
      title: "操作",
      render: (_, item) => {
        return (
          <div>
            <Space>
              <Tooltip title="更新用户">
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  disabled={item.default}
                  icon={<EditOutlined />}
                  onClick={() => {
                    updateShowModal(item);
                   
                  }}
                ></Button>
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  shape="circle"
                  size="large"
                  disabled={item.default}
                  style={{ backgroundColor: "pink" }}
                  onClick={(first) => {
                    axios.delete(`/users/${item.id}`);
                    setdataSource(
                      dataSource.filter((obj) => obj.id !== item.id)
                    );
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
  const addShowModal = () => {
    setIsAddModalOpen(true);
  };
  const updateShowModal = (item) => {
    setIsUpdateModalOpen(true);
    setSavaSelectItem(item);
    setTimeout(() => {
      updateForm.current.setFieldsValue({
        ...item,
        roleId:item.role.roleName
      });
      if (item.roleId === 1) {
        setRegionDisabled(true);
      } else {
        setRegionDisabled(false);
      }
    }, 0);
  };

  const addHandleOk = async() => {
    setIsAddModalOpen(false);
    const values = await addForm.current.validateFields()
    const response =await  axios.post("/users", {
        ...values,
        roleState: true,
        default: false,
      });
    
    setdataSource([
      ...dataSource,
      {
        ...response,
        role:roleList.filter((item) => item.id === response.roleId)[0],
      }
    ])
    addForm.current.resetFields()
  };

  const addHandleCancel = () => {
    setIsAddModalOpen(false);
  };
  const updateHandleCancel = (first) => {
    setIsUpdateModalOpen(false);
  };
  const updateHandleOk =async () => {
    setIsUpdateModalOpen(false);
    const values = await  updateForm.current.validateFields()
    updateForm.current.validateFields()
    const response =await  axios.patch(`/users/${saveSelectItem.id}`, {
        ...values,
        roleState: true,
        default: false,
      });
      setdataSource(dataSource.map((item) => { 
        if(item.id === response.id) {
          return {
            ...response,
            role:roleList.filter((item) => item.id === response.roleId)[0],
          }
        }
        else {
          return item
        }
      }))
     
    
  }
  return (
    <div>
      <Button type="primary" onClick={addShowModal}>
        添加用户
      </Button>
      <Modal
        title="添加用户"
        okText="添加"
        cancelText="取消"
        open={isAddModalOpen}
        onOk={addHandleOk}
        onCancel={addHandleCancel}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          ref={addForm}
        ></UserForm>
      </Modal>
      <Modal
        title="更新用户"
        okText="更新"
        cancelText="取消"
        open={isUpdateModalOpen}
        onOk={updateHandleOk}
        onCancel={updateHandleCancel}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          ref={updateForm}
          disabled={regionDisabled}
          isUpdata={true}
        ></UserForm>
      </Modal>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 5,
          position:['bottomCenter']
        }}
      ></Table>
    </div>
  );
}
