"use client";
import Image from 'next/image'
import { useState } from 'react'

export default function Page() {
  const [power, setPower] = useState(true)
  const [volume, setVolume] = useState(60)
  const [input, setInput] = useState<'aux' | 'bt' | 'phono'>('bt')

  return (
    <main className="min-h-dvh w-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-5xl glass rounded-3xl p-6 md:p-10 canvas-grain">
        <header className="flex items-center gap-4">
          <div className="size-12 rounded-full skeuo-button grid place-items-center" aria-hidden>
            <span className="block size-3 rounded-full bg-red-500 shadow-inner" />
          </div>
          <div className="text-white/90">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">Skeuomorphism Studio</h1>
            <p className="text-sm md:text-base text-white/70 -mt-0.5">Tactile controls inspired by classic hardware</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <PowerToggle on={power} onToggle={() => setPower(p => !p)} />
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Panel title="Input Selector">
            <div className="grid grid-cols-3 gap-4">
              {(['aux','bt','phono'] as const).map(key => (
                <KnobButton key={key} label={key.toUpperCase()} active={input===key} onClick={() => setInput(key)} />
              ))}
            </div>
          </Panel>

          <Panel title="VU Meter">
            <div className="relative skeuo-surface rounded-soft p-6 h-44 overflow-hidden">
              <div className="absolute inset-4 rounded-md skeuo-emboss"></div>
              <div className="relative z-10 h-full flex items-end gap-2">
                {[...Array(16)].map((_,i)=>{
                  const level = Math.max(0, Math.min(100, volume + (Math.sin((i+1)/2)+1)*20 - i*3));
                  return (
                    <div key={i} className="flex-1 flex items-end">
                      <div className="w-full rounded-t-sm" style={{height: `${Math.round(level)}%`, background: `linear-gradient(180deg, #7CFC00 0%, #FFD700 60%, #FF4500 100%)`, boxShadow: 'inset 0 0 6px rgba(0,0,0,0.45)'}}/>
                    </div>
                  )
                })}
              </div>
            </div>
          </Panel>

          <Panel title="Volume">
            <div className="flex flex-col items-center gap-4">
              <Dial value={volume} onChange={setVolume} />
              <span className="text-white/80 text-sm">{volume}%</span>
            </div>
          </Panel>
        </section>

        <footer className="mt-10 flex items-center justify-between text-white/70 text-xs">
          <span>Background art courtesy of Dribbble upload (for demo only)</span>
          <a className="underline hover:text-white" href="https://dribbble.com/" target="_blank" rel="noreferrer">Source</a>
        </footer>

        <div className="pointer-events-none select-none absolute -right-10 -bottom-10 opacity-50 hidden lg:block">
          <Image alt="Decor" src="https://cdn.dribbble.com/userupload/6864415/file/original-03842759e0b92248098f28aebd63de5f.png?resize=1504x846&vertical=center" width={600} height={338} className="rounded-2xl shadow-skeuo"/>
        </div>
      </div>
    </main>
  )
}

function Panel({ title, children }: { title: string, children: React.ReactNode }){
  return (
    <div className="rounded-soft skeuo-surface p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-50 drop-shadow">{title}</h2>
        <div className="text-[10px] text-white/60 px-2 py-0.5 rounded-full skeuo-emboss">Mk II</div>
      </div>
      <div className="skeuo-emboss rounded-xl p-4 bg-transparent">
        {children}
      </div>
    </div>
  )
}

function KnobButton({label, active, onClick}:{label:string, active?:boolean, onClick?:()=>void}){
  return (
    <button onClick={onClick} className="group flex flex-col items-center gap-2">
      <div className={`size-16 skeuo-button grid place-items-center ${active ? 'ring-2 ring-brass' : ''}`}> 
        <div className={`size-2 rounded-full ${active ? 'bg-green-400' : 'bg-zinc-500'}`}></div>
      </div>
      <span className={`text-xs tracking-wide ${active ? 'text-white' : 'text-white/70'}`}>{label}</span>
    </button>
  )
}

function PowerToggle({on, onToggle}:{on:boolean, onToggle:()=>void}){
  return (
    <button onClick={onToggle} className="flex items-center gap-3">
      <div className="skeuo-toggle" data-on={String(on)}>
        <div className="knob" />
      </div>
      <span className={`uppercase text-xs tracking-widest ${on? 'text-green-300':'text-white/60'}`}>{on? 'On':'Off'}</span>
    </button>
  )
}

function Dial({ value, onChange }: { value: number; onChange: (v:number)=>void }){
  const angle = -135 + (value/100)*270

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect()
    const cx = rect.left + rect.width/2
    const cy = rect.top + rect.height/2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const rad = Math.atan2(dy, dx)
    let deg = (rad * 180) / Math.PI
    deg = deg - 90
    if (deg < -180) deg += 360
    const clamped = Math.max(-135, Math.min(135, deg))
    const pct = Math.round(((clamped + 135) / 270) * 100)
    onChange(pct)
  }

  return (
    <div className="relative size-36 rounded-full skeuo-surface skeuo-emboss grid place-items-center select-none"
      onMouseDown={(downEvt)=>{
        const move = (e: MouseEvent)=> onDrag(e as unknown as React.MouseEvent<HTMLDivElement>)
        const up = ()=>{
          window.removeEventListener('mousemove', move)
          window.removeEventListener('mouseup', up)
        }
        window.addEventListener('mousemove', move)
        window.addEventListener('mouseup', up)
      }}
    >
      <div className="absolute inset-4 rounded-full skeuo-emboss"></div>
      <div className="relative size-24 rounded-full bg-gradient-to-b from-[#dfd9ce] to-[#c9c2b3] shadow-[inset_3px_3px_6px_rgba(0,0,0,0.35),inset_-3px_-3px_6px_rgba(255,255,255,0.35)]">
        <div className="absolute left-1/2 top-1/2 h-10 w-1 bg-[#7a6f5c] origin-bottom" style={{transform:`rotate(${angle}deg) translate(-50%,-100%)`}} />
        <div className="absolute inset-2 rounded-full" style={{boxShadow:'inset 0 0 2px rgba(0,0,0,0.4), inset 10px 10px 18px rgba(0,0,0,0.25), inset -10px -10px 18px rgba(255,255,255,0.3)'}}></div>
      </div>
    </div>
  )
}
