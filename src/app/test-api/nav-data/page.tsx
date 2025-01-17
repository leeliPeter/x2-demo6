import { getNavData } from "@/api/navData";

export default async function NavDataPage() {
  const navData = await getNavData();
  return <div>{JSON.stringify(navData)}</div>;
}
