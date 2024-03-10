"use client";
import Organizationchart from "@/components/chart/ChartContainer"
import { useEffect, useState } from "react";
import axios from "axios";
import NodeTemplate from "@/components/node-template";
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
    <>
    <NodeTemplate name={"Arihant Agnihotri"} username={"arihant"} designation={"Software Developer"} level={"3"} profileImg="https://res.cloudinary.com/dfk6ftcdb/image/upload/v1/satwik/qc7m4tkwdfc5qgsvyrnm" />
      <Organizationchart datasource={ds} pan={true} onClickNode={readSelectedNode} />
    </>
  );
};

export default UserPage;
