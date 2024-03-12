import React from 'react';

export default function EmployeeTags() {
    const workTags = ["apple", "banana", "orange", "grape", "kiwi", "pear", "pineapple"];
    const communityTags = ["dog", "cat", "rabbit", "hamster", "bird", "turtle", "fish"];

    const handleTagClick = (tag) => {
        // Code to display search results for the clicked tag
        console.log(`Searching for results related to: ${tag}`);
    };

    const combinedTags = [...workTags, ...communityTags];

    const getRandomColor = () => {
        const colors = ['#1B4D3E' , '#49796B' , '#4CAF50' ,'#043927','#20B2AA' , '#004953']
        // const colors = ['#004953']
        return colors[Math.floor(Math.random() * colors.length)];
    };    

    return (
        <main className="mt-4 pl-3">
            <div>
                <h2 style={{ fontSize: '28px', marginBottom: '2vh' , marginLeft:"12px" }}>Employee Tags</h2>
            </div>
            <div>
                {combinedTags.map((tag, index) => {
                    const tagColor = getRandomColor();
                    return (
                        <span key={index} style={{
                            display: 'inline-block',
                            marginRight: '6px',
                            marginLeft: '4px',
                            marginBottom: '8px',
                            padding: '4px 8px',
                            backgroundColor: tagColor,
                            color: '#ffffff',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            border: '2px solid #1f1f1f' // Dark border color
                        }} onClick={() => handleTagClick(tag)}>
                            <span>{tag}</span>
                        </span>
                    );
                })}
            </div>
        </main>
    );
    
}

///