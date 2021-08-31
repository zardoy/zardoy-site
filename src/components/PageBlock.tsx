import React from 'react';

interface ComponentProps {
}

const PageBlock: React.FC<ComponentProps> = ({ children }) => {
    return <div className="h-screen">
        <div className="p-20">
            {children}
        </div>
    </div>;
};

export default PageBlock;
