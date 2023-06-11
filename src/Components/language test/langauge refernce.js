import React, { useState } from 'react';
import { Upload, Button, List, Image, message, Modal, Select, Spin, Table } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import OrderTrackingApp from './Maptracking';
import { convertToAmharic } from "amharic-converter";
import i18n from './i18n'; // Assuming you have set up i18next

const { Option } = Select;

const PrescriptionUploader = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [searchingMedicine, setSearchingMedicine] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const [orderSummary, setOrderSummary] = useState({ orderNumber: "", deliveryOption: "", paymentOption: "" });
  const [mapShow, setMapShow] = useState(false);
  const [amharicText, setAmharicText] = useState("");
  const [language, setLanguage] = useState('amharic');

  const handleInputChange = (event) => {
    const convertedText = language === 'amharic' ? convertToAmharic(event.target.value) : event.target.value;
    setAmharicText(convertedText);
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === 'amharic' ? 'english' : 'amharic';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // Update the language in i18next
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const newPrescriptions = [...prescriptions];
      newPrescriptions.push(reader.result);
      setPrescriptions(newPrescriptions);
      message.success(i18n.t('prescriptionUploadedSuccess'));
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (index) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions.splice(index, 1);
    setPrescriptions(newPrescriptions);
    message.success(i18n.t('prescriptionRemovedSuccess'));
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
    setOrderSummary({ ...orderSummary, orderNumber: "#12345", deliveryOption: value });
  };

  const handleConfirmDelivery = () => {
    setShowModal(false);
    setShowModalPayment(true);
    setPrescriptions([]);
  };

  const handlePaymentoption = (value) => {
    setPaymentOption(value);
    setOrderSummary({ ...orderSummary, paymentOption: value.target.value });
  };

  const handlePaymentConfirmation = () => {
    setShowModalPayment(false);
    setMapShow(true);
    setPrescriptions([]);
  };

  const columns = [
    {
      title: i18n.t('orderNumber'),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: i18n.t('deliveryOption'),
      dataIndex: 'deliveryOption',
      key: 'deliveryOption',
    },
    {
        title: i18n.t('paymentOption'),
        dataIndex: 'paymentOption',
        key: 'paymentOption',
      },
      {
        title: i18n.t('actions'),
        key: 'actions',
        render: (_, record, index) => (
          <Button
            type="link"
            onClick={() => handleRemove(index)}
            icon={<DeleteOutlined />}
          >
            {i18n.t('remove')}
          </Button>
        ),
      },
    ];
  
    return (
      <div>
        <h1>{i18n.t('prescriptionUploader')}</h1>
        <div>
          <Upload
            beforeUpload={handleUpload}
            accept="image/*"
            multiple={false}
          >
            <Button icon={<UploadOutlined />}>
              {i18n.t('uploadPrescription')}
            </Button>
          </Upload>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={prescriptions}
            renderItem={(item, index) => (
              <List.Item>
                <Image src={item} />
                <Button
                  type="link"
                  onClick={() => handleRemove(index)}
                  icon={<DeleteOutlined />}
                >
                  {i18n.t('remove')}
                </Button>
              </List.Item>
            )}
          />
        </div>
        <div>
          <Button type="primary" onClick={handleSendPrescription}>
            {i18n.t('sendPrescription')}
          </Button>
        </div>
        <Modal
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onOk={handleConfirmDelivery}
        >
          {searchingMedicine ? (
            <Spin size="large" />
          ) : (
            <>
              <Select
                style={{ width: 200, marginBottom: 16 }}
                placeholder={i18n.t('selectDeliveryOption')}
                onChange={handleDeliveryOptionChange}
                value={deliveryOption}
              >
                <Option value="option1">{i18n.t('option1')}</Option>
                <Option value="option2">{i18n.t('option2')}</Option>
                <Option value="option3">{i18n.t('option3')}</Option>
              </Select>
              <Table
                dataSource={[orderSummary]}
                columns={columns}
                pagination={false}
              />
            </>
          )}
        </Modal>
        <Modal
          visible={showModalPayment}
          onCancel={() => setShowModalPayment(false)}
          onOk={handlePaymentConfirmation}
        >
          <Select
            style={{ width: 200 }}
            placeholder={i18n.t('selectPaymentOption')}
            onChange={handlePaymentoption}
            value={paymentOption}
          >
            <Option value="option1">{i18n.t('option1')}</Option>
            <Option value="option2">{i18n.t('option2')}</Option>
            <Option value="option3">{i18n.t('option3')}</Option>
          </Select>
        </Modal>
        {mapShow && <OrderTrackingApp />}
      </div>
    );
  };
  
  export default PrescriptionUploader;