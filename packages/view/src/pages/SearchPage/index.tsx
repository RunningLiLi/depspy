import { useState } from "react";
import SearchSection from "./components/search/SearchSection";
import Header from "./components/layout/Header";
import DragAndDrop from "./components/search/DragAndDrop";
import Logo from "./components/search/Logo";
import { MainPageContextProvider } from "./components/store/MainPageContext";
import "./index.scss";

export default function SearchPage() {
  const [displayDragAndDrop, setDisplayDragAndDrop] = useState<boolean>(false);
  const displayDragAndDropHandler = () => {
    setDisplayDragAndDrop(true);
  };
  const hideDragAndDropHandler = () => {
    setDisplayDragAndDrop(false);
  };

  return (
    <MainPageContextProvider>
      <div className="background">
        <Header children={null} />
        <Logo />
        {!displayDragAndDrop && (
          <SearchSection onDisplayDragAndDrop={displayDragAndDropHandler} />
        )}
        {displayDragAndDrop && (
          <DragAndDrop onHideDragAndDrop={hideDragAndDropHandler} />
        )}
      </div>
    </MainPageContextProvider>
  );
}
