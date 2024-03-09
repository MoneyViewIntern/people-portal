"use client";
import { useCenteredTree } from "@/utils/centeredTree";
import Organizationchart from "@/components/chart/ChartContainer"
import Tree from "react-d3-tree"
import { useEffect, useState } from "react";
import axios from "axios";

// const ds = {
//   username: "n1",
//   name: "Lao Lao",
//   title: "general manager",
//   children: [
//     { username: "n2", name: "Bo Miao", title: "department manager" },
//     {
//       username: "n3",
//       name: "Su Miao",
//       title: "department manager",
//       children: [
//         { username: "n4", name: "Tie Hua", title: "senior engineer" },
//         {
//           username: "n5",
//           name: "Hei Hei",
//           title: "senior engineer",
//           children: [
//             { username: "n6", name: "Dan Dan", title: "engineer" },
//             { username: "n7", name: "Xiang Xiang", title: "engineer" }
//           ]
//         },
//         { username: "n8", name: "Pang Pang", title: "senior engineer" }
//       ]
//     },
//     { username: "n9", name: "Hong Miao", title: "department manager" },
//     {
//       username: "n10",
//       name: "Chun Miao",
//       title: "department manager",
//       children: [{ username: "n11", name: "Yue Yue", title: "senior engineer" }]
//     }
//   ]
// };

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
  const [dimensions, translate, containerRef] = useCenteredTree();
  const handleClick = () => {
    console.log("node clicked");
  };

  const readSelectedNode = (nodeData: any) => {  
      setSelectedNodes(new Set([nodeData]));

  };

  return (
    <div className="h-full w-full flex flex-auto items-center justify-center">
      <div ref={containerRef} className="h-full w-full">
        {/* <Tree
          hasInteractiveNodes
          initialDepth={2}
          pathFunc={"step"}
          dimensions={dimensions}
          translate={translate}
          orientation="vertical"
          enableLegacyTransitions={true}
          data={orgChart}
          onNodeClick={handleClick}
        /> */}
        <Organizationchart datasource={ds} onClickNode={readSelectedNode}/>
      </div>
    </div>
  );
};

export default UserPage;
