import { useState, useRef, useEffect } from "react";

const directBound = ["topBound", "rightBound", "bottomBound", "leftBound"];

const flagId = "Bound";

export default function useBound(id: string) {
  if (!id) throw "id不能为空";

  const [bounds, setBounds] = useState<HTMLElement[]>([]);
  const parentRef = useRef<HTMLElement | null>(null);

  let basicAttr: any = {};

  const getStyle = (dom: any, attr: any) => {
    if (typeof getComputedStyle) return getComputedStyle(dom, null)[attr];
    else return dom.currentStyle[attr];
  };

  useEffect(() => {
    const dom: HTMLElement = document.getElementById(id)!;
    if (!dom) return;
    parentRef.current = dom;
    // 不知道为何会重复渲染两次
    if (!document.getElementById(flagId)) init(dom);
  }, []);

  const createBound = (width: string, height: string, topOrLeft: string) => {
    let dom = document.createElement("div");
    dom.id = flagId;
    dom.className = "bound";
    dom.style.width = width;
    dom.style.height = height;
    dom.style.top = width === "4px" ? "0px" : topOrLeft;
    dom.style.left = height === "4px" ? "0px" : topOrLeft;
    return dom;
  };

  const init = (dom: HTMLElement) => {
    const width = dom.offsetWidth;
    const height = dom.offsetHeight;
    const topDom = createBound(`${width}px`, "4px", "0px");
    const bottomDom = createBound(`${width}px`, "4px", `${height}px`);
    const leftDom = createBound("4px", `${height}px`, "0px");
    const rightDom = createBound("4px", `${height}px`, `${width}px`);

    setBounds([topDom, rightDom, bottomDom, leftDom]);
    dom.appendChild(topDom);
    dom.appendChild(bottomDom);
    dom.appendChild(leftDom);
    dom.appendChild(rightDom);
  };

  const setBoundPos = (direct: string, pos: any) => {
    let parentWidth = getStyle(parentRef.current, "width");
    let parentHeight = getStyle(parentRef.current, "height");

    if (parentWidth.indexOf("px") !== -1)
      parentWidth = parentWidth.replace("px", "");
    if (parentHeight.indexOf("px") !== -1)
      parentHeight = parentHeight.replace("px", "");

    switch (direct) {
      case "top":
        bounds[0].style.top = pos.top + "px";
        break;
      case "right":
        bounds[1].style.left = +parentWidth - pos.right + "px";
        break;
      case "bottom":
        bounds[2].style.top = +parentHeight - pos.bottom + "px";
        break;
      case "left":
        bounds[3].style.left = pos.left + "px";
        break;
    }
    setBounds(bounds);
  };

  return {
    bounds,
    setBoundPos,
  };
}
