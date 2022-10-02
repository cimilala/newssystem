import {
  AppstoreOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  
  const items = [
    getItem('首页', '/home', <PieChartOutlined />),
    getItem('用户管理', '/sub1', <MailOutlined />, [
      getItem('用户列表', '/user'),
     
    ]),
    getItem('权限管理', 'sub2', <AppstoreOutlined />, [
      getItem('角色列表', '/role'),
      getItem('权限列表', '/auth'),
    ]),

    getItem('新闻管理', '/news', <PieChartOutlined />),
    getItem('审核管理', '/check', <PieChartOutlined />),
    getItem('发布管理', '/pub', <PieChartOutlined />),
  ];

  export default items