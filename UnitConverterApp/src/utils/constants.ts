type Units = {
        [key: string]: number;
};

const lengthUnits: Units = {
    millimeters: 0.001,
    centimeters: 0.01,
    meters: 1,
    kilometers: 1000,
    inches: 0.0254,
    feet: 0.3048,
    yards: 0.9144,
    miles: 1609.34,
  };


const weightUnits: Units = {
    grams: 0.001,
    kilograms: 1,
    ounces: 0.0283495,
    pounds: 0.453592,
  };

const temperatureUnits: Units = {
    celsius: 1,
    fahrenheit: 1.8,
    kelvin: 1.8,
  };



const allUnits: { [key: string]: Units } = {
    length: lengthUnits,
    weight: weightUnits,
    temperature: temperatureUnits,
}


type TemperatureConverts = {
    [key: string]: {
        [key: string]: (value: number) => number
    }
}

const temperatureConverts: TemperatureConverts = {
    celsius: {
        fahrenheit: (value: number) => (value * 9) / 5 + 32,
        kelvin: (value: number) => value + 273.15
    },
    fahrenheit: {
        celsius: (value: number) => ((value - 32) * 5) / 9,
        kelvin: (value: number) => ((value - 32) * 5) / 9 + 273.15
    },
    kelvin: {
        celsius: (value: number) => value - 273.15,
        fahrenheit: (value: number) => ((value - 273.15) * 9) / 5 + 32
    }

}


type SelectDisplay = {
    [key: string]: {
        [key: string]: string
    }
}

const selectDisplay: SelectDisplay = {
    length: {
        m: "Meters",
        cm: "Centimeters",
        km: "Kilometers",
        inch: "Inches",
        foot: "Feet",
        yard: "Yards",
        mile: "Miles"
    },
    weight: {
        gram: "Grams",
        kilogram: "Kilograms",
        ounce: "Ounces",
        pound: "Pounds"
    },
    temperature: {
        celsius: "Celsius",
        fahrenheit: "Fahrenheit",
        kelvin: "Kelvin"
    }
}

export { allUnits , temperatureConverts, selectDisplay };