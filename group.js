// group.js：归组（基线：一律给空表）
import { readRow } from "./read.js";

export function groupValues(rows) {
  const keys = [];
  const values = [];
  const indexByKey = new Map();
  let longest = 0;
  for (const row of rows || []) {
    const record = readRow(row);
    let spot = indexByKey.get(record.key);
    if (spot === undefined) {
      spot = keys.length;
      indexByKey.set(record.key, spot);
      keys.push(record.key);
      values.push([]);
    }
    const bucket = values[spot];
    bucket.push(record.value);
    if (bucket.length > longest) longest = bucket.length;
  }
  return { keys: keys, values: values, longest: longest };
}
