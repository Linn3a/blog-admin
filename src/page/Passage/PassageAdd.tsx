import React,{useRef, useState} from 'react';
import { ModalForm,ProFormText,ProFormUploadButton,StepsForm,ProFormInstance,ProFormTextArea,ProFormSelect } from '@ant-design/pro-components'
import { notification,Tag } from "antd"
import axios from 'axios';
import { ITag, IinsertedPassage } from '../../types/blog';
const PassageAdd : React.FC<{
    visible: boolean
    setVisible: (v: boolean) => void
    refresh: () => void
}> = ({visible, setVisible, refresh}) => {

    const formRef = useRef<ProFormInstance>();
    const [newPassage,setNewPassage] = useState<IinsertedPassage>({
        title:"",
        desc:"",
        content:"",
        cate_id:0,
        tags:[]
    })
    const [tags,setTags] = useState<ITag[]>([]);
    const tagRender = (props: CustomTagProps) => {
      const { label, value, closable, onClose } = props;
      const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginRight: 3 }}
        >
          {label}
        </Tag>
      );
    };

           
           

  return (
    <ModalForm
      title='添加文章'
      open={visible}
      onOpenChange={setVisible}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={() => {refresh}}
    >
        {/* <ProFormText
        key="name"
        name="name"
        placeholder="请输出类别名"
        />
        <ProFormUploadButton name="pic" label="上传头像"  action={"http://127.0.0.1:8080/upload"}   
  />
     */}
     <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
         
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="文章内容"
          stepProps={{
            description: '文章相关内容',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            let passage = {
                title:formRef.current?.getFieldsValue().title,
                desc:formRef.current?.getFieldsValue().desc,
                content:formRef.current?.getFieldsValue().content,
                cate_id:0,
                tags:[]
            }
            setNewPassage(passage)
            // await waitTime(2000);
            //   axios.post('/p',{
            //     name:formRef.current?.getFieldsValue().name,
            //     title:formRef.current?.getFieldsValue().title,
            //     content:formRef.current?.getFieldsValue().content,
            // })
           
            
             return true;
          }}
        >
          <ProFormText
            name="title"
            label="文章标题"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
       
          <ProFormTextArea
            name="desc"
            label="描述"
            width="lg"
            placeholder="请输入备注"
          />
          <ProFormTextArea
            name="content"
            label="内容"
            width="lg"
            placeholder="请输入文章内容"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="category"
          title="文章分类"
          stepProps={{
            description: '请给文章分类',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            const catedata = formRef.current?.getFieldsValue().category;
            axios.get(`cate/${catedata}`).then(res => {
              setTags(res.data.data.cate.tags)
            })
            console.log(newPassage);
            newPassage.cate_id = formRef.current?.getFieldsValue().category;
            return true;
          }}
        >
         
         
         <ProFormSelect
            label="分类"
            name="category"
            rules={[
              {
                required: true,
              },
            ]}
            request={() => axios.get('cate')
            .then(res => {
               return  res.data.data.cates.map(u => {
                return {label: u.name, value: u.id}})})}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="tags"
          title="标签"
          stepProps={{
            description: '文章标签',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            
            console.log(newPassage);
            newPassage.tags = formRef.current?.getFieldsValue().tags.map(item => ({"id":item}));
            axios.post('p',newPassage).then(
              res => { 
                if(res.data.state.ok) 
                notification.success({message:"添加文章成功"})
                return true;
              }
            )
          }}
        >
       
          <ProFormSelect
            label="标签"
            name="tags"
            mode="multiple"
            tagRender={tagRender}
            rules={[
              {
                required: true,
              },
            ]}
            // request={() => axios.get(`cate/${category}`)
            // .then(res => {
            //     console.log(`cate/${category}`);
            // console.log(newPassage);
            //     console.log(res.data.data);
            //     return  res.data.data.tags.map(u => {
            //         return {label: u.name, value: u.id}})})}
            options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
            
          />
         
        </StepsForm.StepForm>
      </StepsForm>
    </ModalForm>
  );
}



export default PassageAdd;