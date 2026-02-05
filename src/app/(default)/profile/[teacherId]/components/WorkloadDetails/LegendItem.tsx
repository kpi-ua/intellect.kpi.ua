interface LegendItemProps {
    color: string;
    label: string;
    hours: number;
    percentage: number;
}

export const LegendItem = ({ color, label, hours, percentage }: LegendItemProps) => (
    <div className="flex items-start gap-2">
        <div className="w-4 h-4 rounded-full mt-0.5 shrink-0" style={{ backgroundColor: color }}></div>
        <div className="text-sm">
            <div className="font-medium" style={{ color: '#000000' }}>
                {label}
            </div>
            <div className="mt-0.5">
                <span style={{ color: '#6A7282' }}>{Math.round(hours)} год</span>
                <span style={{ color: '#99A1AF' }}> ({percentage.toFixed(2)}%)</span>
            </div>
        </div>
    </div>
);
