
export interface LeftMenuType {
    link: string;
    icon: string;
    name: string;
    matchPath: (string | RegExp)[];
    collapse?: boolean;
    sub?: LeftMenuType[];
}

export enum ProcessStepType {
    APP_STARTED = 'APP_STARTED',
    CONNECT_GOOGLE = 'CONNECT_GOOGLE',
    CONNECTED_LOGIN_FORM = 'CONNECTED_LOGIN_FORM',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    UPDATED_THE_PROFILE_FOLDER = 'UPDATED_THE_PROFILE_FOLDER'
  }