import { useEffect, useMemo } from "react";
import G6 from "@antv/g6";
import deepClone from "@/utils/deepClone";
import staticRoot from "./ds.static.json";
import initTreeNode from "./tree-node";
import initTreeEdge from "./tree-edge";
import initTooltip from "./plugins/tooltip";
import "./index.scss";
import { StaticNode } from "@dep-spy/core";
import { useStore } from "@/contexts";
export interface StaticData {
  initData: StaticNode;
}
export default function StaticTree() {
  // const { staticRoot } = useStaticStore();
  const { theme } = useStore();
  const graphData = useMemo(
    () => deepClone(transformDataToG6(staticRoot)),
    [staticRoot],
  );

  useEffect(() => {
    // if (!staticRoot) return;
    //初始化节点和边
    initTreeNode({ theme });
    initTreeEdge();
    const tooltip = initTooltip();
    const container = document.getElementById("container");
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new G6.TreeGraph({
      container: "container",
      width,
      height,
      plugins: [tooltip],
      modes: {
        default: [
          {
            type: "collapse-expand",
            onChange: function onChange(item, collapsed) {
              const data = item.get("model");
              graph.updateItem(item, {
                collapsed,
              });
              data.collapsed = collapsed;
              return true;
            },
            shouldBegin(e) {
              // 若当前操作的节点 id 为 'node1'，则不发生 collapse-expand
              if (e.target && e.target.cfg.name === "collapse-icon")
                return true;
              return false;
            },
          },
          "drag-canvas",
          "zoom-canvas",
        ],
      },
      defaultNode: {
        type: "tree-node",
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: "custom-polyline",
      },
      layout: {
        type: "compactBox",
        direction: "LR",
        getId: function getId(d) {
          return d.id;
        },
        getVGap: function getVGap() {
          return 0;
        },
        getHGap: function getHGap() {
          return 80;
        },
      },
    });

    graph.data(graphData);
    graph.render();
    graph.fitView();

    if (typeof window !== "undefined")
      window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight)
          return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  }, [graphData, theme]);

  return <div id="container" className="w-100vw h-100vh"></div>;
}
//将数据转换为g6需要的数据格式
function transformDataToG6(tree: StaticNode) {
  let curDepth = 0;
  function traverse(node: StaticNode) {
    curDepth++;
    const nodeData = {
      children: [],
      id: "node-" + Math.random(),
      collapsed: curDepth < 3 ? false : true,
      initData: node,
    };

    // node.children = Object.values(node.dependencies || {});
    // node.id = "node-" + Math.random();
    // node.collapsed = curDepth < 3 ? false : true;
    const children = Object.values(node.dependencies || {});
    for (let i = 0; i < children.length; i++) {
      nodeData.children.push(traverse(children[i]));
    }
    curDepth--;
    return nodeData;
  }
  return traverse(tree);
}
