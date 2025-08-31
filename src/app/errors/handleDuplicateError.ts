/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;

  // Extract the duplicated field name from Mongo error
  const duplicatedField = Object.keys(err?.keyPattern || {})[0]; // e.g., "email"
  const duplicatedValue = err?.keyValue?.[duplicatedField]; // e.g., "robiul@gmail.com"

  const errorSources: TErrorSources = [
    {
      path: duplicatedField || '', // fallback: ''
      message: duplicatedValue
        ? `এই ${duplicatedField} ইতোমধ্যে ব্যবহৃত হয়েছে!`
        : "এই তথ্য ইতোমধ্যে ব্যবহৃত হয়েছে",
    },
  ];

  return {
    statusCode,
    message: 'Duplicate field error',
    errorSources,
  };
};

export default handleDuplicateError;