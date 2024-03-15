"use client";
import Organizationchart from "@/components/chart/ChartContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import NodeTemplate from "@/components/node-template";
import { useAuthContext } from "@/context/auth-context";
interface UsernamePageProps {
  params: {
    username: string;
  };
}
const UserPage = ({ params }: UsernamePageProps) => {
  const [ds, setDs] = useState({});
  const { isSignedIn,setViewedUser,currentUser } = useAuthContext();

  const apiCall = async () => {
    var resp = await axios.get(`${process.env.SERVER_URL}/api/user/manager/${params.username}`);
    if (!resp.data)
      await axios.get(`${process.env.SERVER_URL}/api/user/${params.username}`);
    return resp.data;
  };
  useEffect(() => {
    apiCall().then((res) => setDs(res));
    // setDs(resp);
    console.log("Ds output");
    console.log(ds);
  }, []);
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const readSelectedNode = (nodeData: any) => {
    console.log(nodeData);
    setViewedUser(nodeData.username)
    setSelectedNodes(new Set([nodeData]));
  };

  const clearSelectedNode=()=>{
    setViewedUser(currentUser)
    setSelectedNodes(new Set());
  }

  return (
      <Organizationchart
        datasource={ds}
        NodeTemplate={NodeTemplate}
        pan={true}
        zoom={true}
        zoominLimit={1}
        onClickNode={readSelectedNode}
        onClickChart={clearSelectedNode}
      />
  );
};

export default UserPage;
