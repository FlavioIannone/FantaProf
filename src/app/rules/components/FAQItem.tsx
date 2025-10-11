export default function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold">{question}</h3>
      <p className="ml-2 opacity-80">{answer}</p>
    </div>
  );
}
