import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const copyToClipboard = (text: string, label: string) => {
	navigator.clipboard.writeText(text);
	toast("Copied!", { description: `${label} copied to clipboard` });
};

export const Route = createFileRoute("/login")({
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();
		if (session?.session) {
			throw redirect({ to: "/" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const [showSignIn, setShowSignIn] = useState(false);
	const [showDemoInfo, setShowDemoInfo] = useState(false);

	return (
		<div className="space-y-6">
			<Card className="max-w-md mt-2 mx-auto border-dashed border-2 border-muted-foreground/25">
				<CardHeader className="text-center">
					<CardTitle className="text-lg">Demo Admin Access</CardTitle>
					<CardDescription>
						Use these credentials to test the admin features
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Button
						variant="outline"
						onClick={() => setShowDemoInfo(!showDemoInfo)}
						className="w-full"
					>
						{showDemoInfo ? (
							<>
								<EyeOff className="w-4 h-4 mr-2" />
								Hide Demo Credentials
							</>
						) : (
							<>
								<Eye className="w-4 h-4 mr-2" />
								Click to Reveal Demo Credentials
							</>
						)}
					</Button>

					{showDemoInfo && (
						<div className="space-y-3 pt-2 border-t">
							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">
									Email
								</label>
								<div className="flex items-center gap-2">
									<code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
										admin@demo.com
									</code>
									<Button
										size="sm"
										variant="ghost"
										onClick={() => copyToClipboard("admin@demo.com", "Email")}
									>
										<Copy className="w-4 h-4" />
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">
									Password
								</label>
								<div className="flex items-center gap-2">
									<code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
										Admin12@
									</code>
									<Button
										size="sm"
										variant="ghost"
										onClick={() => copyToClipboard("demo123456", "Password")}
									>
										<Copy className="w-4 h-4" />
									</Button>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Existing login forms */}
			{showSignIn ? (
				<SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
			) : (
				<SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
			)}
		</div>
	);
}
