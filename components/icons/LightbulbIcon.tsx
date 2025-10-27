import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c.065.21.145.421.23.634a7.5 7.5 0 0 1 6.56 0c.085-.213.165-.424.23-.634Zm-3.75-2.311a7.5 7.5 0 0 0-3.75 0m3.75 0a7.5 7.5 0 0 0 3.75 0M9 12a4.5 4.5 0 0 1 6 0m-6 0a4.5 4.5 0 0 0-3.75 2.016M15 12a4.5 4.5 0 0 1 3.75 2.016M9 12a4.5 4.5 0 0 0-3.75-2.016M15 12a4.5 4.5 0 0 0 3.75-2.016" />
    </svg>
);

export default LightbulbIcon;
