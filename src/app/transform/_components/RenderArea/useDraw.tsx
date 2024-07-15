

import { useRef, useEffect } from "react";

const opentype: any = require('opentype.js');

let fontsize = 30;
let Horizontal = 4;
let Vertical = 9.5;
let route = 10;
let topBoundary = 63;
let bottomBoundary = 700;
let leftBoundary = 35;
let rightBoundary = 1012;
let offset = 0;

export default function useDraw(id: string) {
  if (!id) throw "id不能为空";

  const parentRef = useRef<HTMLElement | null>(null);
  let canvas: any = useRef<HTMLCanvasElement>(null);
  let canvasCtx: any = useRef();

  useEffect(() => {
    const dom: HTMLElement = document.getElementById(id)!;
    if (!dom) return;
    parentRef.current = dom;
    initPaper(500, 707);
  }, []);

  const initPaper = (width: number, height: number) => {
    if (canvas.current) {
      canvas.current.remove();
    }

    canvas.current = document.createElement("canvas");
    canvas.current.width = width;
    canvas.current.height = height;
    canvas.current.style.position = "absolute";
    canvas.current.style.top = "0";
    parentRef.current!.appendChild(canvas.current);
    canvasCtx.current = canvas.current.getContext("2d");
  };

  const rotateT = (x0: number, y0: number, x: number, y: number, a: number) => {
    let _x = (x - x0) * Math.cos(a) - (y - y0) * Math.sin(a) + x0;
    let _y = (y - y0) * Math.cos(a) + (x - x0) * Math.sin(a) + y0;
    return [_x, _y];
  };

  // @ts-ignore
  const drawText = (path, ctx, points, route, offset, fontsize) => {
    let index = 0;
    let distence: any = [];
    let a = 0;
    let vd = 0;
    let hd = 0;
    ctx.beginPath();
    for (let i = 0; i < path.commands.length; i += 1) {
      const cmd = path.commands[i];
      if (cmd.type === "M") {
        a =
          ((-1 * route * Math.PI) / 150) *
          Math.random() *
          (Math.random() > 0.5 ? 1 : -1);
        vd =
          ((offset * fontsize) / 250) *
          Math.random() *
          (Math.random() > 0.5 ? 1 : -1);
        hd =
          ((offset * fontsize) / 250) *
          Math.random() *
          (Math.random() > 0.5 ? 1 : -1);

        distence = rotateT(points[index][0], points[index][1], 0, 0, -a);
        ctx.translate(distence[0] + hd, distence[1] + vd);
        ctx.rotate(-a);

        ctx.moveTo(cmd.x, cmd.y);
      } else if (cmd.type === "L") {
        ctx.lineTo(cmd.x, cmd.y);
      } else if (cmd.type === "C") {
        ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
      } else if (cmd.type === "Q") {
        ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
      } else if (cmd.type === "Z") {
        ctx.rotate(a);
        ctx.translate(-distence[0] - hd, -distence[1] - vd);
        index += 1;
        ctx.closePath();
      }
    }
    if (path.fill) {
      ctx.fillStyle = path.fill;
      ctx.fill();
    }
    if (path.stroke) {
      ctx.strokeStyle = path.stroke;
      ctx.lineWidth = path.strokeWidth;
      ctx.stroke();
    }
  };

  const getPoints = (path: any) => {
    let glypes = [];
    let tempGlype = [];
    for (let i = 0; i < path.commands.length; i++) {
      tempGlype.push(path.commands[i]);
      if (path.commands[i].type == "Z") {
        glypes.push(tempGlype);
        tempGlype = [];
      }
    }
    let minx = 10000;
    let maxx = 0;
    let points = [];

    for (let i = 0; i < glypes.length; i++) {
      let temppath = new opentype.Path();
      temppath.commands = glypes[i];
      let box = temppath.getBoundingBox();

      if (box.x1 > maxx) {
        maxx = box.x1;
      }
      if (box.x1 < minx) {
        minx = box.x1;
      }
      if (box.x2 > maxx) {
        maxx = box.x2;
      }
      if (box.x2 < minx) {
        minx = box.x2;
      }

      points.push([(box.x1 + box.x2) / 2, (box.y1 + box.y2) / 2]);
    }

    return [points, maxx - minx];
  };

  const clearArea = (boundary = [15, 500 - 15, 707 - 15, 15]) => {
    let [topBoundary, rightBoundary, bottomBoundary, leftBoundary] = boundary;
    canvasCtx.current.clearRect(
      leftBoundary,
      topBoundary,
      rightBoundary - leftBoundary,
      bottomBoundary - topBoundary
    );
  };

  const write = (
    words = "memo 类似于 class 中 pureComponent 的特性,用于在函数式组件的父组件中对子组件进行缓存,避免在父组件重新渲染时重新渲染子组件,只有在属性发生变化时重新渲染组件",
    font: any = "/fonts/hy.ttf",
    fontsize = 30,
    space = [4, 9.5],
    boundary = [15, 500 - 15, 707 - 15, 15],
    route = 10,
    offset = 0
  ) => {
    opentype.load(font, (e: Error, f: any) => {
      if (e) {
        alert("字体文件解析错误，重试或者请换一个字体文件");
      }
      clearArea()
      font = f;
      const ctx: any = canvasCtx.current;
      let [Horizontal, Vertical] = space;
      let [topBoundary, rightBoundary, bottomBoundary, leftBoundary] = boundary;
      //初始化边界
      ctx.translate(leftBoundary, topBoundary);
      let Vlimit = rightBoundary - leftBoundary;
      let Hlimit = bottomBoundary - topBoundary;
      //处理文字
      let widths = 0;
      let heights = fontsize;
      for (let i = 0; i < words.length; i++) {
        if (words[i] == " ") {
          let width = fontsize / 2;
          if (widths + width + Horizontal > Vlimit) {
            ctx.translate(-widths, fontsize + Vertical);
            widths = 0;
            heights = heights + fontsize + Vertical;
            if (heights > Hlimit) {
              console.log("文字超过了");
              ctx.translate(-widths, -(heights - fontsize));
              ctx.translate(-leftBoundary, -topBoundary);
              return words.slice(i);
            }
          }
          ctx.translate(width + Horizontal, 0);
          widths += width + Horizontal;
        } else if (words[i] == "\n") {
          ctx.translate(-widths, fontsize + Vertical);
          widths = 0;
          heights = heights + fontsize + Vertical;
          if (heights > Hlimit) {
            console.log("文字超过了");
            ctx.translate(-widths, -(heights - fontsize));
            ctx.translate(-leftBoundary, -topBoundary);
            return words.slice(i);
          }
        } else {
          let path = font.getPath(words[i], 0, fontsize, fontsize);
          if (path.commands.length == 0) {
            path = font.getPath("#", 0, fontsize, fontsize);
            path.fill = "red";
          }
          let [points, width] = getPoints(path);
          // @ts-ignore
          if (widths + width + Horizontal > Vlimit) {
            ctx.translate(-widths, fontsize + Vertical);
            widths = 0;
            heights = heights + fontsize + Vertical;
            if (heights > Hlimit) {
              console.log("文字超过了");
              ctx.translate(-widths, -(heights - fontsize));
              ctx.translate(-leftBoundary, -topBoundary);
              return words.slice(i);
            }
          }
          drawText(path, ctx, points, route, offset, fontsize);
          // @ts-ignore
          ctx.translate(width + Horizontal, 0);
          // @ts-ignore
          widths += width + Horizontal;
        }
      }

      ctx.translate(-widths, -(heights - fontsize));
      ctx.translate(-leftBoundary, -topBoundary);
      return "";
    });
  };

  return { write };
}
