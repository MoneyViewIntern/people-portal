"use client";
import Organizationchart from "@/components/chart/ChartContainer"
import { useEffect, useState } from "react";
import axios from "axios";
import NodeTemplate from "@/components/node-template";
const apiCall=async ()=>{
  const resp = await axios.get("http://localhost:8080/api/manager/satwik");
  
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
    <>
      <Organizationchart datasource={ds} NodeTemplate={NodeTemplate} pan={true} zoom={true} zoominLimit={2} onClickNode={readSelectedNode} />
    </>
  );
};

export default UserPage;
