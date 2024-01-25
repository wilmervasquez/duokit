import { hslToHex, rgbaToHex } from "../color/index.js";

export class Graphics {
  canvasContext2D: CanvasRenderingContext2D;
  elementCanvas: HTMLCanvasElement;
  colors: Record<string,CanvasGradient>;
  constructor(canvasContext2D:CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.canvasContext2D = canvasContext2D;
    this.elementCanvas = canvas;
    this.colors = {};
  }
  static get(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    context.textBaseline = "top";
    context.font = "12px Inter";
    return [canvas, context, new Graphics(context, canvas)];
  }
  clear() {
    this.canvasContext2D.clearRect(
      0,
      0,
      this.elementCanvas.width,
      this.elementCanvas.height
    );
  }
  fillTextFormat(x: number, y:number, textFormat:Array<{value:string}>) {
    const { canvasContext2D } = this;
    canvasContext2D.fillStyle = "white";
    canvasContext2D.font = "20px MonoLisa";
    let wx = 0;
    for (const { value } of textFormat) {
      canvasContext2D.fillText(value, x + wx, y);
      console.dir(canvasContext2D);
      wx += canvasContext2D.measureText(value).width;
    }
  }
  drawRect(x:number, y:number, w:number, h:number, config:{bgColor:string, borderColor:string, borderWidth:number }) {
    let { bgColor, borderColor, borderWidth } = config;
    this.canvasContext2D.fillStyle = bgColor;
    this.canvasContext2D.fillRect(x, y, w, h);
    this.canvasContext2D.strokeStyle = borderColor;
    this.canvasContext2D.lineWidth = borderWidth;
    this.canvasContext2D.strokeRect(x, y, w, h);
  }

  drawGrid(x:number, y:number, w:number, h:number, gap:number, config:{bWidth:number,lineColor:string}) {
    let { bWidth, lineColor } = config;
    this.canvasContext2D.lineWidth = bWidth ?? 1;
    this.canvasContext2D.strokeStyle = lineColor;

    this.canvasContext2D.beginPath();
    for (let i = 0; i <= w; i += gap) {
      this.canvasContext2D.moveTo(x, i + y);
      this.canvasContext2D.lineTo(x + w, i + y);
    }
    for (let i = 0; i <= h; i += gap) {
      this.canvasContext2D.moveTo(x + i, y);
      this.canvasContext2D.lineTo(x + i, y + h);
    }
    this.canvasContext2D.stroke();

    this.canvasContext2D.textBaseline = "middle";
    this.canvasContext2D.textAlign = "center";
    this.canvasContext2D.font = "8px Innter";
    for (let i = 0; i < w; i += gap) {
      this.canvasContext2D.fillText(i.toString(), i, gap / 2);
    }
    for (let i = 0; i < h; i += gap) {
      this.canvasContext2D.fillText(i.toString(), gap / 2, i);
    }
  }
  drawRoundRect(x:number, y:number, w:number, h:number, round:number, config:{color:string}) {
    if (round > w / 2 || round > h / 2) {
      round = w / 2 > h / 2 ? h / 2 : w / 2;
    }

    this.canvasContext2D.fillStyle = config.color ?? "black";
    this.canvasContext2D.beginPath();
    this.canvasContext2D.arc(
      x + round,
      y + round,
      round,
      (Math.PI / 180) * 180,
      (Math.PI / 180) * -90,
      false
    );
    this.canvasContext2D.arc(
      x + w - round,
      y + round,
      round,
      (Math.PI / 180) * 270,
      (Math.PI / 180) * 0,
      false
    );
    this.canvasContext2D.arc(
      x + w - round,
      y + h - round,
      round,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 90,
      false
    );
    this.canvasContext2D.arc(
      x + round,
      y + h - round,
      round,
      (Math.PI / 180) * 90,
      (Math.PI / 180) * 180,
      false
    );
    this.canvasContext2D.closePath();
    this.canvasContext2D.stroke();
  }
  fillRoundRect(x:number, y:number, w:number, h:number, round:number, config:{color:string}) {
    if (round > w / 2 || round > h / 2) {
      round = w / 2 > h / 2 ? h / 2 : w / 2;
    }

    this.canvasContext2D.fillStyle = config.color ?? "black";
    this.canvasContext2D.beginPath();
    this.canvasContext2D.arc(
      x + round,
      y + round,
      round,
      (Math.PI / 180) * 180,
      (Math.PI / 180) * -90,
      false
    );
    this.canvasContext2D.arc(
      x + w - round,
      y + round,
      round,
      (Math.PI / 180) * 270,
      (Math.PI / 180) * 0,
      false
    );
    this.canvasContext2D.arc(
      x + w - round,
      y + h - round,
      round,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 90,
      false
    );
    this.canvasContext2D.arc(
      x + round,
      y + h - round,
      round,
      (Math.PI / 180) * 90,
      (Math.PI / 180) * 180,
      false
    );
    this.canvasContext2D.closePath();
    this.canvasContext2D.fill();
  }
  drawImage(img:HTMLImageElement, x:number, y:number, w:number) {
    this.canvasContext2D.drawImage(img, x, y, w, (img.height / img.width) * w);
  }
  drawCircle(x:number, y:number, r:number) {
    this.canvasContext2D.beginPath();
    this.canvasContext2D.arc(
      x,
      y,
      r,
      (Math.PI / 180) * 0,
      (Math.PI / 2) * 360,
      false
    );
    this.canvasContext2D.stroke();
  }
  fillCircle(x:number, y:number, r:number) {
    this.canvasContext2D.beginPath();
    this.canvasContext2D.arc(
      x,
      y,
      r,
      (Math.PI / 180) * 0,
      (Math.PI / 2) * 360,
      false
    );
    this.canvasContext2D.fill();
  }
  createLinearGradient(x1:number, y1:number, x2:number, y2:number, prop: [number,string][], name:string) {
    let gradiende = this.canvasContext2D.createLinearGradient(x1,y1,x2,y2);
    for (const [exp, color] of prop) {
      gradiende.addColorStop(exp, color);
    }
    this.colors[name] = gradiende;
  }

  setShadow(x:number, y:number, blur:number, color:string) {
    this.canvasContext2D.shadowColor = color || "gray";
    this.canvasContext2D.shadowOffsetX = x;
    this.canvasContext2D.shadowOffsetY = y;
    this.canvasContext2D.shadowBlur = blur;
  }

  fillCirclex(x:number, y:number, w:number, h:number, br:number, color:string) {
    let refBr = 2.6;
    this.canvasContext2D.fillStyle = color ?? "white";
    this.canvasContext2D.beginPath();
    this.canvasContext2D.moveTo(x, y + br);
    this.canvasContext2D.bezierCurveTo(
      x,
      y + br / refBr,
      x + br / refBr,
      y,
      x + br,
      y
    );
    this.canvasContext2D.lineTo(x + w - br, y);
    this.canvasContext2D.bezierCurveTo(
      x + w - br / refBr,
      y,
      x + w,
      y + br / refBr,
      x + w,
      y + br
    );
    this.canvasContext2D.lineTo(x + w, y + h - br);

    this.canvasContext2D.bezierCurveTo(
      x + w,
      y + h - br / refBr,
      x + w - br / refBr,
      y + h,
      x + w - br,
      y + h
    );
    this.canvasContext2D.lineTo(x + br, y + h);
    this.canvasContext2D.bezierCurveTo(
      x + br / refBr,
      y + h,
      x,
      y + h - br / refBr,
      x,
      y + h - br
    );
    this.canvasContext2D.fill();
  }
  drawLine(i1:number, i2:number, f1:number, f2:number) {
    this.canvasContext2D.strokeStyle = "white";
    this.canvasContext2D.beginPath();
    this.canvasContext2D.moveTo(i1, i2);
    this.canvasContext2D.lineTo(f1, f2);
    this.canvasContext2D.stroke();
  }
  static color(h:number, s:number, l:number) {
    return hslToHex(h, s, l);
  }
  drawGraphicLine(x:number, y:number, w:number, h:number, dats:any[]) {
    let mayor = 0;
    let gapY = Math.max(...dats.map((row) => Math.max(...row)));

    for (const row of dats) {
      if (row.length >= mayor) {
        mayor = row.length;
      }
    }

    let gapX = w / (mayor - 1);

    gapY = h / gapY;

    console.log(dats);
    dats.forEach((row, io) => {
      this.canvasContext2D.strokeStyle = Graphics.color(
        (360 / dats.length) * io,
        100,
        60
      );

      this.canvasContext2D.beginPath();

      row.forEach((column:number, i:number) => {
        if (i == 0) {
          this.canvasContext2D.moveTo(i * gapX + x, h + y - column * gapY);
        }
        this.canvasContext2D.lineTo(i * gapX + x, h + y - column * gapY);
        // console.log(i * gap + x, h - column);
      });
      this.canvasContext2D.stroke();

      this.canvasContext2D.fillStyle = Graphics.color(
        (360 / dats.length) * io,
        100,
        50
      );
      row.forEach((column:number, i:number) => {
        this.fillCircle(i * gapX + x, h + y - column * gapY, 3);
      });
    });
  }
  getImageDate(x:number, y:number, w:number, h:number) {
    let mapColors = [];
    let imgData = this.canvasContext2D.getImageData(x, y, w, h);
    let reserva = [];
    for (let a = 0; a < imgData.data.length; a += 4) {
      reserva.push(

        rgbaToHex(
          imgData.data[a],
          imgData.data[a + 1],
          imgData.data[a + 2],
          1
        )
      );
      if (a % (imgData.width * 4) == 0) {
        mapColors.push(reserva);
        reserva = [];
      }
    }
    return mapColors;
  }
 
}
