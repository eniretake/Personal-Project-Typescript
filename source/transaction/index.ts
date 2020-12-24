import { Log } from "./decorators/log";
import { IErrorLog, ILog } from "./interfaces/logs";
import { IStore } from "./interfaces/store";
import { IScenario } from "./interfaces/scenario";

@Log
export default class Transaction {
  public store: IStore = {};

  public logs: (ILog | IErrorLog)[] = undefined;
  /**
   * this function is protected by seal and it cannot be changed
   * @param Array<IScenario>
   */
  public async dispatch(scenarios: IScenario[]) {

    scenarios.sort((curr, next) => {
      return curr.index > next.index ? 1 : -1;
    });

    if (scenarios[0].index < 0) {
      throw new Error("index must not be negative");
    }

    for (let i = 0; i < scenarios.length; i++) {
      const step = scenarios[i];
      let silent= false;
      if(step.hasOwnProperty('silent')) silent = step.silent;
      const storeBefore = { ...this.store};
      try{
          await step.call(this.store);
          const storeAfter = { ...this.store};
          this.logs.push({ ...step, storeBefore, storeAfter, error: null});
      }catch(e){
          if(!silent){
            if (this.logs !== undefined){
              this.logs.push({ ...step, error: {name: e.name, message: e.message, stack: e.stack}
              });
            }
              for(let j = i-1; j >= 0; j--){
                if (scenarios[j].restore) {
                  try {
                    await scenarios[j].restore(null);
                  } catch (err) {
                    throw err;
                  }
                }
              }
              this.store = null;
              break;
          } else{
              const storeAfter = this.store;
              this.logs.push({ ...step, storeBefore, storeAfter, error: {name: e.name, message: e.message, stack: e.stack}});
          }
      }
    }
  }
}