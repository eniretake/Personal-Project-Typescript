import Transaction from "./transaction/index";
import { IScenario } from "./transaction/interfaces/scenario";
import {  IStore } from "./transaction/interfaces/store";

const scenario: IScenario[] = [
    {
    index: 2,
    meta: {
        title: '2nd title',
        description: '2nd description'
    },
    call: async (store) => {
        store.second = '2';
    },
},
{
    index: 1,
    meta: {
        title: '1st title',
        description: '1st Description'
    },
    call: async (store: IStore) => {
        store.first = '1';
    },
},
{
    index: 3,
    meta: {
        title: '3rd title',
        description: '3rd Description'
    },
    call: async (store) => {
        store.third = '3';
    },
}
];

const transaction = new Transaction();

(async() => {
try {
    await transaction.dispatch(scenario);
    const store = transaction.store; // {} | null
    const logs = transaction.logs; // []
    console.log('================================= ');
    console.log('LOGS :', logs);
    console.log('================================= ');
    console.log('STORE :', store);
} catch (err) {
    console.log(err);
}
})();