import News from '@/components/NewsPage';
import React, { Suspense } from 'react';

const PublicationPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <News />
        </Suspense>
    );
};

export default PublicationPage;
