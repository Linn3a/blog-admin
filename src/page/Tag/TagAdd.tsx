import React from 'react';
import { ModalForm,ProFormSelect,ProFormText } from '@ant-design/pro-components'
import { notification } from "antd"
import axios from 'axios';
import { ITag } from '../../types/blog';
const TagAdd : React.FC<{
    visible: boolean
    setVisible: (v: boolean) => void
    refresh: () => void
}> = ({visible, setVisible, refresh}) => {


  return (
    <ModalForm
      title='添加分类'
      open={visible}
      onOpenChange={setVisible}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={(values) => {

        console.log(values);
    //     console.log(values.pic[0].response.data.url);
       return axios.post('/tag',{
            name:values.name,
            color:values.color,
            cate_id:values.category
        }).then(res => {if(res.data.state.ok) notification.success({message: '添加成功'})})
          .then(refresh);
       
      }}
    >
        <ProFormText
        key="name"
        name="name"
        placeholder="请输入标签名"
        />
        <ProFormText
        key="color"
        name="color"
        placeholder="请输入标签颜色"
        />
        <ProFormSelect
         label="分类"
         name="category"
         mode="single"
         rules={[
           {
             required: true,
           },
         ]}
         request={() => axios.get('cate')
         .then(res => {
            return  res.data.data.cates.map((u:ITag) => {
             return {label: u.name, value: u.id}})})}
       />
      


    </ModalForm>
  );
}


export default TagAdd;