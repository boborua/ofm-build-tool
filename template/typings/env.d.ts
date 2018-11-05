interface IConf {
  version: string;
  ip: string;
  nginx: boolean;
}

declare namespace NodeJS {
  export interface Process {
    conf: IConf;
  }
}
