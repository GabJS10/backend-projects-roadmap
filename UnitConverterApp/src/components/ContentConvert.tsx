import React, { useEffect } from "react";
import { selectDisplay } from "../utils/constants";
export const ContentConvert = ({ value }: { value: string }) => {
  const [result, setResult] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");
  const optionsValue = Object.values(selectDisplay[value]);

  useEffect(() => {
    setResult(null);
    setError("");
  }, [value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://localhost:4321/api/convert.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: event.currentTarget.input.value,
        type: value.toLowerCase(),
        from: event.currentTarget.from.value.toLowerCase(),
        to: event.currentTarget.to.value.toLowerCase(),
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Opps, algo ha fallado.");
        }
        return response.json();
      })
      .then((data) => {
        setResult(data.result);
        setError("");
      })
      .catch((error) => {
        setError(error.toString());
        setResult(null);
      });
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col space-y-3 mb-4">
            <label htmlFor="input">
              Enter the <span className="font-bold">{value}</span> to convert
            </label>
            <input
              className="focus:outline-hidden"
              type="number"
              id="input"
              step=".01"
              name="input"
              placeholder="..."
              required
            />
          </div>

          <div className="flex flex-col space-y-3 mb-4">
            <label htmlFor="from">Unit to convert from</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="from"
              name="from"
              required
            >
              {optionsValue.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-3 mb-4">
            <label htmlFor="to">Unit to convert to</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="to"
              name="to"
              required
            >
              {optionsValue.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <div
              className="
               bg-red-500 text-center rounded p-4 
                opacity-0 animate-fade-in
              "
            >
              {error}
            </div>
          )}

          {result && (
            <div
              className="
          text-center rounded p-4
          opacity-0 animate-fade-in
          
          
          "
            >
              {result}
            </div>
          )}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
            Convert
          </button>
        </form>
      </div>
    </>
  );
};
