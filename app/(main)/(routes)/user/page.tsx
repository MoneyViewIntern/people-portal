"use client";
import { useCenteredTree } from "@/utils/centeredTree";
import Organizationchart from "@/components/chart/ChartContainer"
const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",

      children: [
        {
          name: "Foreman",
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",

          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};
const ds = {
  id: "n1",
  name: "Lao Lao",
  title: "general manager",
  children: [
    { id: "n2", name: "Bo Miao", title: "department manager" },
    {
      id: "n3",
      name: "Su Miao",
      title: "department manager",
      children: [
        { id: "n4", name: "Tie Hua", title: "senior engineer" },
        {
          id: "n5",
          name: "Hei Hei",
          title: "senior engineer",
          children: [
            { id: "n6", name: "Dan Dan", title: "engineer" },
            { id: "n7", name: "Xiang Xiang", title: "engineer" }
          ]
        },
        { id: "n8", name: "Pang Pang", title: "senior engineer" }
      ]
    },
    { id: "n9", name: "Hong Miao", title: "department manager" },
    {
      id: "n10",
      name: "Chun Miao",
      title: "department manager",
      children: [{ id: "n11", name: "Yue Yue", title: "senior engineer" }]
    }
  ]
};

const UserPage = () => {
  const [dimensions, translate, containerRef] = useCenteredTree();
  const handleClick = () => {
    console.log("node clicked");
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
        {/* <Organizationchart datasource={ds}/> */}
      </div>
    </div>
  );
};

export default UserPage;
