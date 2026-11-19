import { Activity, Bell, Droplets, HeartPulse, Send, Sprout, Thermometer } from 'lucide-react';

function Frame({ children, title }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900 text-left shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 truncate font-mono text-[10px] text-slate-400">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ChatMockup() {
  const users = [['Asha', true], ['Ravi', true], ['Meena', false]];
  return (
    <Frame title="chat-app · localhost">
      <div className="grid grid-cols-[0.8fr_1.6fr] gap-3">
        <div className="space-y-2">
          {users.map(([n, on]) => (
            <div key={n} className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5">
              <span className="relative h-5 w-5 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500">
                <span className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-ink-900 ${on ? 'bg-emerald-400' : 'bg-slate-500'}`} />
              </span>
              <span className="text-[10px] text-slate-300">{n}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-white/10 px-2.5 py-1.5 text-[10px] text-slate-200">Hey! Are you online?</div>
          <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2.5 py-1.5 text-[10px] text-white">Yes — just got your notification</div>
          <div className="max-w-[60%] rounded-xl rounded-tl-sm bg-white/10 px-2.5 py-1.5 text-[10px] text-slate-400">typing…</div>
          <div className="mt-1 flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5">
            <span className="flex-1 text-[10px] text-slate-500">Type a message</span>
            <Send className="h-3 w-3 text-violet-300" />
          </div>
        </div>
      </div>
      <div className="absolute right-3 top-10 flex items-center gap-1 rounded-full bg-fuchsia-500 px-2 py-0.5 text-[9px] font-semibold text-white shadow-lg">
        <Bell className="h-2.5 w-2.5" /> New message
      </div>
    </Frame>
  );
}

function HealthMockup() {
  const vitals = [
    [HeartPulse, 'Heart rate', '72 bpm', 'text-rose-300'],
    [Thermometer, 'Temp', '98.4°F', 'text-amber-300'],
    [Activity, 'SpO₂', '97%', 'text-emerald-300'],
  ];
  return (
    <Frame title="health-monitor · dashboard">
      <div className="grid grid-cols-3 gap-2">
        {vitals.map(([Icon, l, v, c]) => (
          <div key={l} className="rounded-lg bg-white/5 p-2">
            <Icon className={`h-3.5 w-3.5 ${c}`} />
            <p className="mt-1 text-[9px] text-slate-400">{l}</p>
            <p className="text-xs font-semibold text-white">{v}</p>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 300 60" className="mt-3 h-14 w-full">
        <polyline
          fill="none"
          stroke="url(#hg)"
          strokeWidth="2"
          points="0,30 40,30 55,30 62,10 70,50 78,30 120,30 135,30 142,5 150,55 158,30 200,30 215,30 222,12 230,48 238,30 300,30"
        />
        <defs>
          <linearGradient id="hg" x1="0" x2="1">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#f472b6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-rose-400/30 bg-rose-500/10 px-2 py-1.5 text-[10px] text-rose-200">
        <Bell className="h-3 w-3" /> Alert: abnormal reading detected
      </div>
    </Frame>
  );
}

function CropMockup() {
  return (
    <Frame title="smart-irrigation · monitor">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white/5 p-2">
          <Droplets className="h-3.5 w-3.5 text-sky-300" />
          <p className="mt-1 text-[9px] text-slate-400">Soil moisture sensor</p>
          <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
            <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-sky-400 to-violet-400" />
          </div>
        </div>
        <div className="rounded-lg bg-white/5 p-2">
          <Sprout className="h-3.5 w-3.5 text-emerald-300" />
          <p className="mt-1 text-[9px] text-slate-400">Next irrigation</p>
          <p className="text-xs font-semibold text-white">Scheduled</p>
        </div>
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {[40, 55, 35, 70, 50, 80, 60, 45, 75, 65].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/60 to-violet-400/80" style={{ height: `${h}%` }} />
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">Water usage · sensor-triggered</p>
    </Frame>
  );
}

const MOCKUPS = { chat: ChatMockup, health: HealthMockup, crop: CropMockup };

export default function ProjectMockup({ type }) {
  const Mock = MOCKUPS[type];
  return (
    <div className="relative">
      <Mock />
      <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-medium text-slate-200 backdrop-blur">
        Illustrative mockup · not an actual screenshot
      </span>
    </div>
  );
}
