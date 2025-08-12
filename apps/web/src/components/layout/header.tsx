import { Link } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { Link2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import UserMenu from "../user-menu";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { data: session } = authClient.useSession();
	const isMobile = useIsMobile();

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	//@ts-ignore
	const isAdmin = session?.user?.role === "admin";

	return (
		<>
			<header className="relative z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container">
					<div className="flex h-16 items-center justify-between px-4 sm:px-0">
						{/* Logo */}
						<Link
							to="/"
							className="flex items-center gap-2 hover:opacity-80 transition-opacity"
							onClick={closeMobileMenu}
						>
							<Link2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
							<h1 className="text-lg sm:text-xl font-bold text-primary">
								Tiny Tap
							</h1>
						</Link>

						{/* Desktop Right Actions */}
						{!isMobile && (
							<div className="flex items-center gap-3">
								{isAdmin && (
									<Button
										variant="outline"
										size="sm"
										className="bg-primary/5 hover:bg-primary/10 border-primary/20"
										asChild
									>
										<Link to="/admin">Admin Panel</Link>
									</Button>
								)}
								<ModeToggle />
								<UserMenu />
							</div>
						)}

						{/* Mobile Hamburger Button */}
						{isMobile && (
							<button
								onClick={toggleMobileMenu}
								className="relative z-50  p-2 rounded-md hover:bg-accent transition-colors cursor-pointer border"
								aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
							>
								<div className="relative w-6 h-6">
									<span
										className={cn(
											"absolute left-0 top-1 w-6 h-0.5 bg-foreground transform transition-all duration-300 ease-in-out",
											isMobileMenuOpen
												? "rotate-45 translate-y-2.5"
												: "rotate-0 translate-y-0",
										)}
									/>
									<span
										className={cn(
											"absolute left-0 top-3 w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
											isMobileMenuOpen ? "opacity-0" : "opacity-100",
										)}
									/>
									<span
										className={cn(
											"absolute left-0 bottom-1 w-6 h-0.5 bg-foreground transform transition-all duration-300 ease-in-out",
											isMobileMenuOpen
												? "-rotate-45 -translate-y-2.5"
												: "rotate-0 translate-y-0",
										)}
									/>
								</div>
							</button>
						)}
					</div>
				</div>
			</header>

			{/* Mobile Menu Overlay */}
			{isMobile && (
				<div
					className={cn(
						"fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300",
						isMobileMenuOpen
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none",
					)}
					onClick={closeMobileMenu}
				/>
			)}

			{/* Mobile Navigation Menu */}
			{isMobile && (
				<nav
					className={cn(
						"fixed top-0 right-0 h-full w-72 bg-background border-l border-border z-40 transform transition-transform duration-300 ease-in-out",
						isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
					)}
				>
					{/* Mobile Menu Content */}
					<div className="flex flex-col h-full pt-20 px-6">
						{/* Admin Panel Link (if admin) */}
						{isAdmin && (
							<div className="mb-6">
								<Link
									to="/admin"
									className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-accent"
									onClick={closeMobileMenu}
								>
									Admin Panel
								</Link>
							</div>
						)}

						{/* Divider */}
						<div className="my-4 border-t border-border" />

						{/* Mobile Actions */}
						<div className="space-y-6">
							<div className="pt-2">
								<UserMenu />
							</div>

							<div
								className="flex items-center justify-between py-2"
								onClick={(e) => e.stopPropagation()}
							>
								<div onClick={(e) => e.stopPropagation()}>
									<ModeToggle />
								</div>
							</div>
						</div>
					</div>
				</nav>
			)}
		</>
	);
}
