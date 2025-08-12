import { Link } from "@tanstack/react-router";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export default function Header() {
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
	];
	const { data: session } = authClient.useSession();
	console.log({ session });

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="flex gap-4 text-lg">
					{links.map(({ to, label }) => {
						return (
							<Link key={to} to={to}>
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
					{
						//@ts-ignore
						session && session.user.role === "admin" && (
							<Button
								variant="outline"
								className="bg-background/10 backdrop-blur-sm border-background/20 text-primary-foreground hover:bg-background/20"
							>
								<Link to="/admin">Admin Panel</Link>
							</Button>
						)
					}
				</div>
			</div>
			<hr />
		</div>
	);
}
