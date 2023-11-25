import React, { useEffect } from "react";
import qs from "query-string";
import axios from "axios";
function Sucess(){
   
    useEffect( ()=>{
        setTimeout(()=>{
            window.close()

        },1000)
          
     
    },[])

    return (<span>
        Sucesso!
    </span>)
}
export default Sucess;