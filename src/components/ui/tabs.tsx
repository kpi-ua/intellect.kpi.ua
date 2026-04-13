'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
    'overflow-x-auto overflow-y-hidden pb-[1px] scrollbar-hidden flex items-end text-xs text-neutral-400 border-b-1 border-neutral-200 gap-17 min-w-700',
    {
        variants: {
            size: {
                small: 'h-fit text-sm font-semibold',
                medium: 'h-11 text-base font-semibold',
                big: 'h-14 text-lg font-semibold',
            },
        },
        defaultVariants: {
            size: 'medium',
        },
    }
);

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>;

const TabsList = ({ className, ref, size, ...props }: TabsListProps) => (
    <TabsPrimitive.List ref={ref} className={cn(tabsListVariants({ size }), className)} {...props} />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = ({ className, ref, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            'cursor-pointer text-neutral-400 relative transition-all focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary whitespace-nowrap',
            className
        )}
        {...props}
    />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabSheetTrigger = ({ className, ref, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) => {
    return (
        <TabsTrigger
            {...props}
            className={cn(
                'data-[state=active]:bg-basic-white data-[state=active]:text-primary h-9 rounded-[4px] md:rounded-t-[4px] md:rounded-b-none px-3 py-0 text-[10px] font-semibold md:h-[42px] md:text-[14px] data-[state=inactive]:bg-basic-white/30 data-[state=inactive]:backdrop-blur-[2px] data-[state=inactive]:text-basic-white md:px-8',
                className
            )}
        />
    );
};
TabSheetTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = ({ className, ref, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
            className
        )}
        {...props}
    />
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, TabSheetTrigger };
