import { TooltipProvider } from '@/components/ui/tooltip';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return <TooltipProvider>{children}</TooltipProvider>;
}
