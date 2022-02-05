// import { useEffect, useRef, useState } from "react";

// // export const useDebounce = (func, delay, cleanUp=false) => {
// //    const timeoutRef = useRef()

// //    const clearTimer = () => {
// //       if(timeoutRef.current) {
// //       clearTimeout(timeoutRef.current)
// //       timeoutRef.current = undefined
// //       }
// //    }
// //     useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp])

// //     return (...args) => {
// //        clearTimer()
// //        timeoutRef.current = setTimeout(() => func(...args), delay)
// //     }  


// // }

// export const useDebounce = (value, delay) => {
//    const [debounceValue, setDebounceValue] = useState(value)

//    useEffect(() => {
//       const handler = setTimeout(()=> {
//          setDebounceValue(value)
//       }, delay)

//       return () => {
//          clearTimeout(handler)
//       }
//    }, [value, delay])

//    return debounceValue
// }