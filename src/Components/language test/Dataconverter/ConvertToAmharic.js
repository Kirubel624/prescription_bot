export const convertToAmharicDelivery = (value) => {
    if (value === 'Delivery') {
      return 'ዴሊቨሪ';
    }if (value === 'Self Pickup') {
      return 'በአካል መቀበል';
    }
    if (value === 'Qaqqabsiisuu') {
        return 'ዴሊቨሪ';
      }if (value === 'Qaamaan simachuu') {
        return 'በአካል መቀበል';
      }
    return value;
  };
  
export  const convertToAmharicPayment = (value) => {
    if (value === 'e-birr') {
      return 'ኢ-ብር';
    } if (value === 'Chapa') {
      return 'ቻፓ';
    } if (value === 'CBE Birr') {
      return 'ሲቢኢ-ብር';
    } if (value === 'Telebirr') {
      return 'ቴሌብር';
    }
    return value;
  };
  