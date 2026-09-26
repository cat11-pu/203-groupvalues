// read.js：读一条（基线：不读也不校验）
export function readRow(row) {
  const key = String(row && row.key != null ? row.key : "").trim();
  const value = row ? row.value : undefined;
  if (key === "" || !Number.isInteger(value)) {
    const error = new Error("bad row");
    error.code = "E_BAD_ROW";
    throw error;
  }
  return { key: key, value: value };
}
