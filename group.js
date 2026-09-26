// group.js：按键归组。键按首次出现顺序排列，值按出现顺序收集；一次扫描，查重用 Map。
import { readRow } from "./read.js";

export function groupValues(rows) {
  const keys = [];
  const values = [];
  const indexByKey = new Map();
  let longest = 0;
  for (const row of rows || []) {
    const record = readRow(row);
    let index = indexByKey.get(record.key);
    if (index === undefined) {
      index = keys.length;
      indexByKey.set(record.key, index);
      keys.push(record.key);
      values.push([]);
    }
    const bucket = values[index];
    bucket.push(record.value);
    if (bucket.length > longest) longest = bucket.length;
  }
  return { keys: keys, values: values, longest: longest };
}
