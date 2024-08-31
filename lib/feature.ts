import configuration from "./config"
import {join} from 'path'
import {mkdir, writeFile, stat} from 'node:fs/promises'
const slash = join('/');
export const _saveToSites = async (sitePath: string, html: string)=>{
    const sitesDir = join(configuration.config.root, '/_sites');
    const paths = join(sitePath.trim()).split(slash);
    let lastPath = paths[paths.length-1];
    lastPath = lastPath.includes('.')?paths.pop():'';
    let directory = join(sitesDir,  paths.join('/'));
    let isDirectory = false;
    try {
        isDirectory = (await stat(directory)).isDirectory()
    } catch (error) {
        isDirectory = false;
    }
    if(!isDirectory){
        directory = await createSequenceDir(sitesDir, paths.slice());
    }
    return await writeFile(join(directory, lastPath.length>0?`/${lastPath}`:'/index.html'), html);
}

export const _siteStats = async (sitePath: string)=>{
    const sitesDir = join(configuration.config.root, '/_sites');
    const paths = join(sitePath.trim()).split(slash);
    let lastPath = paths[paths.length-1];
    lastPath = lastPath.includes('.')?paths.pop():'';
    return await stat(join(sitesDir, paths.join('/'), lastPath.length>0?`/${lastPath}`:'/index.html'));
}

const createSequenceDir = async (path:string,dirs:string[])=>{
    if(dirs.length>0){
        path = join(path, `/${dirs.shift()}`);
        try {
            await mkdir(path)
        } catch (error) {}
        return createSequenceDir(path, dirs)
    }
    return path;
}