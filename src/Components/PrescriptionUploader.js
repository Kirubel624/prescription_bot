import React, { useState } from 'react';
import { Upload, Button, List, Image, message, Modal, Select, Spin, Row, Col } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const PrescriptionUploader = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchingMedicine, setSearchingMedicine] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null);

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
  };

  const handleConfirmDelivery = () => {
    // Perform any necessary logic for confirming the delivery option
    // and proceed to the map tracking part
    setShowModal(false);
  };

  return (
    <div className="mt-10 flex flex-col justify-between items-center">
      <Upload
        beforeUpload={handleUpload}
        showUploadList={false}
      >
        <Button className='bg-[#17CFC0]' icon={<UploadOutlined />} type="primary">Upload Prescription</Button>
      </Upload>
      <Button
      className='bg-[#17CFC0]'
        type="primary"
        onClick={handleSendPrescription}
        disabled={prescriptions.length === 0}
        style={{ marginTop: '1rem' }}
      >
        Send Prescription
      </Button>
      <List
        dataSource={prescriptions}
        renderItem={(prescription, index) => (
          <List.Item  className='flex flex-col items-center justify-center'
            key={index}
            actions={[
              <Button
                className='bg-[#17CFC0] justify-center text-white flex items-center'
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(index)}
                type="link"
              >
                Remove
              </Button>
            ]}
          >
            <Image className='mb-4' src={prescription} alt="Prescription" width={200} />
          </List.Item>
        )}
      />
      
      <Modal
        title="Medicine Search"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleConfirmDelivery}
        okButtonProps={{ disabled: !deliveryOption,style:{backgroundColor:'#17CFC0',color:'white'} }}
        closable={!deliveryOption}
      >
        {searchingMedicine ? (
          <div className="searching-medicine-container">
            <Spin size="large" />
            <p>Searching for {prescriptions.length} medicines...</p>
          </div>
        ) : (
          <>
            <p>Medicine found! Choose a delivery option:</p>
            <Select defaultValue="self-pickup" onChange={handleDeliveryOptionChange}>
              <Option value="self-pickup">Self Pickup</Option>
              <Option value="delivery">Delivery</Option>
            </Select>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PrescriptionUploader;
