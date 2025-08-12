import type { StatsData } from "../../admin.types";
import * as React from "react";
import { StatCard } from "./stat-card";
import { BarChart3, Link2, MousePointer, TrendingUp } from "lucide-react";

type StatsProps = {
	stats: StatsData;
};

export const Stats: React.FC<StatsProps> = ({ stats }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
			<StatCard
				title="Total URLs"
				primaryData={stats.totalUrls}
				secondaryData={`${stats.urlsToday} created today`}
				icon={Link2}
			/>
			<StatCard
				title="Total Clicks"
				primaryData={stats.totalClicks}
				secondaryData={`${stats.clicksToday} clicks today`}
				icon={MousePointer}
			/>
			<StatCard
				title="Average Clicks"
				primaryData={
					stats.totalUrls > 0
						? (stats.totalClicks / stats.totalUrls).toFixed(1)
						: "0"
				}
				secondaryData="per shortened URL"
				icon={BarChart3}
			/>
			<StatCard
				title="Growth Rate"
				primaryData="+100%"
				secondaryData="vs last period"
				icon={TrendingUp}
			/>
		</div>
	);
};
