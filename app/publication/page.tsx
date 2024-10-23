import React, { Suspense } from 'react';
import ResearchPapers from '@/components/ResearchPapers';

const PublicationPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResearchPapers />
        </Suspense>
    );
};

export default PublicationPage;
