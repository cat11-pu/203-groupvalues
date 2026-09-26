// read.js：读一条记录，键去首尾空白，值必须是整数；否则报 E_BAD_ROW。
export function readRow(row) {
  const key = String(row && row.key != null ? row.key : "").trim();
  const value = row ? row.value : undefined;
  if (key === "" || !Number.isInteger(value)) {
    const error = new Error("E_BAD_ROW");
    error.code = "E_BAD_ROW";
    throw error;
  }
  return { key: key, value: value };
}
