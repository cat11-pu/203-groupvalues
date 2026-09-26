// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "记录 " + (spec.rows || []).length + " 条，点归组看结果。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.keys.forEach(function (name, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = name;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = JSON.stringify(view.values[spot]);
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "键 " + view.count + " 个，值总数 " + view.value_count;
    parts.log.textContent = "最长分组 " + view.longest;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "按键归组";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一条记录";
  addButton.addEventListener("click", function () {
    spec.rows = (spec.rows || []).concat([{ key: "alpha", value: 9 }]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一条";
  dropButton.addEventListener("click", function () {
    spec.rows = (spec.rows || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一条键值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "beta=4";
  box.addEventListener("input", function () {
    const pieces = box.value.split("=");
    try {
      const view = render(Object.assign({}, spec, { rows: (spec.rows || []).concat([{ key: pieces[0], value: Number(pieces[1]) }]) }));
      const spot = view.keys.indexOf(pieces[0]);
      parts.out.textContent = pieces[0] + " 现在是 " + JSON.stringify(view.values[spot]);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最长分组";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "最长分组 " + view.longest + "，键 " + view.count + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
