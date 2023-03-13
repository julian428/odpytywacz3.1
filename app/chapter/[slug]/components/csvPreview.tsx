import * as csv from "csv-string";

export default function CsvPreview({ csvData }: { csvData: string }) {
  const data = csv.parse(csvData);
  return (
    <>
      <h2 className="font-bold">Podgląd csv</h2>
      <table className="border border-60">
        {data.map((line: any[], index: number) => {
          if (index === 5)
            return (
              <tr>
                <td className="border border-60">...</td>
                <td className="border border-60">...</td>
              </tr>
            );
          if (index > 5) return <></>;
          return (
            <tr>
              <td className="border border-60 px-2">{line[0]}</td>
              <td className="border border-60 px-2">{line[1]}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
