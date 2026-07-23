type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <h2 className="mb-4 mt-8 text-lg font-semibold text-slate-300">
      {title}
    </h2>
  );
}