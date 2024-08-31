
export type Reference<N=any> = {current: null|undefined|N}
export interface Component{
    template<P>(props: {
        storage: string;
        parentRef: string;
        props?: P,
        index?: number,
        init?: ()=>string;
    }): {};
    templateData<P>(props: {
        storage: string;
        parentRef: string;
        done: (ref: string)=>void;
        props?: P,
        index?: number,
    }): {}
}

export type ActionsProps = {
    storage: string;
    parentRef: string;
    slotRef: Reference<String>
}

declare function setAction(name: string, action: (props: ActionsProps)=>any):void;
declare function registerActions(actionPath: string):void;
declare function useRef(storage: string):string;
declare function getComponentNode(ref: string): ReturnType<typeof document['getElementById']>;
