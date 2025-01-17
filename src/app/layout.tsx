import "./globals.css";
import { Providers } from "@/redux/provider";
import { getNavData } from "@/api/navData";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch nav data at the root level
  const navData = await getNavData();

  return (
    <html lang="en">
      <body>
        <Providers navData={navData[0]}>{children}</Providers>
      </body>
    </html>
  );
}
