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

  const getScrollTop = () => {
    let scrollPos;
    if (window.pageYOffset) {
      scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != "BackCompat") {
      scrollPos = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollPos = document.body.scrollTop;
    }
    return scrollPos;
  };

  const pxToNum = (str: string): number => {
    if (str.indexOf("px") !== -1) return +str.replace("px", "");
    return 0;
  };

  useEffect(() => {
    const dom: HTMLElement = document.getElementById(id)!;
    if (!dom) return;
    parentRef.current = dom;
    // 不知道为何会重复渲染两次
    if (!document.getElementById(flagId)) init(dom);
  }, []);

  useEffect(() => {
    if (bounds[0]) {
      mouseBind(bounds[0], (x, y) => {
        if (y >= pxToNum(bounds[2].style.top) - 50) {
          y = pxToNum(bounds[2].style.top) - 50;
        }
        setBoundPos("top", { top: y });
      });

      mouseBind(bounds[2], (x, y) => {
        if (y <= pxToNum(bounds[0].style.top) + 50) {
          y = pxToNum(bounds[0].style.top) + 50;
        }
        setBoundPos("bottom", { top: y });
      });

      mouseBind(bounds[3], (x, y) => {
        if (x >= pxToNum(bounds[1].style.left) - 50) {
          x = pxToNum(bounds[1].style.left) - 50;
        }
        setBoundPos("left", { left: x });
      });

      mouseBind(bounds[1], (x, y) => {
        if (x <= pxToNum(bounds[3].style.left) + 50) {
          x = pxToNum(bounds[3].style.left) + 50;
        }
        setBoundPos("right", { left: x });
      });
    }
  }, [bounds]);

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

    setTimeout(() => {});
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
        if (pos.right) bounds[1].style.left = +parentWidth - pos.right + "px";
        else bounds[1].style.left = pos.left + "px";

        break;
      case "bottom":
        if (pos.bottom) bounds[2].style.top = +parentHeight - pos.bottom + "px";
        else bounds[2].style.top = pos.top + "px";
        break;
      case "left":
        bounds[3].style.left = pos.left + "px";
        break;
    }
    setBounds([...bounds]);
  };

  const mouseBind = (dom: HTMLElement, fn: (x: number, y: number) => void) => {
    dom.onmousedown = (e) => {
      // 鼠标移动，将鼠标位置给到element
      document.onmousemove = (e) => {
        e = e || window.event;
        // @ts-ignore
        let x = e.clientX - dom.parentNode.offsetLeft;
        // @ts-ignore
        let y = e.clientY - dom.parentNode.offsetTop + getScrollTop();
        x = x > 0 ? x : 0;
        y = y > 0 ? y : 0;
        if (x > parseInt(getStyle(dom.parentNode, "width").replace("px", ""))) {
          x = parseInt(getStyle(dom.parentNode, "width").replace("px", ""));
        }
        if (
          y > parseInt(getStyle(dom.parentNode, "height").replace("px", ""))
        ) {
          y = parseInt(getStyle(dom.parentNode, "height").replace("px", ""));
        }
        fn(x, y);
      };
    };
    // 鼠标松开
    document.onmouseup = () => {
      document.onmousemove = null;
    };
  };

  return {
    bounds,
    setBoundPos,
  };
}
