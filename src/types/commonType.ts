
export interface LeftMenuType {
    link: string;
    icon: string;
    name: string;
    matchPath: (string | RegExp) [];
    collapse?: boolean;
    sub?: LeftMenuType[];
}

