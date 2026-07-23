import { redirect } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [];
}

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ category: string; protocol: string }>;
}) {
  const { category, protocol } = await params;
  redirect(`/protocols/${category}/${protocol}/viewer`);
}
