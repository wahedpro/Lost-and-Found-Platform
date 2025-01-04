import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(()=>{
        document.title = `WhereIsIt - ${title}`
    },[title])
};

export default useTitle;