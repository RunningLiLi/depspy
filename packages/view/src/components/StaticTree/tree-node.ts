import G6 from "@antv/g6";
import { textOverflow } from "@/utils/textOverflow";
import { StaticData } from ".";
import { Theme } from "~/types";
interface IPros {
  theme: Theme;
}
export default function (props: IPros) {
  const { theme } = props;
  G6.registerNode(
    "tree-node",
    {
      drawShape: function drawShape(cfg, group) {
        const config = cfg as typeof cfg & StaticData;
        const rect = group.addShape("rect", {
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 20,
            stroke: "rgb(167,167,167)",
            radius: 5,
            fill: "transparent",
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: "rect-shape",
        });
        // console.log(cfg);
        const content = textOverflow(config.initData.path, 100);
        const text = group.addShape("text", {
          attrs: {
            text: content,
            fill: theme == "dark" ? "white" : "black",
          },

          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: "text-shape",
        });
        const tbox = text.getBBox();
        const rbox = rect.getBBox();
        const hasChildren =
          cfg.children && (cfg.children as unknown[]).length > 0;
        text.attr({
          x: (rbox.width - tbox.width) / 2,
          y: (rbox.height + tbox.height) / 2,
        });
        if (hasChildren) {
          group.addShape("marker", {
            attrs: {
              x: rbox.width + 8,
              y: 0,
              r: 6,
              symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
              stroke: "rgb(167,167,167)",
              lineWidth: 1,
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: "collapse-icon",
          });
        }
        return rect;
      },
      update: (cfg, item) => {
        const group = item.getContainer();
        const icon = group.find((e) => e.get("name") === "collapse-icon");
        icon.attr(
          "symbol",
          cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
        );
      },
    },
    "single-node",
  );
}
