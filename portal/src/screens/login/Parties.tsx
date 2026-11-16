/* Sign-in page: the parties band (DESIGN.md V1) — who Registre works for and with. */

import type { ReactNode } from 'react';
import { BrandMark } from '../../components/BrandMark.tsx';

interface Party {
  name: string;
  detail: string;
  tone: string;
  icon: ReactNode;
}

const STROKE = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 } as const;

const PARTIES: readonly Party[] = [
  {
    name: 'AWS MSP partner',
    detail: 'Leadership · quality lead · control owners',
    tone: 'var(--ok)',
    icon: (
      <svg viewBox="0 0 32 32" {...STROKE}>
        <circle cx="9" cy="11" r="3.2" />
        <circle cx="16" cy="9.5" r="3.6" />
        <circle cx="23" cy="11" r="3.2" />
        <path d="M3.5 24c.6-4 3-6 5.5-6M28.5 24c-.6-4-3-6-5.5-6M9.5 25c.8-5 3.4-7.6 6.5-7.6s5.7 2.6 6.5 7.6" />
      </svg>
    )
  },
  {
    name: 'Independent auditor',
    detail: 'Third party appointed for the audit',
    tone: 'var(--blue)',
    icon: (
      <svg viewBox="0 0 32 32" {...STROKE}>
        <circle cx="14" cy="14" r="7.5" />
        <path d="M19.5 19.5 27 27M10.5 14.2l2.4 2.4 4.6-4.8" />
      </svg>
    )
  },
  {
    name: 'AWS',
    detail: 'MSP programme · Amazon Bedrock',
    tone: 'var(--warn)',
    icon: (
      <svg viewBox="0 0 32 32" {...STROKE}>
        <path d="M9 23h15a5 5 0 0 0 .6-9.96A7.5 7.5 0 0 0 10.2 12 5.6 5.6 0 0 0 9 23Z" />
      </svg>
    )
  },
  {
    name: 'Registre',
    detail: 'The continuous evidence register',
    tone: 'var(--ok)',
    icon: <BrandMark size={30} />
  }
];

export function PartiesBand() {
  return (
    <footer className="login-parties" aria-label="The parties">
      <span className="login-label">The parties</span>
      {PARTIES.map((party) => (
        <div key={party.name} className="login-party" style={{ color: party.tone }}>
          <span className="login-party-icon">{party.icon}</span>
          <span>
            <b>{party.name}</b>
            <small>{party.detail}</small>
          </span>
        </div>
      ))}
    </footer>
  );
}
