export const convertToAffanOromoDelivery = (value) => {
    if (value === 'ዴሊቨሪ') {
      return 'Qaqqabsiisuu';
    }if (value === 'በአካል መቀበል') {
      return 'Qaamaan simachuu';
    }  if (value === 'Delivery') {
        return 'Qaqqabsiisuu';
      }if (value === 'Self Pickup') {
        return 'Qaamaan simachuu';
      }
    return value;
  };
  
  export const convertToAffanOromoPayment = (value) => {
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