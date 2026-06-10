interface SliderProps {
    value?: number[];
    defaultValue?: number[];
    onValueChange?: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    className?: string;
    name?: string;
}
declare function Slider({ value, defaultValue, onValueChange, min, max, step, disabled, className, name, }: SliderProps): import("react/jsx-runtime").JSX.Element;
export { Slider };
//# sourceMappingURL=slider.d.ts.map