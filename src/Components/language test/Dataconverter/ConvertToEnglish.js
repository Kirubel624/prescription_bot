export const convertToEnglishDelivery = (value) => {
    if (value === 'ዴሊቨሪ') {
      return 'Delivery';
    }if (value === 'በአካል መቀበል') {
      return 'Self pickup';
    } if (value === 'Qaqqabsiisuu') {
        return 'Delivery';
      }if (value === 'Qaamaan simachuu') {
        return 'Self pickup';
      }
    return value;
  };
  
  export const convertToEnglishPayment = (value) => {
    if (value === 'ኢ-ብር') {
      return 'e-birr';
    }if (value === 'ቻፓ') {
      return 'Chapa';
    } if (value === 'ሲቢኢ ብር') {
      return 'CBE Birr';
    } if (value === 'ቴሌብር') {
      return 'telebirr';
    }
    return value;
  };