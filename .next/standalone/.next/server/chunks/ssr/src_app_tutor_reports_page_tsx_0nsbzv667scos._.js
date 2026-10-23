module.exports=[2873,a=>{"use strict";var b=a.i(36737),c=a.i(19024),d=a.i(15617),e=a.i(3379),f=a.i(10408),g=a.i(26380),h=a.i(37714);a.s(["default",0,function(){let{progress:a}=(0,d.useSession)(),[i,j]=(0,c.useState)(!1),[k,l]=(0,c.useState)("081234567890"),m=`[LAPORAN PERKEMBANGAN BELAJAR KODING // PEKAN KE-${a.currentWeek}]
Yth. Bapak/Ibu Wali Murid Andi Pratama,
Berikut kami sampaikan ringkasan capaian pembelajaran les privat koding pekan ini.

1. PROGRES KURIKULUM & TARGET
- Pekan Berjalan : Minggu ke-${a.currentWeek} dari 12 Pekan (Fase 1: Fondasi Logika & Capstone 1)
- Akumulasi XP   : ${a.xpPoints} XP
- Konsistensi    : ${a.streakDays} Hari berturut-turut

2. KEPATUHAN PR HARIAN (SENIN - KAMIS)
- Senin  [Recall]       : 100/100 (print & Input-Process-Output)
- Selasa [Code Reading] : 95/100  (Alur Eksekusi & Tracing Nilai)
- Rabu   [Debugging]    : 95/100  (Identifikasi & Perbaikan SyntaxError)
- Kamis  [Pre-reading]  : 100/100 (Variabel & Tipe Data Memori)

3. SESI TATAP MUKA 2 JAM (AKHIR PEKAN)
- Jumat  (Sesi 07): Fungsi Modular (def & return)
- Sabtu  (Sesi 08): Capstone 1 (Game CLI Interaktif Tebak Angka)

4. EVALUASI NALAR LOGIKA PENGAJAR
"${a.weeklyNote}"

--------------------------------------------------
PORTAL MONITORING ORANG TUA:
Bapak/Ibu dapat meninjau log kehadiran, arsip nilai, dan hasil karya program anak secara langsung melalui portal:
http://localhost:3000/parent/overview

Salam hormat,
Andricha Dea Mitra (Kak Tutor)`,n=async()=>{try{await navigator.clipboard.writeText(m),j(!0),setTimeout(()=>j(!1),2500)}catch{j(!0)}};return(0,b.jsx)("div",{className:"min-h-screen bg-[#FDFBF7] text-black font-sans antialiased",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6",children:[(0,b.jsxs)("div",{className:"bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row sm:items-end justify-between gap-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"text-xs uppercase tracking-widest font-black mb-1 flex items-center space-x-2 bg-[#86EFAC] px-2 py-0.5 border border-black w-fit",children:[(0,b.jsx)("span",{children:"TUTOR // DISPATCH"}),(0,b.jsx)("span",{children:"/"}),(0,b.jsx)("span",{children:"RAPOR MINGGUAN"})]}),(0,b.jsx)("h1",{className:"text-2xl sm:text-3xl font-black tracking-tight text-black uppercase",children:"Generator Rapor WhatsApp Orang Tua"}),(0,b.jsx)("p",{className:"text-xs sm:text-sm text-stone-800 font-bold mt-1 max-w-xl",children:"Format laporan otomatis terstruktur rapi untuk pelaporan transparansi dan evaluasi kualitatif kepada wali murid."})]}),(0,b.jsxs)("div",{className:"flex items-center space-x-2 shrink-0",children:[(0,b.jsx)("button",{onClick:n,className:"px-4 py-2.5 border-2 border-black bg-white hover:bg-[#FEF08A] text-black font-black text-xs transition flex items-center space-x-2 cursor-pointer shadow-[2px_2px_0px_#000] uppercase",children:i?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(f.f,{className:"w-4 h-4 text-black stroke-[3]"}),(0,b.jsx)("span",{children:"TERSALIN"})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(e.f,{className:"w-4 h-4 text-black stroke-[2.5]"}),(0,b.jsx)("span",{children:"SALIN TEKS"})]})}),(0,b.jsxs)("button",{onClick:()=>{let a=encodeURIComponent(m),b=k.replace(/^0/,"62").replace(/\D/g,"");window.open(`https://wa.me/${b}?text=${a}`,"_blank")},className:"px-5 py-2.5 bg-[#86EFAC] hover:bg-emerald-400 text-black border-2 border-black font-black text-xs transition flex items-center space-x-2 cursor-pointer shadow-[3px_3px_0px_#000] uppercase",children:[(0,b.jsx)(g.f,{className:"w-4 h-4 stroke-[2.5]"}),(0,b.jsx)("span",{children:"KIRIM WHATSAPP"})]})]})]}),(0,b.jsxs)("div",{className:"p-4 sm:p-5 bg-white border-2 border-black flex items-center justify-between flex-wrap gap-4 text-xs font-mono shadow-[3px_3px_0px_#000]",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,b.jsx)("span",{className:"text-stone-700 font-black",children:"PENERIMA:"}),(0,b.jsx)("span",{className:"text-black font-black font-sans uppercase",children:"Bambang Pratama (Wali Murid)"})]}),(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)("span",{className:"text-stone-700 font-black",children:"NOMOR WA:"}),(0,b.jsx)("input",{type:"text",value:k,onChange:a=>l(a.target.value),className:"bg-white border-2 border-black px-3.5 py-1.5 text-xs text-black font-mono focus:outline-none w-44 font-black shadow-[2px_2px_0px_#000]"})]})]}),(0,b.jsxs)("div",{className:"border-2.5 border-black bg-white overflow-hidden shadow-[5px_5px_0px_#000]",children:[(0,b.jsxs)("div",{className:"px-5 py-3.5 border-b-2 border-black bg-[#FEF08A] flex items-center justify-between text-xs font-mono",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-2 text-black font-black",children:[(0,b.jsx)(h.f,{className:"w-4 h-4 text-black stroke-[2.5]"}),(0,b.jsx)("span",{children:"DISPATCH_PREVIEW // WHATSAPP_FORMAT"})]}),(0,b.jsx)("span",{className:"text-black text-[11px] font-black bg-white px-2 py-0.5 border border-black",children:"AUTOSYNCED FROM DATABASE"})]}),(0,b.jsx)("div",{className:"p-6 bg-black overflow-x-auto",children:(0,b.jsx)("pre",{className:"text-xs font-mono text-yellow-300 leading-relaxed whitespace-pre-wrap selection:bg-emerald-800",children:m})}),(0,b.jsxs)("div",{className:"px-5 py-3 border-t-2 border-black bg-[#FDFBF7] flex items-center justify-between text-[11px] font-mono text-black",children:[(0,b.jsx)("span",{className:"font-black",children:"FORMAT: UTF-8 PLAIN / MARKDOWN"}),(0,b.jsx)("span",{className:"text-black font-black uppercase bg-[#86EFAC] px-2 py-0.5 border border-black",children:"SIAP DIKIRIM KE WALI MURID"})]})]})]})})}])}];

//# sourceMappingURL=src_app_tutor_reports_page_tsx_0nsbzv667scos._.js.map