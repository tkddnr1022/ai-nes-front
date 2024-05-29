/** @type {import('next').NextConfig} */
const nextConfig = {
	rewrites: () => [
    {
      source: "/:start/:end",
      destination: `${process.env.NEXT_PUBLIC_API_URL}/:start/:end`,
    },
	]
  };

export default nextConfig;
