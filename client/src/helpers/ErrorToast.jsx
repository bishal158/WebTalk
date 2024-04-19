import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const ErrorToast = () => {
    return (
        <>
            <div className={'w-60 h-20 flex flex-col justify-center items-center absolute bottom-10 right-2 bg-red-600 border rounded'}>
                <button className={'absolute top-1 right-3'}>
                    X
                </button>
                <p>Creating </p>
            </div>
        </>
    )
}