"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Folder,
  MemoryStick,
  Play,
  Puzzle,
  RotateCw,
  Server,
  Square,
  Terminal,
  Users,
} from "lucide-react";
import "./PanelPreview.css";

type Screen = "console" | "servers";
type LogLine = { text: string; kind?: "success" | "command" | "muted" };

const initialLogs: LogLine[] = [
  { text: "[14:32:01 INFO] Starting Minecraft server...", kind: "muted" },
  { text: "[14:32:02 INFO] Preparing your world" },
  { text: "[14:32:03 INFO] Done! Type help to get started.", kind: "success" },
  { text: "[14:32:08 INFO] Alex joined the game" },
  { text: "[14:32:12 INFO] Sam joined the game" },
];

export default function PanelPreview() {
  const id = useId();
  const [screen, setScreen] = useState<Screen>("console");
  const [running, setRunning] = useState(true);
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState(initialLogs);
  const [announcement, setAnnouncement] = useState("");
  const logContainer = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (logContainer.current)
      logContainer.current.scrollTop = logContainer.current.scrollHeight;
  }, [logs, screen]);

  function appendLog(lines: LogLine[]) {
    setLogs((current) => [...current, ...lines].slice(-7));
  }

  function power(action: "start" | "stop" | "restart") {
    setRunning(action !== "stop");
    const text =
      action === "stop"
        ? "Demo server stopped. Your world has been saved."
        : action === "restart"
          ? "Demo server restarted. Ready for players."
          : "Demo server started. Ready for players.";
    appendLog([{ text, kind: action === "stop" ? "muted" : "success" }]);
    setAnnouncement(text);
  }

  function submitCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = command.trim();
    if (!input) return;
    const response = !running
      ? "Start the demo server to try a command."
      : input.toLowerCase() === "list"
        ? "There are 2 players online: Alex, Sam"
        : input.toLowerCase() === "help"
          ? "Try list to see online players. Use the power buttons above."
          : "This is a preview. Try help or list — no commands reach a real server.";
    appendLog([
      { text: `> ${input}`, kind: "command" },
      { text: response, kind: "success" },
    ]);
    setCommand("");
    setAnnouncement(response);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
    setScreen(next === 0 ? "console" : "servers");
    tabs.current[next]?.focus();
  }

  return (
    <div
      className="hero-preview panel-demo"
      role="region"
      aria-label="Aquadactyl panel preview"
    >
      <div className="panel-demo-frame">
        <div className="panel-demo-header">
          <span className="panel-demo-brand">
            <Image
              src="/brand/aquadactyl-emblem.png"
              alt=""
              width={29}
              height={25}
            />
            Aquadactyl
          </span>
          <span className="panel-demo-environment">Interactive preview</span>
          <span className="panel-demo-avatar" aria-hidden="true">
            ED
          </span>
        </div>
        <div className="panel-demo-navigation">
          <div role="tablist" aria-label="Preview screens">
            {(["console", "servers"] as const).map((tab, index) => {
              const Icon = tab === "console" ? Terminal : Server;
              return (
                <button
                  key={tab}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${tab}`}
                  aria-controls={`${id}-panel-${tab}`}
                  aria-selected={screen === tab}
                  tabIndex={screen === tab ? 0 : -1}
                  onClick={() => setScreen(tab)}
                  onKeyDown={(event) => onTabKey(event, index)}
                >
                  <Icon size={14} aria-hidden="true" />
                  {tab === "console" ? "Console" : "Your servers"}
                </button>
              );
            })}
          </div>
          <span className="panel-demo-hint">
            Try it out <ArrowRight size={12} aria-hidden="true" />
          </span>
        </div>
        <div
          className="panel-demo-screen"
          role="tabpanel"
          id={`${id}-panel-console`}
          aria-labelledby={`${id}-tab-console`}
          hidden={screen !== "console"}
          tabIndex={0}
        >
          <div className="panel-demo-server-heading">
            <div>
              <h2>Community Survival</h2>
              <p>
                <Server size={12} aria-hidden="true" /> play.example.com:25565
              </p>
            </div>
            <Status running={running} />
          </div>
          <div
            className="panel-demo-power"
            aria-label="Demo server power controls"
          >
            <button
              type="button"
              className="demo-start"
              aria-label="Start demo server"
              disabled={running}
              onClick={() => power("start")}
            >
              <Play size={13} aria-hidden="true" /> Start
            </button>
            <button
              type="button"
              aria-label="Restart demo server"
              disabled={!running}
              onClick={() => power("restart")}
            >
              <RotateCw size={13} aria-hidden="true" /> Restart
            </button>
            <button
              type="button"
              className="demo-stop"
              aria-label="Stop demo server"
              disabled={!running}
              onClick={() => power("stop")}
            >
              <Square size={12} aria-hidden="true" /> Stop
            </button>
            <span>
              <Users size={12} aria-hidden="true" />{" "}
              {running ? "2 / 20" : "0 / 20"}
            </span>
          </div>
          <div
            className="panel-demo-terminal"
            aria-label="Sample server console"
          >
            <div className="panel-demo-logs" ref={logContainer}>
              {logs.map((line, index) => (
                <p
                  key={index}
                  className={line.kind ? `demo-log-${line.kind}` : undefined}
                >
                  {line.text}
                </p>
              ))}
            </div>
            <form onSubmit={submitCommand}>
              <ChevronRight size={15} aria-hidden="true" />
              <input
                aria-label="Demo console command"
                placeholder="Try help or list…"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                maxLength={120}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
              <button
                type="submit"
                aria-label="Send demo command"
                disabled={!command.trim()}
              >
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </form>
          </div>
          <div className="panel-demo-resources">
            <ResourceGraph
              label="CPU load"
              value={running ? "3.8" : "0"}
              unit="%"
              icon={Cpu}
              running={running}
              variant="cpu"
            />
            <ResourceGraph
              label="Memory"
              value={running ? "1.4" : "0"}
              unit="/ 4 GiB"
              icon={MemoryStick}
              running={running}
              variant="memory"
            />
          </div>
        </div>
        <div
          className="panel-demo-screen"
          role="tabpanel"
          id={`${id}-panel-servers`}
          aria-labelledby={`${id}-tab-servers`}
          tabIndex={0}
          hidden={screen !== "servers"}
        >
          <div className="panel-demo-servers">
            <div className="panel-demo-list-heading">
              <h2>Your servers</h2>
              <p>Everything you run, in one place.</p>
            </div>
            <div className="panel-demo-folder">
              <Folder size={13} aria-hidden="true" /> My community{" "}
              <span>2 servers</span>
            </div>
            <div className="panel-demo-server-card">
              <div className="panel-demo-card-heading">
                <span className="panel-demo-server-icon">
                  <Server size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3>Community Survival</h3>
                  <p>Minecraft · Paper</p>
                </div>
                <Status running={running} />
              </div>
              <div className="panel-demo-card-resources">
                <span>
                  <Cpu size={12} aria-hidden="true" /> {running ? "3.8%" : "0%"}{" "}
                  CPU
                </span>
                <span>
                  <MemoryStick size={12} aria-hidden="true" />{" "}
                  {running ? "1.4" : "0"} / 4 GiB
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setScreen("console");
                  tabs.current[0]?.focus();
                }}
              >
                Open console <ArrowRight size={13} aria-hidden="true" />
              </button>
            </div>
            <div className="panel-demo-server-card demo-secondary-server">
              <div className="panel-demo-card-heading">
                <span className="panel-demo-server-icon">
                  <Server size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3>Creative World</h3>
                  <p>Minecraft · Paper</p>
                </div>
                <Status running={false} />
              </div>
              <div className="panel-demo-card-resources">
                <span>
                  <Cpu size={12} aria-hidden="true" /> 0% CPU
                </span>
                <span>
                  <MemoryStick size={12} aria-hidden="true" /> 0 / 4 GiB
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-demo-footer">
          <span>
            <Puzzle size={13} aria-hidden="true" /> Blueprint included
          </span>
          <span>
            Manta daemon <i aria-hidden="true" />
          </span>
        </div>
      </div>
      <p className="panel-demo-caption">Illustrative interface · sample data</p>
      <span className="panel-demo-announcement" role="status">
        {announcement}
      </span>
    </div>
  );
}

function Status({ running }: { running: boolean }) {
  return (
    <span className={`panel-demo-status ${running ? "demo-running" : ""}`}>
      <i aria-hidden="true" />
      {running ? "Running" : "Offline"}
    </span>
  );
}

function ResourceGraph({
  label,
  value,
  unit,
  icon: Icon,
  running,
  variant,
}: {
  label: string;
  value: string;
  unit: string;
  icon: typeof Cpu;
  running: boolean;
  variant: "cpu" | "memory";
}) {
  const id = useId();
  const points = !running
    ? "0,35 240,35"
    : variant === "cpu"
      ? "0,32 12,29 24,31 36,18 48,24 60,21 72,26 84,13 96,19 108,16 120,25 132,19 144,22 156,9 168,15 180,13 192,20 204,12 216,16 228,8 240,12"
      : "0,31 12,28 24,29 36,24 48,25 60,23 72,24 84,20 96,19 108,21 120,17 132,18 144,15 156,16 168,12 180,14 192,11 204,12 216,8 228,10 240,9";
  return (
    <div className="panel-demo-resource">
      <div>
        <span>
          <Icon size={12} aria-hidden="true" /> {label}
        </span>
        <strong>
          {value}
          <small>{unit}</small>
        </strong>
      </div>
      <svg viewBox="0 0 240 44" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78d3f8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#78d3f8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,44 ${points} 240,44`} fill={`url(#${id})`} />
        <polyline
          points={points}
          fill="none"
          stroke="#78d3f8"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
