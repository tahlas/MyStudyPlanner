import { runInAction } from "mobx";

export function resolvePromise(prms, promiseState){
    runInAction(() => {
        promiseState.promise = prms;
        promiseState.data = null;
        promiseState.error = null;
    });

    if(!prms)
        return;

    function successACB(result){
        if(promiseState.promise === prms) {
            runInAction(() => {
                promiseState.data = result;
            });
        }
    }

    function errorACB(error){
        if(promiseState.promise === prms) {
            runInAction(() => {
                promiseState.error = error;
            });
        }
    }

    prms.then(successACB).catch(errorACB);
}