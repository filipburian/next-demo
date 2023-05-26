import {useState} from "react";

interface Props {
    handleRadiusChange: any;
}
export const RadiusRadio = ({ handleRadiusChange }: Props) => {

    const [radius, setRadius] = useState("10");
    const onOptionChange = e => {
        setRadius(e.target.value)
        handleRadiusChange(Number(e.target.value));
    }

    return (
        <div className="my-[10px]">
            <h2 className="text-[20px]">Select Radius</h2>

            <input
                type="radio"
                name="radius"
                value="10"
                id="small"
                checked={radius === "10"}
                onChange={onOptionChange}
            />
            <label htmlFor="small" className="mr-[10px]">10</label>
            <input
                type="radio"
                name="radius"
                value="20"
                id="normal"
                checked={radius === "20"}
                onChange={onOptionChange}
            />
            <label htmlFor="normal" className="mr-[10px]">20</label>

            <input
                type="radio"
                name="radius"
                value="50"
                id="medium"
                checked={radius === "50"}
                onChange={onOptionChange}
            />
            <label htmlFor="medium" className="mr-[10px]">50</label>

            <input
                type="radio"
                name="radius"
                value="100"
                id="large"
                checked={radius === "100"}
                onChange={onOptionChange}
            />
            <label htmlFor="large" className="mr-[10px]">100</label>
        </div>
    )
}