import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IPassage } from '../../types/blog';
import { ProColumns,EditableProTable, PageContainer } from '@ant-design/pro-components';
import { Popconfirm,notification,Button,Tag } from 'antd';
import PassageAdd from './PassageAdd'

async function fetchAllPassages() {
    const { data } = await axios.get('/p');    
    return data.data.passages;
  }

const Passage : React.FC<{}> = (props) => {
    const [addPassageVisible,setAddPassageVisible] = useState<boolean>(false)
    const [editableKeys,setEditableRowKeys] = useState<React.Key[]>([]);
    const { data:passages,refetch } = useQuery<IPassage[]>(["passages"],fetchAllPassages)
    console.log(passages);
    const columns: ProColumns<IPassage>[]= [
        {
            title:"id",
            dataIndex:"id",
            editable:false
        },
        {   
            title:"标题",
            dataIndex:"title",
        },
        {
            title:"描述",
            dataIndex:"desc",
        },
        {
            title:"标签",
            dataIndex: 'tags',
            width: '20%',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
            render: (_, row) => row?.tags?.map((item,index) => <Tag key={index}>{item.name}</Tag>),
        },
        {
            title:"所属类别",
            dataIndex:"cate_id"
            
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                 <a
                  key="editable"
                  onClick={() => {
                  action?.startEditable?.(record.id);
                }}
              >
                编辑
              </a>,
                <Popconfirm
                  key='delete'
                  title='确认删除？'
                  onConfirm={() => {
                    console.log(record.id);
                    axios.delete('/p/'+record.id).then(response => {
                      console.log(response.data.state.ok)
                      if(response.data.state.ok) 
                      notification.success({message: '删除成功'})})
                    .then(refetch);
              }}
              >
              <a>删除</a>
              </Popconfirm>
            ]
          }
    ]
    return (
    <PageContainer
        title="管理文章">
        <EditableProTable
        rowKey="id"
        columns={columns}
        value={passages}
        recordCreatorProps={false}
        toolBarRender={() => [
            <Button key='create' onClick={() => setAddPassageVisible(true)}>
              增加文章
            </Button>
        ]}
        editable={{
            type: 'single',
            editableKeys,
            onChange: setEditableRowKeys,
            // onSave: async (rowKey, data) => {
            //   console.log(rowKey);
            //   console.log(data);
            //   axios.put('/cate/'+rowKey,{
            //     name:data.name,
            //     cover:data.cover
            //   }).then(res => {if(res.data.state.ok) notification.success({message: '编辑成功'})})
            //     .then(refetch)
            // }
          }}
        />
      
      <PassageAdd visible={addPassageVisible} setVisible={setAddPassageVisible} refresh={refetch} />
    </PageContainer>
  );
}



export default Passage;