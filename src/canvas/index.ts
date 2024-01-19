export class CanvasEditorText {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px MonoLisa";
    this.ctx.textBaseline = "top"; // handings, middle, alphabetic
    this.ctx.font = "20px MonoLisa";
    this.lineHeight = 24;
    this.x = 20;
    this.y = 20;
    this.editorWidth = this.canvas.width - this.x * 2;
    this.text = "";
    this.px = []
    this.py = []

    this.caretX = 0;
    this.caretY = 0;
    this.caretXR = 0;
    this.caretYR = 0;

    this.caretVisible = 0;
    const render = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawText();
      this.drawCaret()
      // requestAnimationFrame(render);
    };
    render();
    window.addEventListener("keydown", (e) => {
      this.caretX = this.caretXR
      this.caretY = this.caretYR
      e.preventDefault();
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 8:
          this.text = this.text.substring(0, this.text.length - 1);
          break;
        case 13:
          this.text += "\n";
          break;
        case 9:
          this.text += "  ";
          break;
        default:
          this.text += e.key;
          break;
      }
    this.caretVisible = !this.caretVisible;

    });
    window.addEventListener("click", (e) => {
      e.preventDefault();
      // this.caretX = 
      // this.caretY = 

    });
  }
  drawText() {
    let cx = []
    let cy = []
    let { x, y, canvas, lineHeight, editorWidth, text } = this;
    let wx = 0;

    for (const letter of text) {
      if (letter == "\n") {
        wx = 0;
        y += lineHeight;
        continue;
      }
      if (wx >= editorWidth) {
        wx = 0;
        y += lineHeight;
      }
      this.ctx.fillText(letter, x + wx, y);
      wx += this.ctx.measureText(letter).width;
      cx.push(x+wx)
      cx.push(y)
    }
    this.px=cx
    this.py=cy

    this.caretXR = x+wx;
    this.caretYR = y;
  }
  drawCaret(){
    // this.ctx.globalAlpha = this.caretVisible;
    // this.caretVisible += 0.555
    // if (this.caretVisible >= 1) {
    //   this.caretVisible = 0;
    // }
    this.ctx.fillRect(this.caretX, this.caretY, 3,20);
    // this.ctx.globalAlpha = 1;
      
  }
}

export class Graphics {
  canvasContext2D: CanvasRenderingContext2D;
  elementCanvas: HTMLCanvasElement;
  colors: Record<string,string>;
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
  drawRect(x:number, y:number, w:number, h:number, config) {
    let { bgColor, borderColor, borderWidth } = config;
    this.canvasContext2D.fillStyle = bgColor;
    this.canvasContext2D.fillRect(x, y, w, h);
    this.canvasContext2D.strokeStyle = borderColor;
    this.canvasContext2D.lineWidth = borderWidth;
    this.canvasContext2D.strokeRect(x, y, w, h);
  }

  drawGrid(x:number, y:number, w:number, h:number, gap:number, config) {
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
      this.canvasContext2D.fillText(i, i, gap / 2);
    }
    for (let i = 0; i < h; i += gap) {
      this.canvasContext2D.fillText(i, gap / 2, i);
    }
  }
  drawRoundRect(x, y, w, h, round, config = {}) {
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
  fillRoundRect(x, y, w, h, round, config = {}) {
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
  drawImage(img, x, y, w) {
    this.canvasContext2D.drawImage(img, x, y, w, (img.height / img.width) * w);
  }
  drawCircle(x, y, r) {
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
  fillCircle(x, y, r) {
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
  createLinearGradient(x1, y1, x2, y2, prop = [], name) {
    let gradiende = this.canvasContext2D.createLinearGradient(0, 0, 0, 200);
    for (const [exp, color] of prop) {
      gradiende.addColorStop(exp, color);
    }
    this.colors[name] = gradiende;
  }

  setShadow(x, y, blur, color) {
    this.canvasContext2D.shadowColor = color || "gray";
    this.canvasContext2D.shadowOffsetX = x;
    this.canvasContext2D.shadowOffsetY = y;
    this.canvasContext2D.shadowBlur = blur;
  }

  fillCirclex(x, y, w, h, br, color) {
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
  drawLine(i1, i2, f1, f2) {
    this.canvasContext2D.strokeStyle = "white";
    this.canvasContext2D.beginPath();
    this.canvasContext2D.moveTo(i1, i2);
    this.canvasContext2D.lineTo(f1, f2);
    this.canvasContext2D.stroke();
  }
  static color(h, s, l) {
    return Color.HSLToHexadecimal(h, s, l);
  }
  drawGraphicLine(x, y, w, h, dats) {
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

      row.forEach((column, i) => {
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
      row.forEach((column, i) => {
        this.fillCircle(i * gapX + x, h + y - column * gapY, 3);
      });
    });
  }
  getImageDate(x, y, w, h) {
    let mapColors = [];
    let imgData = this.canvasContext2D.getImageData(x, y, w, h);
    let reserva = [];
    for (let a = 0; a < imgData.data.length; a += 4) {
      reserva.push(
        Color.rgbaToHexadecimal(
          imgData.data[a],
          imgData.data[a + 1],
          imgData.data[a + 2]
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
