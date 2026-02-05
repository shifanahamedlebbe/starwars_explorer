import { IErrorTryCatch } from 'services/type';

const handleApiError = (error: IErrorTryCatch) => {
  const knownError = error as IErrorTryCatch;
  return {
    status: error.status,
    data: {
      message: knownError.data.message,
    },
  };
};

export default handleApiError;
