import React from "react";
import { Button, PageHeader, Steps, Space, Form, Input, Select,
   message, notification } from "antd";
import { useState, useEffect, useRef } from "react";
import "./index.less";
import axios from "../../../api/request";
import NewsEdit from "../../../components/news-manage/NewsEdit"
import { useSelector } from "react-redux";
const { Step } = Steps;
const { Option } = Select;
export default function AddNews() {
  const user = useSelector((state) => state.user.user)
  //保存步骤条状态
  const [current, setCurrent] = useState(0);
  //保存请求的新闻分类的状态
  const [newsCategory, setNewsCategory] = useState([]);
  //保存表单值
  const [formValue,setFormValue] = useState()
  //保存富文本值
  const [content,setContent] = useState("")
  //步骤条下一步的回调
  const handleNext = (first) => {
    if (current === 0) {
      //获取表单值
      newsForm.current
        .validateFields()
        .then((value) => {
          setFormValue(value)
          setCurrent(current + 1);
        })
        .catch((err) => {
          
        });
    } else {
      if(content === "" || content.trim() === "<p></p>") {
        message.error("新闻内容不能为空")
      } else {
        console.log(formValue,content);
        setCurrent(current + 1);
      }
    
     
    }
  };
  //步骤条上一步的回调
  const handlePrevious = (first) => {
    setCurrent(current - 1);
  };
  //对form表达打标识,获取form表单实例
  const newsForm = useRef();
  //表单提交成功的回调
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  //表单提交失败的回调
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  //保存草稿箱(0)或提交审核
  const handleSave = (auditState) => { 
    axios.post("/news",{
      ...formValue,
      "content":content,
      "region": user.region ? user.region : "全球",
      "author": user.username,
      "roleId": user.roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime":Date.now(),
      "star": 0,
      "view": 0,
      "publishTime": 0
    }).then((value) => { 
      // navigate(value.auditState === 0 ? "/news-manamg/draft" : "/audit-manage/list")
      notification.open({
        message: '通知',
        description:`您可以到${auditState === 0 ? "草稿箱" : "审核列表"}中查看您的新闻`,
       placement:"bottomRight"
      });
    })
   }
  useEffect(() => {
    axios.get("/categories").then((data) => {
      setNewsCategory(data);
      
    });
   
  }, []);
  return (
    <div>
      {/* 头部 */}
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="撰写新闻"
          style={{ border: "1px solid rgb(235, 237, 240)" }}
        />
      </div>
      {/* 内容 */}
      <div style={{ padding: "10px" }}>
        {/* //步骤条 */}
        <div>
          <Steps current={current}>
            <Step title="基本信息" description="新闻标题,新闻分类" />
            <Step title="新闻内容" description="新闻主体内容" />
            <Step title="新闻提交" description="保存草稿或者提交" />
          </Steps>
        </div>
        {/* form表单 */}
        <div
          className={current === 0 ? "" : "active"}
          style={{ marginTop: "50px" }}
        >
          <Form
            name="basic"
            labelAlign="left"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues="basic"
            ref={newsForm}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: "Please input your category!",
                },
              ]}
            >
              <Select>
                {newsCategory.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item></Form.Item>
          </Form>
        </div>
        {/* 富文本编辑 */}
        <div className={current === 1 ? "" : "active"}>
         <NewsEdit editValue={(value) => {setContent(value) }}/>
        </div>
        <div className={current === 3 ? "" : "active"}></div>
        {/* 上下步操作 */}
        <div>
          <Space>
            {current > 0 && (
              <Button type="primary" onClick={handlePrevious}>
                上一步
              </Button>
            )}
            {current < 2 && (
              <Button type="primary" onClick={handleNext}>
                下一步
              </Button>
            )}

            {current === 2 && (
              <Space>
                <Button type="primary" onClick={(first) => { handleSave(0)}}>保存草稿箱</Button>
                <Button type="primary">提交审核</Button>
              </Space>
            )}
          </Space>
        </div>
      </div>
    </div>
  );
}
