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
		<Card className="bg-gradient-card shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-4 lg:px-6 pt-4 lg:pt-6">
				<CardTitle className="text-sm font-medium text-muted-foreground truncate pr-2">
					{title}
				</CardTitle>
				<Icon className="h-5 w-5 text-primary/70 flex-shrink-0" />
			</CardHeader>
			<CardContent className="px-4 lg:px-6 pb-4 lg:pb-6">
				<div className="text-2xl lg:text-3xl font-bold text-primary mb-2 truncate">
					{primaryData}
				</div>
				<p className="text-sm text-muted-foreground leading-relaxed">
					{secondaryData}
				</p>
			</CardContent>
		</Card>
	);
};
