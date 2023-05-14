import React from 'react';
import { ModalForm,ProFormText,ProFormUploadButton } from '@ant-design/pro-components'
import { notification } from "antd"
import axios from 'axios';
const CategoryAdd : React.FC<{
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
        console.log(values.pic[0].response.data.url);
       return axios.post('/cate',{
            name:values.name,
            cover:values.pic[0].response.data.url
        }).then(res => {if(res.data.state.ok) notification.success({message: '添加成功'})})
          .then(refresh);
       
      }}
    >
        <ProFormText
        key="name"
        name="name"
        placeholder="请输入类别名"
        />
        <ProFormUploadButton name="pic" label="上传头像"  action={"http://127.0.0.1:8080/upload"}   
  />


    </ModalForm>
  );
}

CategoryAdd.propTypes = {
  
}

export default CategoryAdd;