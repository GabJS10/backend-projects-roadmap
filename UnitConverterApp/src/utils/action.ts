import { allUnits, temperatureConverts } from "./constants";


export const convert = (value: number, type: string, from: string, to: string) => {
    console.log(value, type, from, to);
    
    if (value === null || isNaN(value)) {
        throw new Error("Invalid value");
    }

    if (!allUnits[type][from] || !allUnits[type][to]) {
        throw new Error("Invalid unit");
    }

    if (type === "length" || type === "weight") {
        const fromUnit = allUnits[type][from];
        const toUnit = allUnits[type][to];
        return (value * fromUnit) / toUnit;
    }


    try {
        
        console.log(temperatureConverts[from][to]);
        
        return temperatureConverts[from][to](value);
    } catch (error) {
        throw new Error("Invalid unit");
    }

}