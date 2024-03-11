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
  const { isSignedIn } = useAuthContext();
  const apiCall = async () => {
    var resp = await axios.get(
      `http://localhost:8080/api/manager/${params.username}`
    );
    if (!resp.data)
      await axios.get(`http://localhost:8080/api/user/${params.username}`);
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
    setSelectedNodes(new Set([nodeData]));
  };

  return (
    <>
      <Organizationchart
        datasource={ds}
        NodeTemplate={NodeTemplate}
        pan={true}
        zoom={true}
        zoominLimit={1}
        onClickNode={readSelectedNode}
      />
    </>
  );
};

export default UserPage;
