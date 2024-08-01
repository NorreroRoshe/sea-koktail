'use client'
import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import { IRange } from "../GoodsCatalogue/FilterBlock/FilterBlock";
import { useSearchParams } from "next/navigation";

export type IMinMax = { min: number; max: number };

interface IRangeComponentProps extends IRange {
  changeValues?: (props: IMinMax) => void;
  RangeValue: IRange;
  trigger: any;
}

const RangeComponent: React.FC<IRangeComponentProps> = ({
  minValue,
  maxValue,
  changeValues,
  RangeValue,
  trigger,
}) => {
  
  const [minInputValue, setMinInputValue] = useState(minValue.toString());
  const [maxInputValue, setMaxInputValue] = useState(maxValue.toString());

  const [sliderValue, setSliderValue] = useState({
    minValue,
    maxValue,
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMinInputValue(minValue.toString());
      setMaxInputValue(maxValue.toString());
      setSliderValue({ minValue, maxValue });
    }, 1);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [minValue, maxValue]);

  const handleSliderChange = (newValue: number | number[]) => {
    const [min, max] = newValue as [number, number];
    setSliderValue((prev) => ({ ...prev, minValue: min, maxValue: max }));
    changeValues && changeValues({ min, max });
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue((prev) => ({ ...prev, minValue: Number(event.target.value) }));
    const newMinValue = parseInt(event.target.value, 10);
    if (
      !isNaN(newMinValue) &&
      newMinValue <= parseInt(maxInputValue, 10) &&
      newMinValue >= RangeValue.minValue
    ) {
      setMinInputValue(newMinValue.toString());
      changeValues &&
        changeValues({ min: newMinValue, max: parseInt(maxInputValue, 10) });
    } else if (event.target.value === "") {
      setMinInputValue("0");
      changeValues && changeValues({ min: 0, max: parseInt(maxInputValue, 10) });
    }
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue((prev) => ({ ...prev, maxValue: Number(event.target.value) }));
    const newMaxValue = parseInt(event.target.value, 10);
    if (
      !isNaN(newMaxValue) &&
      newMaxValue >= parseInt(minInputValue, 10) &&
      newMaxValue <= RangeValue.maxValue
    ) {
      setMaxInputValue(newMaxValue.toString());
      changeValues &&
        changeValues({ min: parseInt(minInputValue, 10), max: newMaxValue });
    } else if (event.target.value === "") {
      setMaxInputValue("0");
      changeValues && changeValues({ min: parseInt(minInputValue, 10), max: 0 });
    }
  };

  useEffect(() => {
    setSliderValue((prev) => ({
      ...prev,
      minValue: Number(minInputValue),
      maxValue: Number(maxInputValue),
    }));
  }, [searchParams.get('Category'), trigger]);

  return (
    <div className="range-wrapper">
      <div className="range-minmax">
        <input
          className="range-min"
          type="number"
          value={sliderValue.minValue}
          onChange={handleMinInputChange}
          min={RangeValue?.minValue}
          max={maxInputValue}
        />
        <input
          className="range-max"
          type="number"
          value={sliderValue.maxValue}
          onChange={handleMaxInputChange}
          min={minInputValue}
          max={RangeValue?.maxValue}
        />
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[minValue, maxValue]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        minDistance={1}
        min={RangeValue?.minValue}
        max={RangeValue?.maxValue}
        value={[sliderValue.minValue, sliderValue.maxValue]}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default RangeComponent;