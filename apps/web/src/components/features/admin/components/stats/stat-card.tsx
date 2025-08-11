import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import * as React from "react";

type StatCardProps = {
	title: string;
	primaryData: string | number;
	secondaryData: string | number;
	icon: LucideIcon;
};

export const StatCard: React.FC<StatCardProps> = ({
	title,
	primaryData,
	secondaryData,
	icon: Icon,
}) => {
	return (
		<Card className="bg-gradient-card shadow-elegant">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-primary">{primaryData}</div>
				<p className="text-xs text-muted-foreground">{secondaryData}</p>
			</CardContent>
		</Card>
	);
};
