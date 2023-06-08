import React, { useState } from 'react';
import { Upload, Button, List, Image, message, Modal, Select, Spin, Row, Col, Switch, Radio, Table } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import OrderTrackingApp from './Maptracking';
import { convertToAmharic } from "amharic-converter";
const { Option } = Select;

const PrescriptionUploader = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);

  const [searchingMedicine, setSearchingMedicine] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
const [orderSummary, setOrderSummary] = useState({orderNumber:"",deliveryOption:"",paymentOption:""});
const [mapShow,setmapShow]=useState(false)
const [amharicText, setAmharicText] = useState("");
const handleInputChange = (event) => {
  const englishText = event.target.value;
  const convertedText = convertToAmharic(englishText);
  setAmharicText(convertedText);
};
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const newPrescriptions = [...prescriptions];
      newPrescriptions.push(reader.result);
      setPrescriptions(newPrescriptions);
      message.success('Prescription uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (index) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions.splice(index, 1);
    setPrescriptions(newPrescriptions);
    message.success('Prescription removed successfully!');
  };

  const handleSendPrescription = () => {
    setShowModal(true);
    setSearchingMedicine(true);

    // Simulating searching for medicine
    setTimeout(() => {
      setSearchingMedicine(false);
    }, 3000);
  };

  const handleDeliveryOptionChange = (value) => {
    setDeliveryOption(value);
    setOrderSummary(
      { ...orderSummary, orderNumber: "#12345", deliveryOption: value},
    );
  };

  const handleConfirmDelivery = () => {
    // Perform any necessary logic for confirming the delivery option
    // and proceed to the map tracking part
    setShowModal(false);
    setShowModalPayment(true)
    setPrescriptions([])
   

  };
  const handlePaymentoption=(value)=>{
  setPaymentOption(value)
  setOrderSummary({...orderSummary,paymentOption: value.target.value} );
      }
  const handlePaymentConfirmation=()=>{
setShowModalPayment(false)
setmapShow(true)
    setPrescriptions([])
  }


const columns = [
  {
    title: 'ትዕዛዝ ቁጥር',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
  },
  {
    title: 'ትዕዛዘ መቀበያ አማራጭ',
    dataIndex: 'deliveryOption',
    key: 'deliveryOption',
  },
  {
    title: 'የክፈያ አማራጭ',
    dataIndex: 'paymentOption',
    key: 'paymentOption',
  },
];

const data = [
  {
    key: '1',
    orderNumber: orderSummary.orderNumber,
    deliveryOption: orderSummary.deliveryOption,
    paymentOption: orderSummary.paymentOption,
  },
];
console.log("Order summary",data);
  return (
    <div>
      {/* <div className='flex items-end justify-end pt-10 pr-10'>
      <button className='' type="primary">Langauge</button>
      </div> */}
    <div className="mt-10 flex flex-col justify-between items-center">
      <Upload
        beforeUpload={handleUpload}
        showUploadList={false}
      >
        <Button className='bg-[#17CFC0]' icon={<UploadOutlined />} type="primary">የህኪም ማዘዣ አስገባ</Button>
      </Upload>
      <Button
      className='bg-[#17CFC0]'
        type="primary"
        onClick={handleSendPrescription}
        disabled={prescriptions?.length === 0}
        style={{ marginTop: '1rem' }}
      >
        የህኪም ማዘዣ ላክ
      </Button>
      {prescriptions.length > 0 ? (
  <List
    dataSource={prescriptions}
    renderItem={(prescription, index) => (
      <List.Item
        className='flex flex-col items-center justify-center'
        key={index}
        actions={[
          <Button
            className='bg-[#17CFC0] justify-center text-white flex items-center'
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(index)}
            type="link"
          >
            አጥፋ
          </Button>
        ]}
      >
        <Image className='mb-4' src={prescription} alt="Prescription" width={200} />
      </List.Item>
    )}
  />
) : (
  mapShow && (
    <div className='flex w-full flex-col items-center justify-center p-4'>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  )
)}

      
      <Modal
        title="መድሃኒት ፈልግ"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleConfirmDelivery}
        okButtonProps={{ disabled: !deliveryOption,style:{backgroundColor:'#17CFC0',color:'white'} }}
        closable={!deliveryOption}
      >
        {searchingMedicine ? (
          <div className="searching-medicine-container">
            <Spin size="large" />
            <p>{prescriptions.length} መድሃኒት በመፈለግ ላይ...</p>
          </div>
        ) : (
          <>
            <p>መድሃኒት ተገኝቷል! የማድረስ አማራጭ ይምረጡ፡-</p>
            <Select defaultValue="በአካል መቀበል" onChange={handleDeliveryOptionChange}>
              <Option value="በአካል መቀበል">በአካል መቀበል</Option>
              <Option value="ዴሊቨሪ">ዴሊቨሪ</Option>
            </Select>
          </>
        )}
      </Modal>
      <Modal
        title="ክፍያ አማራጭ"
        visible={showModalPayment}
        onCancel={() => setShowModalPayment(false)}
        onOk={handlePaymentConfirmation}
        okButtonProps={{ disabled: !paymentOption, style: { backgroundColor: '#17CFC0', color: 'white' } }}
        closable={!paymentOption}
      >
        <Radio.Group className="flex flex-wrap justify-evenly items-center" onChange={handlePaymentoption}>
          <div className='flex flex-col justify-center items-center'><img width={85} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1686206533/kccmvgw7iqgkkf0ec1b6.png"/>
          <Radio className='flex flex-row' value="ቴሌብር">ቴሌብር</Radio></div>
           <div className='flex flex-col justify-center items-center'><img width={45} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1686206912/nqkilybn6ihwhbgj6gqe.webp"/>
           <Radio value="ሲቢኢ ቢር">ሲቢኢ ቢር</Radio></div>
           <div className='flex flex-col justify-center items-center'><img width={85} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1686207005/ipu0zkvizwbfnjyfiwiy.png"/>
           <Radio value="ኢ-ቢር">ኢ-ቢር</Radio></div>
           <div className='flex flex-col justify-center items-center'><img width={65} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1686207125/op4nimn67dnvgoj0ocvr.png"/>
           <Radio value="ቻፓ">ቻፓ</Radio></div>
        </Radio.Group>
      </Modal>
     {mapShow&& <OrderTrackingApp/>}
    </div></div>
  );
};

export default PrescriptionUploader;
