import React from 'react';

export default function EmployeeTags() {
    const workTags = ["apple", "banana", "orange", "grape", "kiwi", "pear", "pineapple"];
    const communityTags = ["dog", "cat", "rabbit", "hamster", "bird", "turtle", "fish"];

    const handleTagClick = (tag: any) => {
        // Code to display search results for the clicked tag
        console.log(`Searching for results related to: ${tag}`);
    };

    const combinedTags = [...workTags, ...communityTags];

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
                {combinedTags.map((tag, index) => {
                    const tagColor = getRandomColor();
                    return (
                        <span key={index} className='inline-block mr-[8px] mb-[8px] px-3 py-2  rounded-3xl text-white hover:cursor-pointer hover:shadow-xl' style={{backgroundColor: tagColor}} onClick={() => handleTagClick(tag)}>
                            <span>{tag}</span>
                        </span>
                    );
                })}
            </div>
        </main>
    );
    
}

///