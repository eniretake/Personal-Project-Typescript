import { IErrorLog, ILog } from "../interfaces/logs";

export const Log = <T extends new(...args: any[]) => {}>(constructor: T) => {
    return class extends constructor {
        public logs: (ILog | IErrorLog)[] = new Array();
    };
};