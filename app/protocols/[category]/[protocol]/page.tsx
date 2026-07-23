import { redirect } from "next/navigation";
import { protocolCategories } from "../../../../data/protocols";

export const dynamicParams = false;

export async function generateStaticParams() {
  return protocolCategories.flatMap((category) =>
    category.protocols.map((protocol) => ({
      category: category.id,
      protocol: protocol.id,
    }))
  );
}

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ category: string; protocol: string }>;
}) {
  const { category, protocol } = await params;
  redirect(`/protocols/${category}/${protocol}/viewer`);
}
