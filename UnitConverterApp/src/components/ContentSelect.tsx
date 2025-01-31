import React from "react";
import { useState } from "react";
import { ContentConvert } from "./ContentConvert";
export const ContentSelect = () => {
  const [value, setValue] = useState("length");
  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <div className="mb-5">
          <h1 className="text-6xl mb-9 font-bold text-center">
            Unit Converter
          </h1>
          <nav>
            <ul className="flex gap-4 justify-center">
              <li
                className="text-sm
                    transform hover:scale-110 duration-300 transition hover:text-blue-500"
              >
                <button
                  className={`cursor-pointer ${
                    value === "length" ? "text-blue-500 font-bold" : ""
                  }`}
                  onClick={() => setValue("length")}
                >
                  Length
                </button>
              </li>
              <li
                className="text-sm
                    transform hover:scale-110 duration-300 transition hover:text-blue-500"
              >
                <button
                  className={`cursor-pointer ${
                    value === "weight" ? "text-blue-500 font-bold" : ""
                  }`}
                  onClick={() => setValue("weight")}
                >
                  Weight
                </button>
              </li>
              <li
                className="text-sm
                  transform hover:scale-110 duration-300 transition hover:text-blue-500"
              >
                <button
                  className={`cursor-pointer ${
                    value === "temperature" ? "text-blue-500 font-bold" : ""
                  }`}
                  onClick={() => setValue("temperature")}
                >
                  Temperature
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <ContentConvert value={value} />
      </div>
    </>
  );
};
