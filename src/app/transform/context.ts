import React, { useContext } from 'react';

const TransferContext = React.createContext({} as any);

export default TransferContext;

export function useTransferContext() {
  return useContext(TransferContext);
}
