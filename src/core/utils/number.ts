export const formatPhoneNumber = (countryCode: string, phoneNumber: string) => {
  return `${countryCode} ${phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}`;
};
