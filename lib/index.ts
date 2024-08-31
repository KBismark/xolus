
import { createStore, deleteProvider, getStorageProvider, deleteStore, updateStore } from 'statestorejs';
import { _configureRenderer } from "./config";
import { _saveToSites, _siteStats } from "./feature";
import { dataReadiness, getref, removeTemplateDataBucket, setTemplateDataReturnBucket, track_it_client } from "./tracker";
import { Component } from "./types";

export const __$track_it = track_it_client;
const noop = ()=>{};
export const renderPage = <P=any>(component: Component, props: P): Promise<String>=>{
    return new Promise((resolve, reject)=>{
        try {
            const storageProvider = `${Math.random()}${Date.now()}`;
            createStore(storageProvider, storageProvider, {});
            setTemplateDataReturnBucket(storageProvider, ()=>{
                
                deleteStore(storageProvider, storageProvider);
                createStore(storageProvider, storageProvider, {});
                setTemplateDataReturnBucket(storageProvider, noop);
                const html = component.template({
                    storage: storageProvider,
                    parentRef: __$track_it('root', storageProvider, undefined, undefined),
                    props: props,
                    init: (()=>`const storage = ${JSON.stringify(getStorageProvider(storageProvider))}`)
                } as any);
                deleteProvider(storageProvider);
                removeTemplateDataBucket(storageProvider);
                resolve(html as string);
            })
            const componentRef = __$track_it('root', storageProvider, undefined, undefined, false);
            component.templateData({
                storage: storageProvider,
                parentRef: componentRef,
                done: (ref)=>{
                    if(ref===componentRef) return;
                    dataReadiness(storageProvider, `${ref}`);
                },
                props: props
            });
            dataReadiness(storageProvider, componentRef);
        } catch (error) {
            reject(error)
        }
    })
    
}

export const createComponent = (Component:Component):Component=>{
    return Component
}

export const __$get_ref = getref;

export const saveToSites = _saveToSites;
export const getSiteStats = _siteStats;
export const configure = _configureRenderer;
