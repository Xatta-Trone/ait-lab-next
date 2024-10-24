import React, { Suspense } from 'react';
import Projects from '@/components/ProjectsPage';

const ProjectsPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Projects />
        </Suspense>
    );
};

export default ProjectsPage;
