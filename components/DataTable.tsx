import React from 'react';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';

export type TableColumn = {
  header: string;
  accessor: string;
  isCurrency?: boolean;
  isPercentage?: boolean;
};

interface DataTableProps {
  data: any[];
  columns: TableColumn[];
  ctaText: string;
}

export default function DataTable({ data, columns, ctaText }: DataTableProps) {
  if (!data || data.length === 0) return (
    <div className="glass-card w-full p-6 h-[200px] flex items-center justify-center">
      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">No data available</span>
    </div>
  );

  return (
    <div className="glass-card w-full overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="border-b border-gray-800 bg-gray-900/50 text-xs uppercase tracking-widest text-gray-500 font-sans">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 font-semibold">{col.header}</th>
            ))}
            <th className="px-6 py-4 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50 font-mono text-sm">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition-colors hover:bg-gray-900/50 group">
              {columns.map((col, colIndex) => {
                const value = row[col.accessor];
                let formattedValue = value;
                let isPositive = true;

                if (col.isPercentage) {
                  isPositive = value >= 0;
                  formattedValue = `${isPositive ? '+' : ''}${Number(value).toFixed(2)}%`;
                } else if (col.isCurrency) {
                  formattedValue = new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD',
                    notation: 'compact',
                    maximumFractionDigits: 2
                  }).format(value);
                }

                return (
                  <td key={colIndex} className="whitespace-nowrap px-6 py-4">
                    <span className={col.isPercentage ? (isPositive ? 'text-green-500' : 'text-red-500') : 'text-gray-200 group-hover:text-white transition-colors'}>
                      {col.isPercentage && isPositive && <ArrowUpRight className="inline w-3 h-3 mr-1" />}
                      {col.isPercentage && !isPositive && <ArrowDownRight className="inline w-3 h-3 mr-1" />}
                      {formattedValue}
                    </span>
                  </td>
                );
              })}
              
              <td className="whitespace-nowrap px-6 py-4 text-right font-sans">
                <a href={row.affiliate_link || '#'} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-green-500/50 bg-green-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-500 transition-all duration-200 hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                  {ctaText} <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}