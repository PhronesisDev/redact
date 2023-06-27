import React, { ReactNode } from 'react';
import WorkerContext, { WorkerContextArgs, createWorkerContext } from "./WorkerContext";

type WorkerProps ={
    workerContext: WorkerContext;
    children: (arg: WorkerContextArgs)=> ReactNode;
}

const Worker: React.FC <WorkerProps> =({workerContext, children})=>(<workerContext.Consumer>
    {children}
</workerContext.Consumer>)

export default Worker