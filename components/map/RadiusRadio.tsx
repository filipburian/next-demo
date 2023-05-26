import {useState} from "react";

interface Props {
    handleRadiusChange: any;
}
export const RadiusRadio = ({ handleRadiusChange }: Props) => {

    const [radius, setRadius] = useState("10");

    const onRadiusChange = (e:any) => {
        setRadius(e.target.value);
        handleRadiusChange(Number(e.target.value));
    }

    const onOptionChange = e => {
        setRadius(e.target.value)
    }

    return (
        <div>
            <h3>Select Radius</h3>

            <input
                type="radio"
                name="radius"
                value="10"
                id="small"
                checked={radius === "10"}
                onChange={onOptionChange}
            />
            <label htmlFor="small">10</label>
            <input
                type="radio"
                name="radius"
                value="20"
                id="normal"
                checked={radius === "20"}
                onChange={onOptionChange}
            />
            <label htmlFor="normal">20</label>

            <input
                type="radio"
                name="radius"
                value="50"
                id="medium"
                checked={radius === "50"}
                onChange={onOptionChange}
            />
            <label htmlFor="medium">50</label>

            <input
                type="radio"
                name="radius"
                value="100"
                id="large"
                checked={radius === "100"}
                onChange={onOptionChange}
            />
            <label htmlFor="large">100</label>

            <p>
                Select radius <strong>{radius}</strong>
            </p>
        </div>
    )
}