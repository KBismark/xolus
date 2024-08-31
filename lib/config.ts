import {join} from 'path'
const configuration: { config: Config } = { config: {}} as any;
export default configuration;

export type Config = {
    root: string;

}
export const _configureRenderer = (config: Config)=>{
    config.root = join(config.root)
    configuration.config = config;
}

