export interface FarmModel {
    name: string;
    address1: string;
    address2: string;
    latitude: number;
    longitude: number;
    timezone: string;
};

export const farmInitialization: FarmModel = {
    name: '',
    address1: '',
    address2: '',
    latitude: 0,
    longitude: 0,
    timezone: ''
};
