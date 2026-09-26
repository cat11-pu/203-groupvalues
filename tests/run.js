import assert from "node:assert";
import { readRow } from "../read.js";
import { groupValues } from "../group.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("readRow returns a key", () => {
  assert.strictEqual(typeof readRow({ key: "a", value: 1 }).key, "string");
});

check("groupValues returns keys", () => {
  assert.ok(Array.isArray(groupValues([{ key: "a", value: 1 }]).keys));
});

check("groupValues returns values", () => {
  assert.ok(Array.isArray(groupValues([{ key: "a", value: 1 }]).values));
});

check("render counts keys", () => {
  assert.strictEqual(typeof render({ rows: [{ key: "a", value: 1 }] }).count, "number");
});

check("render counts values", () => {
  assert.strictEqual(typeof render({ rows: [{ key: "a", value: 1 }] }).value_count, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
