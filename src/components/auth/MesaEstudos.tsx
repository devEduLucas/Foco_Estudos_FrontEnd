const AZUL = '#2F5D83';
const AZUL_ESCURO = '#254B6A';
const TEXTO = '#111827';
const CINZA = '#6B7280';
const BORDA = '#E5E7EB';

const PAUTA = [66, 84, 102, 120, 138, 156, 174, 192, 210, 228];
const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
// Novembro/2026 começa em um domingo.
const DIAS_MES = Array.from({ length: 30 }, (_, i) => i + 1);

const AGENDA = [
  { dia: 'Seg', texto: 'Leitura cap. 4', feita: true },
  { dia: 'Ter', texto: 'Slides do seminário', feita: true },
  { dia: 'Qua', texto: 'Lista de exercícios', feita: false },
  { dia: 'Qui', texto: 'Prova de Cálculo II', feita: false },
  { dia: 'Sex', texto: 'Relatório de Física', feita: false },
];

const TAREFAS = [
  { texto: 'Ler capítulo 4', feita: true },
  { texto: 'Lista de exercícios', feita: true },
  { texto: 'Slides do seminário', feita: false },
  { texto: 'Relatório de Física', feita: false },
];

/** Composição decorativa: mesa de estudos vista de cima. */
export function MesaEstudos({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 410"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="mesa-sombra" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor={AZUL_ESCURO} floodOpacity="0.14" />
        </filter>
        <filter id="mesa-sombra-leve" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor={AZUL_ESCURO} floodOpacity="0.1" />
        </filter>
        <pattern id="mesa-pontos" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="0.8" fill={AZUL_ESCURO} fillOpacity="0.09" />
        </pattern>
        <linearGradient id="mesa-lombada" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={AZUL_ESCURO} stopOpacity="0" />
          <stop offset="0.5" stopColor={AZUL_ESCURO} stopOpacity="0.16" />
          <stop offset="1" stopColor={AZUL_ESCURO} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Tampo da mesa */}
      <rect width="640" height="410" rx="14" fill="#F6F3EC" />
      <rect width="640" height="410" rx="14" fill="url(#mesa-pontos)" />
      <rect x="0.5" y="0.5" width="639" height="409" rx="13.5" fill="none" stroke={BORDA} />

      {/* Folhas sobrepostas */}
      <g transform="translate(58 50) rotate(5)" filter="url(#mesa-sombra-leve)">
        <rect width="150" height="200" rx="3" fill="#FBFAF7" stroke={BORDA} />
      </g>
      <g transform="translate(34 70) rotate(-8)" filter="url(#mesa-sombra-leve)">
        <rect width="150" height="200" rx="3" fill="#FFFFFF" stroke={BORDA} />
        <text x="14" y="26" fontSize="10" fontWeight="700" fill={TEXTO} fontFamily="inherit">
          Plano de estudos
        </text>
        {[44, 60, 76, 92, 108, 124, 140, 156, 172].map((y) => (
          <line key={y} x1="14" x2="136" y1={y} y2={y} stroke={BORDA} />
        ))}
        <text x="14" y="56" fontSize="8.5" fill={CINZA} fontFamily="inherit">Seg · Leitura</text>
        <text x="14" y="72" fontSize="8.5" fill={CINZA} fontFamily="inherit">Qua · Exercícios</text>
        <text x="14" y="88" fontSize="8.5" fill={CINZA} fontFamily="inherit">Qui · Prova</text>
      </g>

      {/* Caderno aberto */}
      <g transform="translate(146 54) rotate(-2 158 120)">
        <rect x="-8" y="-7" width="332" height="254" rx="8" fill={AZUL} filter="url(#mesa-sombra)" />
        <rect x="2" y="4" width="314" height="240" rx="3" fill="#EDEAE2" />
        <rect width="158" height="240" rx="3" fill="#FFFFFF" />
        <rect x="158" width="158" height="240" rx="3" fill="#FFFFFF" />
        <rect x="144" width="28" height="240" fill="url(#mesa-lombada)" />

        {/* Página esquerda */}
        <text x="18" y="32" fontSize="14" fontWeight="700" fill={TEXTO} fontFamily="inherit">Cálculo II</text>
        <text x="18" y="47" fontSize="8.5" fill={CINZA} fontFamily="inherit">Derivadas · Cap. 4</text>
        {PAUTA.map((y) => (
          <line key={y} x1="14" x2="146" y1={y} y2={y} stroke="#E8EAEE" />
        ))}
        <rect x="16" y="69" width="122" height="15" rx="2" fill="#F4E39B" fillOpacity="0.75" />
        <text x="18" y="80" fontSize="9" fontStyle="italic" fill={AZUL_ESCURO} fontFamily="inherit">
          f(x) = x²  →  f′(x) = 2x
        </text>
        <text x="18" y="98" fontSize="9" fontStyle="italic" fill={AZUL_ESCURO} fontFamily="inherit">Regra da cadeia</text>
        <text x="18" y="116" fontSize="9" fontStyle="italic" fill={AZUL_ESCURO} fontFamily="inherit">Resolver lista 3</text>
        <rect x="16" y="123" width="104" height="15" rx="2" fill="#BCD3E6" fillOpacity="0.7" />
        <text x="18" y="134" fontSize="9" fontStyle="italic" fill={AZUL_ESCURO} fontFamily="inherit">Dúvida: limites laterais</text>
        <text x="18" y="152" fontSize="9" fontStyle="italic" fill={AZUL_ESCURO} fontFamily="inherit">Revisar até quinta</text>

        {/* Página direita */}
        <path d="M268 0h14v32l-7-6-7 6z" fill={AZUL} />
        <text x="174" y="32" fontSize="14" fontWeight="700" fill={TEXTO} fontFamily="inherit">Semana 11</text>
        <text x="174" y="47" fontSize="8.5" fill={CINZA} fontFamily="inherit">9 – 15 nov</text>
        <rect x="172" y="141" width="134" height="17" rx="2" fill="#BCD3E6" fillOpacity="0.55" />
        {AGENDA.map((item, i) => {
          const y = 74 + i * 26;
          return (
            <g key={item.dia}>
              <line x1="174" x2="302" y1={y + 9} y2={y + 9} stroke="#E8EAEE" />
              <text x="174" y={y} fontSize="8.5" fontWeight="600" fill={AZUL} fontFamily="inherit">{item.dia}</text>
              <text x="198" y={y} fontSize="8.5" fill="#374151" fontFamily="inherit">{item.texto}</text>
              <circle
                cx="300"
                cy={y - 3}
                r="3.5"
                fill={item.feita ? AZUL : 'none'}
                stroke={item.feita ? AZUL : '#C9CED6'}
              />
            </g>
          );
        })}
        <text x="174" y="214" fontSize="8" fill={CINZA} fontFamily="inherit">Progresso da semana</text>
        <rect x="174" y="221" width="128" height="5" rx="2.5" fill={BORDA} />
        <rect x="174" y="221" width="52" height="5" rx="2.5" fill={AZUL} />
      </g>

      {/* Calendário acadêmico */}
      <g transform="translate(478 28)" filter="url(#mesa-sombra-leve)">
        <rect width="142" height="128" rx="6" fill="#FFFFFF" stroke={BORDA} />
        <path d="M0 6a6 6 0 0 1 6-6h130a6 6 0 0 1 6 6v20H0z" fill={AZUL} />
        <text x="12" y="17" fontSize="8.5" fontWeight="700" letterSpacing="0.8" fill="#FFFFFF" fontFamily="inherit">
          NOVEMBRO 2026
        </text>
        {DIAS_SEMANA.map((d, i) => (
          <text key={i} x={16 + i * 18.4} y="40" fontSize="7" fontWeight="600" textAnchor="middle" fill="#9CA3AF" fontFamily="inherit">
            {d}
          </text>
        ))}
        {DIAS_MES.map((dia) => {
          const x = 16 + ((dia - 1) % 7) * 18.4;
          const y = 56 + Math.floor((dia - 1) / 7) * 14;
          return (
            <g key={dia}>
              {dia === 12 && <circle cx={x} cy={y - 2.5} r="6.5" fill={AZUL} />}
              {dia === 13 && <circle cx={x} cy={y - 2.5} r="6.5" fill="none" stroke={AZUL} />}
              <text x={x} y={y} fontSize="7.5" textAnchor="middle" fill={dia === 12 ? '#FFFFFF' : CINZA} fontFamily="inherit">
                {dia}
              </text>
            </g>
          );
        })}
      </g>

      {/* Checklist */}
      <g transform="translate(478 172)" filter="url(#mesa-sombra-leve)">
        <rect width="142" height="122" rx="6" fill="#FFFFFF" stroke={BORDA} />
        <text x="14" y="22" fontSize="9" fontWeight="700" fill={TEXTO} fontFamily="inherit">Tarefas da semana</text>
        {TAREFAS.map((t, i) => {
          const y = 46 + i * 20;
          return (
            <g key={t.texto}>
              <rect
                x="14"
                y={y - 8}
                width="10"
                height="10"
                rx="2.5"
                fill={t.feita ? AZUL : '#FFFFFF'}
                stroke={t.feita ? AZUL : '#C9CED6'}
              />
              {t.feita && (
                <path d={`M16.4 ${y - 3}l2.2 2.3 3.8-4.6`} fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              )}
              <text
                x="32"
                y={y}
                fontSize="8.5"
                fill={t.feita ? '#9CA3AF' : '#374151'}
                textDecoration={t.feita ? 'line-through' : undefined}
                fontFamily="inherit"
              >
                {t.texto}
              </text>
            </g>
          );
        })}
      </g>

      {/* Post-it amarelo */}
      <g transform="translate(70 268) rotate(-7)" filter="url(#mesa-sombra-leve)">
        <rect width="86" height="86" fill="#F6E8AE" />
        <rect width="86" height="10" fill="#F0DE95" fillOpacity="0.7" />
        <text x="12" y="34" fontSize="10.5" fontWeight="600" fontStyle="italic" fill="#4B4524" fontFamily="inherit">Entregar</text>
        <text x="12" y="48" fontSize="10.5" fontWeight="600" fontStyle="italic" fill="#4B4524" fontFamily="inherit">relatório</text>
        <text x="12" y="62" fontSize="10.5" fontWeight="600" fontStyle="italic" fill="#4B4524" fontFamily="inherit">até sexta</text>
        <line x1="12" x2="48" y1="67" y2="67" stroke="#4B4524" strokeOpacity="0.4" />
      </g>

      {/* Post-it azul */}
      <g transform="translate(352 266) rotate(5)" filter="url(#mesa-sombra-leve)">
        <rect width="80" height="80" fill="#D6E4F0" />
        <rect width="80" height="10" fill="#C6D9EA" fillOpacity="0.8" />
        <text x="11" y="34" fontSize="10.5" fontWeight="600" fontStyle="italic" fill={AZUL_ESCURO} fontFamily="inherit">Revisar</text>
        <text x="11" y="48" fontSize="10.5" fontWeight="600" fontStyle="italic" fill={AZUL_ESCURO} fontFamily="inherit">cap. 4 e 5</text>
        <text x="11" y="62" fontSize="10.5" fontWeight="600" fontStyle="italic" fill={AZUL_ESCURO} fontFamily="inherit">antes da prova</text>
      </g>

      {/* Marca-textos */}
      <g transform="translate(196 352) rotate(-6)" filter="url(#mesa-sombra-leve)">
        <rect width="84" height="17" rx="4" fill="#F4E39B" />
        <rect width="22" height="17" rx="4" fill="#E6D27E" />
        <path d="M84 2.5l12 3v6l-12 3z" fill="#E6D27E" />
      </g>
      <g transform="translate(206 376) rotate(-3)" filter="url(#mesa-sombra-leve)">
        <rect width="84" height="17" rx="4" fill="#BCD3E6" />
        <rect width="22" height="17" rx="4" fill="#A6C2DA" />
        <path d="M84 2.5l12 3v6l-12 3z" fill="#A6C2DA" />
      </g>

      {/* Caneta */}
      <g transform="translate(452 392) rotate(-32)" filter="url(#mesa-sombra)">
        <path d="M14-5L0-1.2v2.4L14 5z" fill="#D9D6CC" />
        <path d="M0-1.2L-6 0l6 1.2z" fill={TEXTO} />
        <rect x="14" y="-5" width="132" height="10" rx="5" fill={AZUL_ESCURO} />
        <rect x="96" y="-6" width="50" height="12" rx="5" fill={AZUL} />
        <rect x="18" y="-3.5" width="114" height="1.8" rx="0.9" fill="#FFFFFF" fillOpacity="0.22" />
        <rect x="102" y="-7.5" width="36" height="2.5" rx="1.2" fill={BORDA} />
      </g>
    </svg>
  );
}
