import React, { Suspense } from 'react';
import Research from '@/components/ResearchPage';

const ResearchPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Research />
        </Suspense>
    );
};

export default ResearchPage;
