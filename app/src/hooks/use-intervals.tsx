import { useEffect, useRef } from "react";

function useInterval(
    callback: () => void,
    delay: number,
) {
    const savedCallback = useRef(() => {});
     useEffect(() => {
        savedCallback.current = callback;
     }, [callback]);

     useEffect(() => {
        function tick(){
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            }
        }
     }, [callback, delay]);
}

export default useInterval;