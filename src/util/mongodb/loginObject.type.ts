export interface LoginObject {
    appUserEmail: string;
    website: string;
    username: string;
    password: string;
    note: string;
    createdDate: string;
    lastUpdated: string;
};

export interface LoginDocument extends LoginObject {
    _id: string;
    passwordIv: string;
    noteIv: string;
}