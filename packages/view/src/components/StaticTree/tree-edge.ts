import G6 from "@antv/g6";
export default function () {
  G6.registerEdge("custom-polyline", {
    draw(cfg, group) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      const shape = group.addShape("path", {
        attrs: {
          stroke: "rgb(167,167,167)",
          path: [
            ["M", startPoint.x, startPoint.y],
            ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
            ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
            ["L", endPoint.x, endPoint.y],
          ],
          endArrow: true,
        },
        // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
        name: "custom-polyline-path",
      });
      return shape;
    },
  });
}
