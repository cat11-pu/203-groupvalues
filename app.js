// app.js：渲染结果
import { readRow } from "./read.js";
import { groupValues } from "./group.js";

export function render(spec) {
  const rows = spec.rows || [];
  const view = groupValues(rows);
  const keys = view.keys || [];
  const values = view.values || [];
  return { keys: keys, values: values, count: keys.length, longest: view.longest || 0,
           value_count: values.reduce((sum, item) => sum + item.length, 0),
           row_count: rows.length };
}
