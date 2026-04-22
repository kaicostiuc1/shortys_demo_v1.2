import { C } from "../lib/brand.js";

export default function Checker({ squareSize = 8, height = 8 }) {
  const tile = squareSize * 2;
  const red = encodeURIComponent(C.red);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}"><rect width="${squareSize}" height="${squareSize}" fill="${C.red}"/><rect x="${squareSize}" y="${squareSize}" width="${squareSize}" height="${squareSize}" fill="${C.red}"/></svg>`;
  const uri = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        backgroundColor: "#ffffff",
        backgroundImage: uri,
        backgroundRepeat: "repeat",
        backgroundSize: `${tile}px ${tile}px`,
        overflow: "hidden",
        lineHeight: 0,
      }}
    />
  );
}
