import * as csv from "csv-string";

export default function CsvPreview({ csvData }: { csvData: string }) {
  const data = csv.parse(csvData);
  return (
    <>
      <h2 className="font-bold text-xl">Podgląd csv</h2>
      <table className="border text-xl w-64">
        {data.map((line: any[], index: number) => {
          if (index === 5)
            return (
              <tr>
                <td className="border">...</td>
                <td className="border">...</td>
              </tr>
            );
          if (index > 5) return <></>;
          return (
            <tr>
              <td className="border px-4 py-1 max-w-[140px] truncate">
                {line[0]}
              </td>
              <td className="border px-4 py-1 max-w-[140px] truncate">
                {line[1]}
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
