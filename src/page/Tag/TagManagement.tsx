import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ITag } from '../../types/blog';
import { ProColumns,EditableProTable, PageContainer } from '@ant-design/pro-components';
import { Popconfirm,notification,Button,Tag } from 'antd';
import TagAdd from './TagAdd'

async function fetchAllTags() {
    const { data } = await axios.get('/tag');    
    return data.data.tags;
  }

const TagManagement : React.FC<{}> = () => {
    const [addTagVisible,setAddTagVisible] = useState<boolean>(false)
    const { data:tags,refetch } = useQuery<ITag[]>(["tags"],fetchAllTags)
    console.log(tags);
    const columns: ProColumns<ITag>[]= [
        {
            title:"id",
            dataIndex:"id",
            editable:false
        },
        {   
            title:"标签名",
            dataIndex:"name",
        },
        {
            title:"颜色",
            // dataIndex:"color",
            render: (_2, record, _, _1) => [
              <Tag
                key="color"
                color={record.color}
              >{record.color}</Tag>
              
            ]
        },
        {
            title:"所属类别",
            dataIndex:"cate_id"
        },
        {
          title:"文章数",
          dataIndex:"passage_amount"
        },
        {
            title: '操作',
            valueType: 'option',
            render: (_1, record, _, _2) => [
            //      <a
            //       key="editable"
            //       onClick={() => {
            //       action?.startEditable?.(record.id);
            //     }}
            //   >
            //     编辑
            //   </a>,
                <Popconfirm
                  key='delete'
                  title='确认删除？'
                  onConfirm={() => {
                    console.log(record.id);
                    axios.delete('/tag/'+record.id).then(response => {
                      console.log(response.data.state.ok)
                      if(response.data.state.ok) 
                      notification.success({message: '删除成功'})})
                    .then(() => {refetch()});
              }}
              >
              <a>删除</a>
              </Popconfirm>
            ]
          }
    ]
    return (
    <PageContainer
        title="管理标签">
        <EditableProTable
        rowKey="id"
        columns={columns}
        value={tags}
        recordCreatorProps={false}
        toolBarRender={() => [
            <Button key='create' onClick={() => setAddTagVisible(true)}>
              增加标签
            </Button>
        ]}
        // editable={{
        //     type: 'single',
        //     editableKeys,
        //     onChange: setEditableRowKeys,
        //     onSave: async (rowKey, data) => {
        //       console.log(rowKey);
        //       console.log(data);
        //       axios.put('/tag/'+rowKey,{
        //         name:data.name,
        //         cover:data.color,
        //         cate_id:data.cate_id,
        //       }).then(res => {if(res.data.state.ok) notification.success({message: '编辑成功'})})
        //         .then(refetch)
        //     }
        //   }}
        // editable='false'
        />
      
      <TagAdd visible={addTagVisible} setVisible={setAddTagVisible} refresh={refetch} />
    </PageContainer>
  );
}



export default TagManagement;