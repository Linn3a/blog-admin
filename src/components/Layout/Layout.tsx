import React from 'react';
import { ProLayout } from '@ant-design/pro-components';
import { Outlet } from 'react-router-dom';
import { RobotOutlined,TeamOutlined,FileTextOutlined,FolderOpenOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const route = {
    path: '/',
    routes: [
    //   {
    //     path: '/admin',
    //     name: '管理管理员',
    //     icon: <RobotOutlined />,
    //   },
      {
        path: '/user',
        name: '管理用户',
        icon: <TeamOutlined />,
      },
      {
        path: '/passage',
        name: '管理文章',
        icon: <FileTextOutlined />,
      },
      {
        path: '/category',
        name: '管理类别',
        icon: <FolderOpenOutlined />,
      }
    ],
  }

  
const Layout : React.FC<{}> = (props) => {
  return (
    <ProLayout
        title = "blog-admin"
        locale='zh-CN'
        logo="https://em-content.zobj.net/thumbs/60/google/350/woman-judge_1f469-200d-2696-fe0f.png"
        route={route}
    >
        <Outlet/>
    </ProLayout>
  );
}

Layout.propTypes = {
  
}

export default Layout;