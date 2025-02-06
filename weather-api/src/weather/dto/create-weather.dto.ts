export type Weather = {
    resolvedAddress:string,
    timezone: string,
    description: string,
    currentConditions : CurrentConditions
}

type CurrentConditions = {
    temp: number,
    feelslike: number,
    humidity: number,
}