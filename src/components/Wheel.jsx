import { useEffect, useState } from "react";
import { getRandomInt } from "../utils";

const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor,
  contrastColor,
  buttonText,
  isOnlyOnce,
}) => {
  let colorSelected = 0;
  let currentSegment = "";
  let isStarted = false;
  let slowEndSpin = [true, true, true, true];
  const [isFinished, setFinished] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  let timerHandle = 0;
  let defaultTimerHandle = null;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  const size = 290;
  let countWinner = 0;
  let winner = Math.round(segments.length / 2);
  let canvasContext = null;
  let maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * 100;
  const downTime = segments.length * 1800;
  let spinStart = 0;
  let frames = 0;
  const centerX = 300;
  const centerY = 300;
  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);
  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById("canvas");
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", 1000);
      canvas.setAttribute("height", 600);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }

    // default spin
    angleDelta = 0;
    if (defaultTimerHandle) clearInterval(defaultTimerHandle);
    defaultTimerHandle = setInterval(defaultSpin, timerDelay);

    canvas.addEventListener("click", spin, false);
    canvasContext = canvas.getContext("2d");
  };

  const spin = () => {
    slowEndSpin = [true, true, true, true];
    if (isFirst) setIsFirst(false);
    if (defaultTimerHandle) clearInterval(defaultTimerHandle);

    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      // maxSpeed = (Math.random() * 10 + 1.5) / 10;
      maxSpeed = 0.4;
      // maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  const defaultSpin = () => {
    draw();
    let progress = 0.02;
    angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
  };

  const changeSpeedSlow = (progress) => {
    if (slowEndSpin[0] && progress >= 0.3 && progress < 0.4) {
      maxSpeed = maxSpeed / (0.6 + Math.random());
      slowEndSpin[0] = false;
    }
    if (slowEndSpin[1] && progress >= 0.4 && progress < 0.5) {
      maxSpeed = maxSpeed / (1.2 + Math.random());
      slowEndSpin[1] = false;
    }
    if (slowEndSpin[2] && progress >= 0.5 && progress < 0.6) {
      maxSpeed = maxSpeed / (1 + Math.random());
      slowEndSpin[2] = false;
    }
    if (slowEndSpin[3] && progress >= 0.7 && progress < 0.8) {
      maxSpeed = maxSpeed / (1 + Math.random());
      slowEndSpin[3] = false;
    }
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        var t = ((downTime - duration) / (Math.PI * 2)) * angleDelta;
        if (
          currentSegment === winningSegment &&
          frames > segments.length &&
          t < 120
        ) {
          countWinner += 1;
        }

        if (
          currentSegment === winningSegment &&
          frames > segments.length &&
          t < 85 &&
          countWinner >= winner
        ) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
          draw();
        } else {
          progress = duration / downTime;
          changeSpeedSlow(progress);

          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        changeSpeedSlow(progress);

        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
      countWinner = 0;
      winner = Math.round(segments.length / 2);
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle =
      segColors[key < segColors.length ? key : key % segColors.length];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || "white";
    ctx.font = "bold 1em proxima-nova";
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1.2em proxima-nova";
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = segColors[colorSelected] || "black";
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fill();
    ctx.font = "bold 1.5em proxima-nova";
    ctx.fillStyle = contrastColor || "white";
    ctx.textAlign = "center";
    ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor || "black";
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fileStyle = contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor || "black";
    ctx.font = "bold 2.5em proxima-nova";
    currentSegment = segments[i];
    colorSelected = i < segColors.length ? i : i % segColors.length;
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };
  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 500);
  };
  return (
    <div className="relative">
      <canvas
        id="canvas"
        width="600"
        height="600"
        style={{
          pointerEvents: isFinished && !isOnlyOnce ? "none" : "auto",
        }}
      />
      {isFirst ? (
        <svg
          className="absolute inset-0 cursor-pointer"
          viewBox="-100 -100 200 200"
          filter="drop-shadow(0 0 10px #000)"
          fill="white"
          onClick={() => {
            document.getElementById("canvas").click();
          }}
        >
          <defs>
            <path id="curve-top" d="M -52 0 A 1 1 0 0 1 52 0"></path>
            <path id="curve-bottom" d="M -60 0 A 1 1 0 0 0 60 0"></path>
          </defs>
          <text textAnchor="middle">
            <textPath xlinkHref="#curve-top" startOffset="50%">
              <tspan className="click-to-spin">Click để quay</tspan>
            </textPath>
          </text>
          <text textAnchor="middle" className="click-to-spin">
            <textPath xlinkHref="#curve-bottom" startOffset="50%">
              vận may sẽ tới!
            </textPath>
          </text>
        </svg>
      ) : (
        ""
      )}
    </div>
  );
};
export default WheelComponent;
