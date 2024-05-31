import G6 from "@antv/g6";
import { StaticData } from "../..";
import "./index.scss";
export default () =>
  new G6.Tooltip({
    offsetX: 10,
    offsetY: 0,
    // v4.2.1 起支持 fixToNode，tooltip 相对于节点固定位置
    fixToNode: [0.8, 0],
    // the types of items that allow the tooltip show up
    // 允许出现 tooltip 的 item 类型
    itemTypes: ["node"],
    // custom the tooltip's content
    // 自定义 tooltip 内容
    // trigger: "click",
    shouldBegin: (e) => {
      // 若当前操作的节点 id 为 'node1'，则不发生 collapse-expand
      if (e.target && e.target.cfg.name === "collapse-icon") return false;
      return true;
    },
    getContent: (e) => {
      const outDiv = document.createElement("div");
      outDiv.style.width = "fit-content";
      const _data = e.item.getModel();
      const data = (_data as typeof _data & StaticData).initData;

      outDiv.innerHTML = `
      <div class="flex flex-col gap-1 max-w-[300px] p-1 text-text">
        <h2 class="text-text break-all" style="word-warp:break-word;">${
          data.path
        }</h2>
        ${IntroText("ResolvePath:", data.resolvedPath)}
      </div>`;
      return outDiv;
    },
  });
function IntroText(intro: string, value: string) {
  return `
  <div class="flex justify-items-start w-full">
    <span class="text-textDescription">${intro}</span>
    <span class="text-text break-all" style="word-warp:break-word;">${value}</span>
  </div>
  `;
}
function Button(intro: string, value: string) {
  return `
  <div class="flex justify-items-start w-full">
  `;
}
