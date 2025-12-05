export function resolvePromise(prms, promiseState){
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    if(!prms)
        return;

    function sucessACB(result){
        if(promiseState.promise === prms)
        promiseState.data = result;
    }
    function errorACB(error){
        if(promiseState.promise === prms)
        promiseState.error = error;
    }

    prms.then(sucessACB).catch(errorACB);
}