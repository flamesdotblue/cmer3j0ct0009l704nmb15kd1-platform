"use client";
import Image from 'next/image'
import { useState } from 'react'

const BG = 'https://cdn.dribbble.com/userupload/21135707/file/original-aa36ba5799d82ee446dd365c5ec88cb1.jpg?resize=752x564&vertical=center'

export default function Page() {
  const [power, setPower] = useState(true)
  const [volume, setVolume] = useState(60)
  const [input, setInput] = useState<'aux' | 'bt' | 'phono'>('bt')

  return (
    <main className="min-h-dvh w-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-5xl glass rounded-3xl p-6 md:p-10 canvas-grain">
        <header className="flex items-center gap-4">
          <div className="size-12 rounded-full skeuo-button grid place-items-center" aria-hidden>
            <span className="block size-3 rounded-full" style={{background: 'radial-gradient(circle, #b56b3f 0%, rgba(181,107,63,0.35) 70%, rgba(181,107,63,0.1) 100%)'}} />
          </div>
          <div className="text-ink/90">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">Skeuomorphic Studio</h1>
            <p className="text-sm md:text-base text-ink/70 -mt-0.5">Warm clay/leather inspired controls</p>
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
                      <div className="w-full rounded-t-sm" style={{height: `${Math.round(level)}%`, background: `linear-gradient(180deg, #caa27b 0%, #b56b3f 60%, #6a4a3c 100%)`, boxShadow: 'inset 0 0 6px rgba(0,0,0,0.25)'}}/>
                    </div>
                  )
                })}
              </div>
            </div>
          </Panel>

          <Panel title="Volume">
            <div className="flex flex-col items-center gap-4">
              <Dial value={volume} onChange={setVolume} />
              <span className="text-ink/80 text-sm">{volume}%</span>
            </div>
          </Panel>
        </section>

        <footer className="mt-10 flex items-center justify-between text-ink/70 text-xs">
          <span>Background art courtesy of Dribbble upload (for demo only)</span>
          <a className="underline hover:text-ink" href="https://dribbble.com/" target="_blank" rel="noreferrer">Source</a>
        </footer>

        <div className="pointer-events-none select-none absolute -right-10 -bottom-10 opacity-60 hidden lg:block">
          <Image alt="Decor" src={BG} width={500} height={375} className="rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25)]"/>
        </div>
      </div>
    </main>
  )
}

function Panel({ title, children }: { title: string, children: React.ReactNode }){
  return (
    <div className="rounded-soft skeuo-surface p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[color:var(--accent)] drop-shadow">{title}</h2>
        <div className="text-[10px] text-ink/60 px-2 py-0.5 rounded-full skeuo-emboss">Mk II</div>
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
      <div className={`size-16 skeuo-button grid place-items-center ${active ? 'ring-2 ring-[color:var(--accent)]' : ''}`}> 
        <div className={`size-2 rounded-full`} style={{background: active ? 'radial-gradient(circle, var(--accent) 0%, rgba(181,107,63,0.35) 70%, rgba(181,107,63,0.1) 100%)' : '#a8a29e'}}></div>
      </div>
      <span className={`text-xs tracking-wide ${active ? 'text-[color:var(--accent)]' : 'text-ink/70'}`}>{label}</span>
    </button>
  )
}

function PowerToggle({on, onToggle}:{on:boolean, onToggle:()=>void}){
  return (
    <button onClick={onToggle} className="flex items-center gap-3">
      <div className="skeuo-toggle" data-on={String(on)}>
        <div className="knob" />
      </div>
      <span className={`uppercase text-xs tracking-widest ${on? 'text-[color:var(--accent)]':'text-ink/60'}`}>{on? 'On':'Off'}</span>
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
      <div className="relative size-24 rounded-full" style={{background: 'linear-gradient(180deg, #f1e8da 0%, #e7dcc9 60%, #dbceb7 100%)', boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.18), inset -3px -3px 6px rgba(255,255,255,0.55)'}}>
        <div className="absolute left-1/2 top-1/2 h-10 w-1 origin-bottom" style={{background: 'linear-gradient(180deg, var(--accent), #8e5531)', transform:`rotate(${angle}deg) translate(-50%,-100%)`, boxShadow: '0 0 2px rgba(0,0,0,0.25)'}} />
        <div className="absolute inset-2 rounded-full" style={{boxShadow:'inset 0 0 2px rgba(0,0,0,0.18), inset 10px 10px 18px rgba(0,0,0,0.12), inset -10px -10px 18px rgba(255,255,255,0.5)'}}></div>
      </div>
    </div>
  )
}
