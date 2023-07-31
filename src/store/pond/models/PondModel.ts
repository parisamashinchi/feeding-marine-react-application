export interface PondModel {
    name?: string;
    number: string;
    volume: number;
    core_id: string;
    ifeed_core_id: string;
}

export const pondInitialization: PondModel = {
    name: '',
    number: '',
    volume: 0,
    core_id: '',
    ifeed_core_id: ''
}

export interface Harvest {
    weight: number;
    count: number;
    type: string;
    cycle_id: string
}
export const harvestInitialization: Harvest = {
    weight: 0,
    count: 0,
    type: 'harvest',
    cycle_id: ''
}
export interface Sample {
    weight: number;
    count: number;
    cycle_id: string
}
export const sampleInitialization: Sample = {
    weight: 0,
    count: 0,
    cycle_id: ''
}

export interface Schedule {
    feeding_amount: number;
    feeding_time: string;
    cycle_id: string;
    disabled: boolean
}
export const scheduleInitialization: Schedule = {
    feeding_amount: 0,
    feeding_time: '',
    cycle_id: '',
    disabled: false
}

export interface PondInfo {
    name: string;
    volume: string;
    number: string
}
export interface WaterQuality {
    temperature: number;
    ph: number;
    oxygen: number
}
export interface Cycle {
    pond_id : number,
    start_date : string,
    total_seeds : number,
    initial_average_weight: any,
    age: number,
    species_id : number,
    target_weight: any,
    cultivation_days: any
}
export const cycleInitialization: Cycle = {
    pond_id : 0,
    start_date : '',
    total_seeds : 0,
    initial_average_weight: 0,
    age: 0,
    species_id : 0,
    target_weight: '',
    cultivation_days: ''
}

