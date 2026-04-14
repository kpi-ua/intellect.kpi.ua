import React from 'react';

import Header from '@/components/Header/Header';

import { TooltipProvider } from '@/components/ui/tooltip';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <TooltipProvider>
            <Header scheme="dark" />
            <div className="wrapper px-4">{children}</div>
        </TooltipProvider>
    );
}
