import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { IComment } from '../../types/blog';
import { useQuery } from '@tanstack/react-query';
import { PageContainer,ProColumns,EditableProTable } from '@ant-design/pro-components';
import { Popconfirm,notification } from 'antd';

async function fetchComments(id:string) {
    const { data } = await axios.get(`/comment/${id}`);
    return data.data.comments as IComment[];
}
const Comment : React.FC<{}> = () => {
    const { id } = useParams();
    console.log(id);
    const { data,refetch } = useQuery(['comments',id],() => fetchComments(id||""))
    console.log(data);
    const columns: ProColumns<IComment>[]= [
      {
        title: 'id',
        dataIndex: 'id',
        editable: false,
      },
      {
        title: '评论内容',
        dataIndex: 'content',
      },
      {
        title: '评论者',
        dataIndex: 'user_id',
      },
      {
        title: '评论时间',
        dataIndex: 'created_at',
      },
      {
        title: '操作',
        valueType: 'option',
        render: (_1, record, _, _2) => [
          <Popconfirm
          key='delete'
          title='确认删除？'
          onConfirm={() => {
            console.log(record.id);
            axios.delete('/comment/'+record.id).then(response => {
              console.log(response.data.state.ok)
              if(response.data.state.ok) 
              notification.success({message: '删除成功'})
              refetch();
            })
            
      }}
      >
      <a>删除</a>
      </Popconfirm>,
        ]
      }
    ]
  return (
    <PageContainer
    title="管理评论">
      <EditableProTable
        columns={columns}
        value={data}
        recordCreatorProps={false}
        rowKey="id"
      />

    </PageContainer>
  );
}

Comment.propTypes = {
  
}

export default Comment;