import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ICategory } from '../../types/blog';
import { ProColumns,PageContainer,EditableProTable } from '@ant-design/pro-components';
import { Popconfirm,notification,Button } from 'antd';
import CategoryAdd from './CategoryAdd';

async function fetchAllCategories() {
  const { data } = await axios.get('/cate');
  return data.data.cates;
}

const Category : React.FC<{}> = (props) => {
  const [addCategoryVisible,setAddCategoryVisible] = useState<boolean>(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  
  const {data:categories,refetch} = useQuery<ICategory[]>(["categories"],fetchAllCategories)
        console.log(categories);
  const columns: ProColumns<ICategory>[]= [
    {
      title:"id",
      dataIndex:"id",
      editable: false,
    },
    {
      title:"类别名",
      dataIndex:"name"
      
    },
    {
      title:"封面",
      dataIndex:"cover"
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
              axios.delete('/cate/'+record.id).then(response => {
                console.log(response.data.state.ok)
                if(response.data.state.ok) 
                notification.success({message: '删除成功'})})
              .then(refetch());
        }}
        >
        <a>删除</a>
        </Popconfirm>
      ]
    }

  ]
  return (
    <PageContainer
      header={{
        title:"管理分类"
      }}
      >
        <EditableProTable<ICategory>
            search={false}
            // options={false}
            rowKey="id"
            value={categories}
            columns={columns}
            tableStyle={{
              width:"100%"
            }}
            toolBarRender={() => [
              <Button key='create' onClick={() => setAddCategoryVisible(true)}>
                增加分类
              </Button>
          ]}
          recordCreatorProps={false}
          editable={{
            type: 'single',
            editableKeys,
            onChange: setEditableRowKeys,
            onSave: async (rowKey, data) => {
              console.log(rowKey);
              console.log(data);
              axios.put('/cate/'+rowKey,{
                name:data.name,
                cover:data.cover
              }).then(res => {if(res.data.state.ok) notification.success({message: '编辑成功'})})
                .then(refetch)
            }
          }}
        />
         <CategoryAdd visible={addCategoryVisible} setVisible={setAddCategoryVisible} refresh={refetch} />
        </PageContainer>
  );
}


export default Category;
