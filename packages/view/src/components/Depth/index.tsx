// import { useState } from "react";
import useLanguage from "@/i18n/hooks/useLanguage";
import Loading from "@/components/Loading";
interface IProps {
  depth: number;
  rootLoading: boolean;
  onDepthChange: (depth: number) => void;
}
export default function Depth(props: IProps) {
  const { depth, rootLoading, onDepthChange } = props;
  const { t } = useLanguage();
  return (
    <section
      id={`${t("section.maxDepth")}`}
      className={`relative
      hover:after:(absolute flex c-primary-hover text-nowrap left-50% transform-translate-x--50%
      content-[attr(id)])`}
    >
      {rootLoading ? (
        <Loading />
      ) : (
        <input
          id="depth"
          type="number"
          min={2}
          defaultValue={depth}
          onBlur={(e) => {
            onDepthChange(parseInt(e.target.value));
          }}
          className="p-1 h-2rem w-5rem outline-primary-base text-center text-text bg-bg-container"
          border="solid 2 rd-0.5rem primary-border-hover hover:primary-hover"
        ></input>
      )}
    </section>
  );
}
