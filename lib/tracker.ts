
import {createStore, getStore, updateStore } from 'statestorejs'

const templateDataSet = new Map();

export const setTemplateDataReturnBucket = (storage: string, callback: ()=>void)=>{
    templateDataSet.set(storage, {wait: 0, callback});
}
export const removeTemplateDataBucket = (storage: string)=>{
    templateDataSet.delete(storage)
}
export const getTemplateDataAwaitBucketLength = (storage: string)=>{
    return templateDataSet.has(storage)?templateDataSet.get(storage).wait:-1;
}
export const dataReadiness = (storage: string, filename?: string)=>{
    const dataSet = templateDataSet.get(storage);
    if(!dataSet||!filename) return;
    const fileStatus = dataSet[filename];
    if(typeof fileStatus==='boolean'&&!fileStatus){
        dataSet[filename] = true;
        dataSet.wait = dataSet.wait - 1;
    }else{
        return;
    }
    if(dataSet.wait===0){
        const cb = dataSet.callback;
        dataSet.callback = null;
        templateDataSet.delete(storage);
        cb();
    }
}

export const getref = (storage: string, filename: string)=>{
    const fileComponentData = getStore<any>(storage, storage);
    let thisFile = fileComponentData[filename];
    return `${filename}-${thisFile?thisFile.index+1:1}`;
}

export const track_it_client = (filename: string, storage: string, slotRef?: {current: null|undefined|string}, storeData?: {}, dataReady?: boolean)=>{
    
    const fileComponentData = getStore<any>(storage, storage);
    let thisFile = fileComponentData[filename];
    thisFile = !thisFile?{
        index: 1,
        name: filename,
    }:{
        index: ++thisFile.index,
        name: filename,
    };
    
    const newStoredata = {
        ...fileComponentData,
        [filename]: thisFile
    };
    
    updateStore<any>(storage, storage, {actors: [], store: newStoredata });
    const storename = `${filename}-${thisFile.index}`
    createStore(storage, storename, storeData||{});
    if(slotRef){
        slotRef.current = storename;
    }
    // Set data readiness
    
    const dataSet = templateDataSet.get(storage);
    
    if(!(dataSet[storename] = !!dataReady)){
        dataSet.wait = dataSet.wait + 1;
    };
    return storename;
}

