import WorkerComponentContext from "./provider/WorkerComponentContext";
import { createWorkerContext } from "./provider/WorkerContext";

const getWorkerComponentContext = ()=>({
    workerContext: createWorkerContext()
})
export default getWorkerComponentContext;