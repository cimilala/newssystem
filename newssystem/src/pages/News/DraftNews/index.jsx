import React from 'react';
import {Table,Space,Button,Tooltip,Modal, Form,
Input,Select} from "antd";

import {DeleteOutlined,EditOutlined,AuditOutlined } from "@ant-design/icons";
import { useState, useEffect } from 'react';
import axios from "../../../api/request";
import { useSelector } from 'react-redux';
const { Option } = Select;

export default function DraftNews() {
  const [dataSource,setDateSource] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectObj,setSelectObj] = useState({})
  const user = useSelector((state) => state.user.user)
  useEffect(() => { 
    axios.get("/news",{
      params:{
        author:user.username,
        auditState:0,
        _expand:'category'
      }
    }).then((data) => { 
      setDateSource(data)
    })
    
  },[user.username]);
  const columns = [
    {
      title:"ID",
      dataIndex:"id",
    },
    {
      title:"新闻标题",
      dataIndex:"title"
    },
    {
      title:"作者",
      dataIndex:"author",
    },
    {
      title:"新闻分类",
      dataIndex:"categoryId",
      render:(id) => { 
        return dataSource.find((item) => {return item.categoryId === id }).category.label
      }
    },
    {
      title:"操作",
      render:(record) => { 
        return <Space>
          <Button shape='circle' 
          icon={<DeleteOutlined />} 
          onClick={(first) => { handleDelete(record) }}></Button>
          <Button
           shape='circle' 
           icon={<EditOutlined />}  type="primary"  onClick={() => { handleUpdate(record)}}></Button>
           
           
          <Tooltip title="提交审核">
             <Button shape='circle' icon={<AuditOutlined /> } type="primary"></Button>
             </Tooltip>
         
        </Space>
      }
    }
  ]
  const handleDelete = (record) => { 
    setDateSource(dataSource.filter((item) => { return item.id !== record.id }))
    axios.delete(`/news/${record.id}`)
   }
   const handleUpdate = (record) => {
     setIsModalOpen(true);
     setSelectObj(record)
   };
   const handleOk = () => {
     setIsModalOpen(false);
   };
   const handleCancel = () => {
     setIsModalOpen(false);
   };
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey="id"
      pagination={
        {position:['bottomCenter']}
      }></Table>
       <Modal open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel} 
        cancelText="取消"
        okText="确定"
        title="更新新闻">
       <Form
       labelCol={
        {span:4}
       }
     >
        <Form.Item
         label="ID"
         name="id"
         initialValue={selectObj.id}
        >
          <Input disabled></Input>
        </Form.Item>
        <Form.Item
         label="新闻标题"
         name="title"
         initialValue={selectObj.title}> 
         
          <Input></Input>
          </Form.Item>
        <Form.Item
         label="作者"
         name="author"
         initialValue={selectObj.author}>
        <Input></Input>
        </Form.Item>
        <Form.Item
         label="新闻分类"
         name="categoryId">
       <Select>
        <Option></Option>
       </Select>
        </Form.Item>
       </Form>
      </Modal>
    </div>
  )
}
