export const spinner = () => {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}

export const loader = () => {
    return (<div className="w-screen h-screen z-40 bg-gray-50 fixed flex justify-center items-center bg-opacity-60">
            {spinner()}
    </div>)
}