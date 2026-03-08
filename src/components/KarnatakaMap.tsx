import { useState } from "react";

/*
 * More geographically accurate Karnataka district SVG paths.
 * Coordinates derived from approximate lat/long boundaries mapped to SVG space.
 * viewBox maps ~74°E–78.5°E (x) and ~11.5°N–18.5°N (y, inverted).
 */
const districtPaths: Record<string, { d: string; cx: number; cy: number }> = {
  "Belgaum": {
    d: "M28,100 L38,85 L62,72 L98,68 L130,75 L148,88 L152,108 L145,132 L128,148 L108,155 L82,158 L58,150 L38,138 L28,118 Z",
    cx: 90, cy: 112
  },
  "Dharwad": {
    d: "M108,155 L128,148 L145,132 L152,108 L172,112 L185,128 L188,152 L178,172 L158,178 L135,175 L115,168 Z",
    cx: 152, cy: 148
  },
  "Uttara Kannada": {
    d: "M8,130 L28,100 L28,118 L38,138 L58,150 L82,158 L108,155 L115,168 L110,195 L98,228 L82,258 L65,278 L48,288 L32,275 L18,248 L8,218 L5,185 Z",
    cx: 55, cy: 205
  },
  "Shimoga": {
    d: "M65,278 L82,258 L98,228 L110,195 L115,168 L135,175 L158,178 L178,172 L192,185 L198,208 L192,235 L178,258 L158,275 L135,282 L108,285 L85,282 Z",
    cx: 142, cy: 232
  },
  "Chikmagalur": {
    d: "M48,288 L65,278 L85,282 L108,285 L135,282 L138,308 L128,332 L108,348 L85,352 L62,342 L45,325 L38,305 Z",
    cx: 88, cy: 315
  },
  "Udupi": {
    d: "M5,265 L18,248 L32,275 L48,288 L38,305 L28,328 L18,345 L8,335 L2,308 L2,282 Z",
    cx: 22, cy: 298
  },
  "Dakshina Kannada": {
    d: "M2,345 L8,335 L18,345 L28,328 L38,305 L45,325 L62,342 L68,368 L58,392 L42,408 L25,412 L12,398 L5,375 Z",
    cx: 32, cy: 368
  },
  "Hassan": {
    d: "M108,348 L128,332 L138,308 L135,282 L158,275 L178,258 L198,268 L212,288 L218,312 L208,338 L188,355 L165,362 L142,358 L118,355 Z",
    cx: 168, cy: 322
  },
  "Kodagu": {
    d: "M68,368 L62,342 L85,352 L108,348 L118,355 L122,378 L112,402 L95,415 L78,418 L62,408 L58,392 Z",
    cx: 92, cy: 385
  },
  "Mysuru": {
    d: "M112,402 L122,378 L118,355 L142,358 L165,362 L188,355 L205,368 L218,388 L222,412 L212,435 L192,448 L168,452 L142,445 L125,428 Z",
    cx: 170, cy: 405
  },
  "Mandya": {
    d: "M188,355 L208,338 L218,312 L238,308 L258,315 L268,335 L262,358 L248,372 L228,378 L218,388 L205,368 Z",
    cx: 238, cy: 345
  },
  "Tumkur": {
    d: "M178,172 L188,152 L208,145 L232,148 L255,158 L272,175 L278,198 L275,225 L262,248 L245,265 L238,308 L218,312 L212,288 L198,268 L178,258 L192,235 L198,208 L192,185 Z",
    cx: 238, cy: 222
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
  return 0.35 + (score / 100) * 0.55;
}

export default function KarnatakaMap({ data }: KarnatakaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const dataMap = Object.fromEntries(data.map(d => [d.name, d.score]));

  return (
    <div className="relative">
      <svg
        viewBox="-5 60 295 410"
        className="w-full h-auto max-h-[300px] sm:max-h-[420px]"
      >
        {Object.entries(districtPaths).map(([name, { d, cx, cy }]) => {
          const score = dataMap[name] ?? 0;
          const isHovered = hovered === name;

          return (
            <g
              key={name}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <path
                d={d}
                fill={getColor(score)}
                fillOpacity={getFillOpacity(score)}
                stroke="hsl(var(--border))"
                strokeWidth={isHovered ? 2.5 : 1}
                strokeLinejoin="round"
                style={{
                  filter: isHovered ? "brightness(1.3)" : undefined,
                  transition: "all 0.2s ease",
                }}
              />
              <text
                x={cx}
                y={cy - 7}
                textAnchor="middle"
                className="fill-foreground pointer-events-none select-none"
                style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.02em" }}
              >
                {name.length > 12 ? name.slice(0, 10) + "…" : name}
              </text>
              <text
                x={cx}
                y={cy + 7}
                textAnchor="middle"
                className="fill-foreground pointer-events-none select-none"
                style={{ fontSize: 12, fontWeight: 700 }}
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
