import React, { useState } from 'react';
import { Upload, Button, List, Image, message, Modal, Select, Spin, Row, Col, Switch, Radio, Table } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import OrderTrackingApp from './Maptrackingone';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Import your language files
import englishTranslations from '../../translations/en.json';
import amharicTranslations from '../../translations/am.json';
import affanOromoTranslations from '../../translations/om.json'
import OrderTrackingAppOne from './Maptrackingone';

// Initialize i18next with the translations
i18n.use(initReactI18next).init({
  resources: {
    en: { translation:englishTranslations },
    am: { translation:amharicTranslations },
    om:{translation:affanOromoTranslations} 
  },
  lng: 'en',
  fallbackLng: 'en',
});
// import { convertToAmharic } from "amharic-converter";
const { Option } = Select;

const PrescriptionUpload = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);

  const [searchingMedicine, setSearchingMedicine] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
const [orderSummary, setOrderSummary] = useState({orderNumber:"",deliveryOption:"",paymentOption:""});
const [mapShow,setmapShow]=useState(false)
const [amharicText, setAmharicText] = useState("");
const [language, setLanguage] = useState('amharic');
const [selectedLanguage, setSelectedLanguage] = useState('')
// Initialize i18next with the translations

const { t } = useTranslation();

  const handleLanguageChange = (values) => {
   setSelectedLanguage(values);
    console.log("&&&&&&&&&&&&&&&&&&&&&selected langauge %%%%%%%%%%%",values)
    i18n.changeLanguage(values);
  };
// const handleInputChange = (event) => {
//   const convertedText = language === 'amharic' ? convertToAmharic(event.target.value) : event.target.value;
//   setAmharicText(convertedText);
// };
const convertToAmharic = (value)=>{
if(value=="Delivery"&&language=="amharic"){
  setOrderSummary({...orderSummary, deliveryOption:"ዴሊቨሪ"})
}
if(value=="e-birr"&&language=="amharic"){
  setOrderSummary({...orderSummary, paymentOption:"ኢ-ብር"})
}
}
const convertToAmharicDelivery = (value) => {
  if (value === 'Delivery') {
    return 'ዴሊቨሪ';
  }if (value === 'Self pickup') {
    return 'በአካል መቀበል';
  }
  return value;
};

const convertToAmharicPayment = (value) => {
  if (value === 'e-birr') {
    return 'ኢ-ብር';
  } if (value === 'Chapa') {
    return 'ቻፓ';
  } if (value === 'CBE Birr') {
    return 'ሲቢኢ ብር';
  } if (value === 'Telebirr') {
    return 'ቴሌብር';
  }
  return value;
};

const convertToEnglishDelivery = (value) => {
  if (value === 'ዴሊቨሪ') {
    return 'Delivery';
  }if (value === 'በአካል መቀበል') {
    return 'Self pickup';
  }
  return value;
};

const convertToEnglishPayment = (value) => {
  if (value === 'ኢ-ብር') {
    return 'e-birr';
  }if (value === 'ቻፓ') {
    return 'Chapa';
  } if (value === 'ሲቢኢ ብር') {
    return 'CBE Birr';
  } if (value === 'ቴሌብር') {
    return 'Telebirr';
  }
  return value;
};
const handleLanguageToggle = (value) => {
  const newLanguage = value === 'amharic' ? 'english' : 'amharic';
  console.log("new language",newLanguage);
  setLanguage(newLanguage);
};
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const newPrescriptions = [...prescriptions];
      newPrescriptions.push(reader.result);
      setPrescriptions(newPrescriptions);
      message.success(`${t('prescriptionUploadedSuccess')}`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (index) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions.splice(index, 1);
    setPrescriptions(newPrescriptions);
    message.success(`${t('prescriptionRemovedSuccess')}`);
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
      title: `${t('orderNumber')}`,
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title:  `${t('deliveryOption')}`,
      dataIndex: 'deliveryOption',
      key: 'deliveryOption',
    },
    {
      title: `${t('paymentOption')}`,
      dataIndex: 'paymentOption',
      key: 'paymentOption',
    },
  ];

const data = [
  {
    key: '1',
    orderNumber:orderSummary.orderNumber,
    deliveryOption: orderSummary.deliveryOption,
    paymentOption: orderSummary.paymentOption
  },
];
const datas = [
  {
    key: '1',
    orderNumber:orderSummary.orderNumber,
    deliveryOption: orderSummary.deliveryOption,
    paymentOption: orderSummary.paymentOption,
  },
];
console.log("Order summary",data);
console.log("Converted to amharic",convertToAmharic(orderSummary.deliveryOption));
return (
    <div>
      <div className='flex items-end justify-end pt-10 pr-10'>
      {/* <Select defaultValue="አማርኛ" onChange={handleLanguageToggle}>
  <Option value="english">አማርኛ</Option>
  <Option value="amharic">English</Option>
  <Option value="oromo">Affan oromo</Option>

</Select> */}
<Select defaultValue='en' onChange={handleLanguageChange}>
  <Option value="am">አማርኛ</Option>
  <Option value="en">English</Option>
  <Option value="om">Affan oromo</Option>

</Select>
      </div>
    <div className="mt-10 flex flex-col justify-between items-center">
      <Upload
        beforeUpload={handleUpload}
        showUploadList={false}
      >
        <Button className='bg-[#17CFC0]' icon={<UploadOutlined />} type="primary">{t('uploadPrescription')}</Button>
      </Upload>
      <Button
      className='bg-[#17CFC0]'
        type="primary"
        onClick={handleSendPrescription}
        disabled={prescriptions?.length === 0}
        style={{ marginTop: '1rem' }}
      >
        {t('sendPrescription')}
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
                   {t('remove')}

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
        title={t('searchMedicine')}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleConfirmDelivery}
        okButtonProps={{ disabled: !deliveryOption,style:{backgroundColor:'#17CFC0',color:'white'} }}
        closable={!deliveryOption}
      >
        {searchingMedicine ? (
          <div className="searching-medicine-container">
            <Spin size="large" />
            <p>     { selectedLanguage === 'am'
    ? `${prescriptions.length}  ${t('searching')}`
    : selectedLanguage === 'om'
    ? `${prescriptions.length} ${t('searching')}`
    : `${t('searching')} ${prescriptions.length} ${t('medicine')}` }
 </p>
          </div>
        ) : (
          <>
            <p>                    {t('medicineFound')}

</p>
            <Select defaultValue={t('selfPickUp')} onChange={handleDeliveryOptionChange}>
              <Option value={t('selfPickUp')}>{t('selfPickUp')}</Option>
              <Option value={t('delivery')}>{t('delivery')}</Option>
            </Select>
          </>
        )}
      </Modal>
      <Modal
        title={t('paymentOptions')}
        visible={showModalPayment}
        onCancel={() => setShowModalPayment(false)}
        onOk={handlePaymentConfirmation}
        okButtonProps={{ disabled: !paymentOption, style: { backgroundColor: '#17CFC0', color: 'white' } }}
        closable={!paymentOption}
      >
        <Radio.Group className="flex flex-wrap justify-evenly items-center" onChange={handlePaymentoption}>
          <div className='flex flex-col justify-center items-center'><img width={85} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1686206533/kccmvgw7iqgkkf0ec1b6.png"/>
          <Radio className='flex flex-row' value={t('teleBirr')}>{t('teleBirr')}</Radio></div>
           <div className='flex flex-col justify-center items-center'><img width={45} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1686206912/nqkilybn6ihwhbgj6gqe.webp"/>
           <Radio value={t('cbeBirr')}>{t('cbeBirr')}</Radio></div>
           <div className='flex flex-col justify-center items-center'><img width={85} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1686207005/ipu0zkvizwbfnjyfiwiy.png"/>
           <Radio value={t('eBirr')}>{t('eBirr')}</Radio></div>
           <div className='flex flex-col justify-center items-center'><img width={65} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1686207125/op4nimn67dnvgoj0ocvr.png"/>
           <Radio value={t('chapa')}>{t('chapa')}</Radio></div>
        </Radio.Group>
      </Modal>
     {mapShow&& <OrderTrackingAppOne language={language}/>}
    </div></div>
  );
};

export default PrescriptionUpload;
