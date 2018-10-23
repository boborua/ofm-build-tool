import dev from './dev.yaml';
import dist from './dist.yaml';
import local from './local.yaml';
import deepExtend from 'deep-extend';

export interface Config {
  ip: string;
  nginx: boolean;
  version: string;
}

let config: Config;

if (process.env.NODE_ENV === 'development') {
  config = deepExtend(dev, local);
} else {
  config = dist;
}

global.env = config;
