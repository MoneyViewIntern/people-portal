import React from 'react';

export default function EmployeeTags({tags}:{tags:any}) {

    // const individualTags = tags?tags.filter((t:any)=>t.type==="INDIVIDUAL"):[];
    // const communityTags = tags?tags.filter((t:any)=>t.type==="COMMUNITY"):[];

    const handleTagClick = (tag: any) => {
        // Code to display search results for the clicked tag
        console.log(`Searching for results related to: ${tag.name}-${tag.type}`);
    };


    const getRandomColor = () => {
        const colors = ['#0b8c4c', '#04d16b', '#065930', '#064023', '#012b16', '#10b060', '#218050'];
        return colors[Math.floor(Math.random() * colors.length)];
    };    

    return (
        <main className="mt-4 pl-3">
            <div>
                <h2 className='text-xl text-muted-foreground font-bold my-9'>Employee Tags</h2>
            </div>
            <div>
                {tags && tags.map((tag:any, index:any) => {
                    const tagColor = getRandomColor();
                    return (
                        <span key={index} className='inline-block mr-[8px] mb-[8px] px-3 py-2  rounded-3xl text-white hover:cursor-pointer hover:shadow-xl' style={{backgroundColor: tagColor}} onClick={() => handleTagClick(tag)}>
                            <span>{tag.name}</span>
                        </span>
                    );
                })}
            </div>
        </main>
    );
    
}

///