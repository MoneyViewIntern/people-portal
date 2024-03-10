"use client";
import Organizationchart from "@/components/chart/ChartContainer"
import { useEffect, useState } from "react";
import axios from "axios";

const apiCall=async ()=>{
  const resp = await axios.get("http://localhost:8080/api/user/satwik");
  
  return resp.data;
}

const UserPage = () => {
  const [ds,setDs]=useState({});
  useEffect( ()=>{
    apiCall().then(res=>setDs(res));
    // setDs(resp);
    console.log(ds);
  },[])


  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const handleClick = () => {
    console.log("node clicked");
  };

  const readSelectedNode = (nodeData: any) => {  
      setSelectedNodes(new Set([nodeData]));

  };

  return (
    <div className="h-full w-full flex flex-grow items-center justify-center">
        <Organizationchart datasource={ds} onClickNode={readSelectedNode}/>

    </div>
  );
};

export default UserPage;
