import React from 'react';
import { PageContainer,ProColumns,ProTable } from '@ant-design/pro-components';
import { Popconfirm,Button,notification } from 'antd';
import { IUser } from '../../types/blog';
import axios from 'axios';
import { fetchAllUsers } from './api';
import { useQuery } from '@tanstack/react-query';

axios.defaults.baseURL = 'http://127.0.0.1:8080'

const User : React.FC<{}> = (props) => {
    const { data: users,refetch } = useQuery<IUser[]>(['users'], fetchAllUsers);
      console.log(users);
    const columns: ProColumns<IUser>[]= [{
        title: 'ID',
        dataIndex: 'id',
        },{
        title: '用户名',
        dataIndex: 'username',
        },{
        title: '性别',
        dataIndex:'gender',
        valueEnum:{
            1:{text:'女 '},
            2:{text:'男 '},
            3:{text:'其它'}
        }
        },{
          title:'管理员',
          dataIndex:'is_admin',
          valueEnum:{
            false:{text:'否'},
            true:{text:'是'}
        }
        },{
            title:'上次登录',
            dataIndex:'last_login',
        },{
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [ 
        <Popconfirm
          key='delete'
          title='确认删除？'
          onConfirm={() => {
            console.log(record.id);
            axios.delete('/user/'+record.id).then(response => {
                console.log(response.data.state.ok)
                if(response.data.state.ok) 
                notification.success({message: '删除成功'})})
                .then(refetch);
          }}
        >
          <a>删除</a>
        </Popconfirm>,
        <Button
          onClick={() => {
            if(record.id == 1) notification.error({message: '不能修改根用户权限'});
            else {
            console.log(record.is_admin);
            console.log({
              id: record.id,
              is_admin: !record.is_admin});
            
            axios.put('/admin/'+record.id,{
                is_admin: !record.is_admin
            }).then(response => {
                console.log(response.data.state.ok)
                if(response.data.state.ok) 
                notification.success({message: '修改成功'})})
                .then(refetch);
          }}}
        >设为/取消管理员</Button>
      ],
    },
        
];
  return (
    <PageContainer
        
        >
      
        <ProTable
            
            rowKey="id"
            dataSource={users}
            columns={columns}
        />
    </PageContainer>
  );
}

User.propTypes = {
  
}

export default User;