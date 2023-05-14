import React from 'react';
import {  ProLayout } from '@ant-design/pro-components';
import { Outlet,NavLink } from 'react-router-dom';
import { TeamOutlined,FileTextOutlined,FolderOpenOutlined,TagOutlined } from '@ant-design/icons';


const route = {
    path: '/',
    routes: [
      {
        path: '/user/',
        name: '管理用户',
        icon: <TeamOutlined />,
      },
      {
        path: '/passage/',
        name: '管理文章',
        icon: <FileTextOutlined />,
      },
      {
        path: '/category/',
        name: '管理类别',
        icon: <FolderOpenOutlined />,
      },
      {
        path:'/tag/',
        name:'管理标签',
        icon:<TagOutlined />,
      }
    ],
  }

  
const Layout : React.FC<{}> = (props) => {
  return (
    <ProLayout
        title = "博客管理系统"
        locale='zh-CN'
        logo="https://em-content.zobj.net/thumbs/60/google/350/woman-judge_1f469-200d-2696-fe0f.png"
        route={route}
        menuItemRender={(item:any, dom:any) => 
          <NavLink to={item.path || '/'}>{dom}</NavLink>
        }
    >
      <Outlet/>
    </ProLayout>
  );
}


export default Layout;