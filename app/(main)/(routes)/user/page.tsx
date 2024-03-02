"use client"
import Tree from 'react-d3-tree';
import { useCenteredTree } from '@/utils/centeredTree';
const orgChart = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        
        children: [
          {
            name: 'Foreman',
            children: [
              {
                name: 'Worker',
              },
            ],
          },
          {
            name: 'Foreman',
            
            children: [
              {
                name: 'Worker',
              },
            ],
          },
        ],
      },
    ],
  };

const UserPage = () => {
    const [dimensions, translate, containerRef] = useCenteredTree();
    const handleClick = ()=>{
        console.log("node clicked")
    }
    return ( 
    <div className="h-full w-full flex flex-auto items-center justify-center">
        <div ref={containerRef} className='h-full w-full'>
      <Tree
      hasInteractiveNodes initialDepth={2} pathFunc={"step"} dimensions={dimensions} 
      translate={translate} orientation='vertical' enableLegacyTransitions={true} 
      data={orgChart} onNodeClick={handleClick} />
    </div>
    </div> 
    );
}
 
export default UserPage ;