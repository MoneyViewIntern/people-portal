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
        const colors = ['#7dabff', '#ffc078', '#78d8d6', '#ff7c7c', '#b088f9', '#f8b400', '#5eaaa8'];
        return colors[Math.floor(Math.random() * colors.length)];
    };    

    return (
        <main className="mt-4 pl-3">
            <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'beige', marginBottom: '2vh' }}>Employee Tags</h2>
            </div>
            <div>
                {combinedTags.map((tag, index) => {
                    const tagColor = getRandomColor();
                    return (
                        <span key={index} style={{
                            display: 'inline-block',
                            marginRight: '8px',
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