import React from 'react';

export type WorkerContextArgs = {
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  surname: string;
  setSurname: (surname: string) => void;
  termsAgreement: boolean;
  setTermsAgreement: (termsAgreement: boolean) => void;
};

type WorkerContext = React.Context<WorkerContextArgs>;
export const createWorkerContext = () =>
  React.createContext<WorkerContextArgs>;

export default WorkerContext;
