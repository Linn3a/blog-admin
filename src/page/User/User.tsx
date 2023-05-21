import React from 'react';
import { PageContainer,ProColumns,ProTable } from '@ant-design/pro-components';
import { Popconfirm,Button,notification } from 'antd';
import { IUser } from '../../types/blog';
import axios from 'axios';
import { fetchAllUsers } from './api';
import { useQuery } from '@tanstack/react-query';


axios.defaults.baseURL = 'http://124.220.198.163:8080'
// axios.defaults.baseURL = 'http://localhost:8080'


const User : React.FC<{}> = () => {
    const { data: users,refetch } = useQuery<IUser[]>(['users'], fetchAllUsers);
      console.log(users);
      // users == undefined ? [] : users;
      
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
        },
        {
          title:'生日',
          dataIndex:'birthday',
        },{
            title: '操作',
            valueType: 'option',
            render: (_1, record, _, _2) => [ 
        <Popconfirm
          key='delete'
          title='确认删除？'
          onConfirm={() => {
            console.log(record.id);
            axios.delete('/user/'+record.id).then(response => {
                console.log(response.data.state.ok)
                if(response.data.state.ok) 
                notification.success({message: '删除成功'})})
                .then(() => {refetch()});
          }}
        >
          <a>删除</a>
        </Popconfirm>,
        <Button
          onClick={() => {
            if(record.id == 1) notification.error({message: '不能修改根用户权限'});
            else {
            console.log({
              id: record.id,
              is_admin: !record.is_admin});
            
            axios.put('/admin/'+record.id,{
                is_admin: !record.is_admin
            }).then(response => {
                console.log(response.data.state.ok)
                if(response.data.state.ok) 
                notification.success({message: '修改成功'})})
                .then(() => {refetch()});
          }}}
        >设为/取消管理员</Button>
      ],
    },
        
];
  return (
    <PageContainer
      header={{
        title:"管理用户"
      }}
      >
      
        <ProTable
            search={false}
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