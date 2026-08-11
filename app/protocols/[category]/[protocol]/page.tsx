import { notFound, redirect } from "next/navigation";
import NativeProtocolReader from "../../../../components/protocols/NativeProtocolReader";
import { protocolCategories } from "../../../../data/protocols";
import {
  getStructuredProtocol,
  hasReviewedNativeContent,
} from "../../../../data/structured-protocols";

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
  const { category: categoryId, protocol: protocolId } = await params;

  if (categoryId === "up" && protocolId === "up-19") {
    redirect("/protocols/up/up-18");
  }

  const category = protocolCategories.find((item) => item.id === categoryId);
  const protocol = category?.protocols.find((item) => item.id === protocolId);

  if (!category || !protocol) {
    notFound();
  }

  const content = getStructuredProtocol(category.id, protocol.id);

  if (!hasReviewedNativeContent(content)) {
    redirect(`/protocols/${category.id}/${protocol.id}/viewer`);
  }

  return (
    <NativeProtocolReader
      category={category}
      protocol={protocol}
      content={content}
    />
  );
}
