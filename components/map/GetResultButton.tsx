interface Props {
    onClick: VoidFunction;
    disabled: boolean;
}
export const GetResultButton = ({ onClick, disabled }: Props) => {
    const handleOnClick = () => {
        if (!disabled) {
            onClick();
        }
    }

    return (
        <button onClick={handleOnClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]">
        Get Avg Price
    </button>
    )
}