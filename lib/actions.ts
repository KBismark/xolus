import type { ActionsProps } from "./types"
let currentActionPath = '';
const Actions: {[k: string]: {[k: string]: (props: ActionsProps)=>any}} = {}
export const setAction = (name: string, action: (props: ActionsProps)=>any)=>{
    let actions = Actions[currentActionPath];
    if(!actions){
        actions = Actions[currentActionPath] = {}
    }
    actions[name] = action;
}

export const getAction = (name: string, parentRef: string, componentRef: string)=>{
    const source = componentRef.split(':').slice(0, -1).join(':')
    return Actions[source]&&Actions[source][name]?Actions[source][name]({parentRef, slotRef: {current: componentRef}, storage: 'BigStore'}) : undefined
}

export const registerActions = (actionPath: string)=>{
    currentActionPath = actionPath;
}