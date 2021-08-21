type Status = 'NOT_ATTEMPTED' | 'ATTEMPTED' | 'EVALUATED';

const statusList = [
  'NOT_ATTEMPTED', 'ATTEMPTED', 'EVALUATED'
];

export const isStatus = (status: any): status is Status => {
  return (
    typeof status === 'string'
    && statusList.includes(status) 
  );
}

export default Status;