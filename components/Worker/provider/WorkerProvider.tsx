import React, {ReactNode, useState} from 'react';
import WorkerContext, { WorkerContextArgs, createWorkerContext } from './WorkerContext';

type WorkerProviderProps = {
  workerContext: WorkerContext;
  children:ReactNode;
};

 const WorkerProvider: React.FC<WorkerProviderProps> = ({
  workerContext,
  children,
}) => {
  const [username, setUsername] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [termsAgreement, setTermsAgreement] = useState<boolean>(false);
  return (
    <workerContext.Provider
      value={{
        username,
        setUsername,
        surname,
        setSurname,
        email,
        setEmail,
        password,
        setPassword,
        termsAgreement,
        setTermsAgreement,
      }}>
      {children}
    </workerContext.Provider>
  );
};
export default WorkerProvider