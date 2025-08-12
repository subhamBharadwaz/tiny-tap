import { Link } from "@tanstack/react-router";
import { Link2 } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
	return (
		<header className="relative z-10 px-4 py-6">
			<div className="container mx-auto flex items-center justify-between">
				<Link to="/admin" className="flex items-center gap-2">
					<Link2 className="h-8 w-8 text-primary-foreground" />
					<h1 className="text-2xl font-bold text-primary-foreground">
						Tiny Tap
					</h1>
				</Link>
			</div>
		</header>
	);
};
