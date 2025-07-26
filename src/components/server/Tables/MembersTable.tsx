export default function MembersTable({
  header,
  rows,
}: {
  header?: React.ReactNode;
  rows: Array<{
    name: string;
    credits: number;
    points: number;
  }>;
}) {
  return (
    <div className="lg:px-8 md:px-6 sm:px-5 px-4 w-full">
      <div className="py-5">
        {header}
        <div className="space-y-2.5">
          {rows.map((row, index) => (
            <div
              key={index}
              className="flex justify-between bg-base-200 rounded-2xl p-4"
            >
              <div className="flex items-center gap-2">
                <div className="d-avatar d-avatar-online size-12 bg-amber-200 rounded-full"></div>
                <div className="flex flex-col">
                  <h1 className="text-2xl">{row.name}</h1>
                  <h2 className="opacity-70">
                    Crediti rimanenti: {row.credits}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <h1 className="font-bold text-2xl">{row.points}</h1>
                <h2 className="opacity-70">Punti</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
