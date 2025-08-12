import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { copyToClipboard } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, Link2, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import heroImage from "@/assets/tiny-tap-hero.jpg";
import { useShortenUrl } from "@/features/url/queries/useShortenUrl";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const [originalUrl, setOriginalUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");

	const { mutate: shortenUrl, isPending } = useShortenUrl();

	const handleShorten = () => {
		if (!originalUrl.trim()) {
			toast("Error", { description: "Please enter a valid URL" });
			return;
		}

		shortenUrl(originalUrl, {
			onSuccess: (newShortUrl) => setShortUrl(newShortUrl),
		});
	};

	return (
		<div className="min-h-screen ">
			{/* Hero Section */}
			<section className="relative px-4 py-20 bg-gradient-to-r from-red-500 to-red-800">
				<div
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage: `url(${heroImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<div className="container mx-auto relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
							Shorten URLs with
							<span className="block bg-gradient-to-r from-primary-glow to-primary-foreground bg-clip-text text-transparent">
								Lightning Speed
							</span>
						</h2>
						<p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
							Transform long, complex URLs into short, shareable links in
							seconds. Track clicks, manage links, and boost your digital
							presence.
						</p>

						{/* URL Shortener Form */}
						<Card className="max-w-2xl mx-auto bg-gradient-card backdrop-blur-sm border-background/20">
							<CardHeader>
								<CardTitle className="flex text-white items-center gap-2 justify-center">
									<Zap className="h-5 w-5 text-primary" />
									URL Shortener
								</CardTitle>
								<CardDescription className="text-white/90">
									Paste your long URL below and get a shortened link instantly
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex gap-2">
									<Input
										placeholder="https://example.com/very-long-url-that-needs-shortening"
										value={originalUrl}
										onChange={(e) => setOriginalUrl(e.target.value)}
										onKeyPress={(e) => e.key === "Enter" && handleShorten()}
										className="flex-1 placeholder:text-muted-foreground/80"
									/>
									<Button
										onClick={handleShorten}
										disabled={isPending}
										variant="hero"
										className="cursor-pointer"
										size="lg"
									>
										{isPending ? "Shortening..." : "Shorten"}
									</Button>
								</div>

								{shortUrl && (
									<div className="flex gap-2 p-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-2xl">
										<a
											href={shortUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex-1 underline text-white"
										>
											{shortUrl}
										</a>
										<Button
											onClick={() => copyToClipboard(shortUrl)}
											variant="success"
											className="cursor-pointer"
											size="sm"
										>
											<Copy className="h-4 w-4" />
											Copy
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="px-4 py-20 bg-background/10 backdrop-blur-sm">
				<div className="container mx-auto">
					<div className="grid md:grid-cols-3 gap-8">
						<Card className="backdrop-blur-sm border-primary/20 shadow-elegant">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Zap className="h-5 w-5 text-primary" />
									Lightning Fast
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-foreground">
									Generate shortened URLs in milliseconds with our optimized
									infrastructure.
								</p>
							</CardContent>
						</Card>

						<Card className="backdrop-blur-sm border-primary/20 shadow-elegant">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Link2 className="h-5 w-5 text-primary" />
									Custom Links
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Create branded short links that reflect your identity and
									build trust.
								</p>
							</CardContent>
						</Card>

						<Card className="backdrop-blur-sm border-priamry/20 shadow-elegant">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Copy className="h-5 w-5 text-primary" />
									Analytics
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Track clicks, analyze traffic, and gain insights into your
									link performance.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
