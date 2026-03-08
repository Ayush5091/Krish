import { useState } from "react";

// Simplified Karnataka district SVG paths (approximate outlines)
const districtPaths: Record<string, { d: string; cx: number; cy: number }> = {
  "Belgaum": {
    d: "M80,30 L140,25 L160,50 L155,90 L120,100 L85,95 L65,65 Z",
    cx: 115, cy: 60
  },
  "Dharwad": {
    d: "M120,100 L155,90 L170,110 L165,140 L130,145 L110,125 Z",
    cx: 140, cy: 118
  },
  "Uttara Kannada": {
    d: "M40,70 L65,65 L85,95 L120,100 L110,125 L90,155 L50,160 L30,120 Z",
    cx: 72, cy: 115
  },
  "Shimoga": {
    d: "M90,155 L110,125 L130,145 L165,140 L175,170 L160,200 L120,205 L95,185 Z",
    cx: 132, cy: 170
  },
  "Hassan": {
    d: "M95,185 L120,205 L160,200 L165,230 L145,255 L110,250 L90,225 Z",
    cx: 127, cy: 225
  },
  "Chikmagalur": {
    d: "M90,155 L95,185 L90,225 L70,220 L55,190 L50,160 Z",
    cx: 73, cy: 188
  },
  "Udupi": {
    d: "M30,120 L50,160 L55,190 L40,200 L20,185 L15,145 Z",
    cx: 35, cy: 165
  },
  "Dakshina Kannada": {
    d: "M20,185 L40,200 L55,190 L70,220 L65,250 L45,265 L20,245 L10,215 Z",
    cx: 40, cy: 225
  },
  "Kodagu": {
    d: "M65,250 L70,220 L90,225 L110,250 L105,275 L80,280 Z",
    cx: 87, cy: 255
  },
  "Mysuru": {
    d: "M105,275 L110,250 L145,255 L170,265 L175,295 L145,310 L115,300 Z",
    cx: 140, cy: 280
  },
  "Mandya": {
    d: "M145,255 L165,230 L195,235 L200,260 L170,265 Z",
    cx: 175, cy: 250
  },
  "Tumkur": {
    d: "M165,140 L200,135 L220,160 L215,200 L195,235 L165,230 L160,200 L175,170 Z",
    cx: 192, cy: 180
  },
};

interface KarnatakaMapProps {
  data: { name: string; score: number }[];
}

function getColor(score: number): string {
  if (score > 65) return "hsl(0 72% 50%)";
  if (score > 40) return "hsl(38 80% 50%)";
  return "hsl(145 55% 42%)";
}

function getFillOpacity(score: number): number {
  return 0.3 + (score / 100) * 0.6;
}

export default function KarnatakaMap({ data }: KarnatakaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const dataMap = Object.fromEntries(data.map(d => [d.name, d.score]));

  return (
    <div className="relative">
      <svg
        viewBox="0 0 240 330"
        className="w-full h-auto"
        style={{ maxHeight: 400 }}
      >
        {/* Background */}
        <rect width="240" height="330" fill="transparent" />

        {Object.entries(districtPaths).map(([name, { d, cx, cy }]) => {
          const score = dataMap[name] ?? 0;
          const isHovered = hovered === name;

          return (
            <g
              key={name}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer transition-all"
            >
              <path
                d={d}
                fill={getColor(score)}
                fillOpacity={getFillOpacity(score)}
                stroke="hsl(var(--border))"
                strokeWidth={isHovered ? 2 : 1}
                className="transition-all duration-200"
                style={{
                  filter: isHovered ? "brightness(1.3)" : undefined,
                }}
              />
              <text
                x={cx}
                y={cy - 6}
                textAnchor="middle"
                className="fill-foreground pointer-events-none"
                style={{ fontSize: 7, fontWeight: 600 }}
              >
                {name.length > 10 ? name.slice(0, 8) + "…" : name}
              </text>
              <text
                x={cx}
                y={cy + 6}
                textAnchor="middle"
                className="fill-foreground pointer-events-none"
                style={{ fontSize: 10, fontWeight: 700 }}
              >
                {score}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered && dataMap[hovered] !== undefined && (
        <div className="absolute top-2 right-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg pointer-events-none">
          <p className="text-xs font-semibold text-foreground">{hovered}</p>
          <p className="text-lg font-bold text-foreground">{dataMap[hovered]}</p>
          <p className="text-[10px] text-muted-foreground">exploitation score</p>
        </div>
      )}
    </div>
  );
}
