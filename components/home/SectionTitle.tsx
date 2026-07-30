type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <h2 className="mb-3 mt-7 text-xl font-bold tracking-[-0.02em] text-slate-100">
      {title}
    </h2>
  );
}
