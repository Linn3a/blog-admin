import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ICategory, IPassage, ITag } from '../../types/blog';
import { PageContainer, ProTable,ProColumns } from '@ant-design/pro-components';
import { Popconfirm,Button,notification } from 'antd';

axios.defaults.baseURL = 'http://127.0.0.1:8080'

async function fetchCategory( id:number ) {
    const { data } = await axios.get(`/cate/${id}`);    
    return data.data.cates;
  }
const CategoryManagement : React.FC<{}> = (props) => {
  const { id } = useParams();
  console.log(id);
  const { data:category,refetch} = useQuery<ICategory>(["category",id],() => fetchCategory(id))
    const passages:IPassage[] = category?.passages
    console.log(passages);
    const tags:Itag[] = category?.tags
    console.log(tags);

    const passageColomn:ProColumns<IPassage>[] = [
        {
            title:"id",
            dataIndex:"id"
        },
        {
            title:"文章名",
            dataIndex:"title"
        },
        {
            title:"操作",
            valueType:"option",
            render: (text, record, _, action) => [
                <Popconfirm
                  key='delete'
                  title='确认删除？'
                  onConfirm={() => {
                    console.log(record.id);
                    const newPassage = new Array;
                    passages.forEach(item => {
                        if(item.id!=record.id)
                        newPassage.push({"id":item.id})
                    });
                    console.log(newPassage);
               
                    axios.put('/cate/'+record.id,{
                        "passages":newPassage
                    }).then(response => {
                      console.log(response.data.state.ok)
                      if(response.data.state.ok) 
                      notification.success({message: '删除成功'})})
                    .then(refetch);
                 }}
            >
            <a>删除</a>
            </Popconfirm>]}
            
    ];
    const tagColomn:ProColumns<ITag>[] = [
        {
            title:"id",
            dataIndex:"id"
        },
        {
            title:"标签名",
            dataIndex:"name"
        },
        {
            title:"操作",
            valueType:"option",
            render: (text, record, _, action) => [
                <Popconfirm
                  key='delete'
                  title='确认删除？'
                  onConfirm={() => {
                    console.log(record.id);
                    console.log(text);
                    
                    // axios.delete('/cate/'+record.id).then(response => {
                    //   console.log(response.data.state.ok)
                    //   if(response.data.state.ok) 
                    //   notification.success({message: '删除成功'})})
                    // .then(refetch);
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
            title:`管理分类: ${category?.name}`,

        }}
    >
      <ProTable
            search={false}
            headerTitle="管理该分类下的文章"
            columns={passageColomn}
            dataSource={passages}
            toolBarRender={() => [
                <Button key='create' onClick={() => setAddMaterialVisible(true)}>
                  增加文章
                </Button>
            ]}
            />
        <ProTable
            search={false}
            headerTitle="管理该分类下的标签"
            columns={tagColomn}
            dataSource={tags}
            />
    
    </PageContainer>
  );
}


export default CategoryManagement;