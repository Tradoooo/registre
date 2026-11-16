/* Sign-in screen with the demonstration accounts (EF-ADM-03). */

import { useState } from 'react';
import type { DemoAccount } from '../mocks/principals.ts';
import { BrandMark } from '../components/BrandMark.tsx';
import { useApp } from '../state/app.tsx';
import { Button, Field, TextInput } from '../components/Form.tsx';
import { Card, CardBody, CardHeader, Notice } from '../components/Card.tsx';
import { ROLE_HINT, ROLE_LABEL } from '../lib/states.ts';
import { describeError } from '../lib/hooks.ts';
import { PartiesBand } from './login/Parties.tsx';

export function LoginScreen() {
  const { mocks, demoAccounts } = useApp();
  return (
    <div className="login-shell">
      <LoginTopBar />
      <main className="login-hero">
        <section className="login-pitch">
          <LoginPitch />
          <div className="login-card">
            <LoginForm accounts={demoAccounts} />
          </div>
        </section>
        <LoginVisual />
      </main>
      <DemoAccounts accounts={demoAccounts} />
      {mocks ? (
        <div className="login-offline">
          <Notice tone="info">
            Offline demonstration build: the data is generated for the hackathon and contains no
            real customer or partner material.
          </Notice>
        </div>
      ) : null}
      <PartiesBand />
    </div>
  );
}

function LoginTopBar() {
  return (
    <header className="login-top">
      <div className="brand">
        <BrandMark />
        <span className="brand-name">Registre</span>
      </div>
      <div className="login-tags">
        <span>AWS MSP AI Hackathon · Track 1</span>
        <span>Amazon Bedrock · Node 22 · AWS CDK</span>
      </div>
    </header>
  );
}

function LoginPitch() {
  return (
    <>
      <span className="login-label">01 / Continuous audit-evidence register</span>
      <h1 className="login-title">
        Your audit evidence,
        <br />
        <em>ready all year.</em>
      </h1>
      <p className="login-lead">
        No more weeks of panic before the AWS MSP audit. Registre collects, reads, links and keeps
        your evidence fresh, continuously, with Amazon Bedrock. It never decides that a control is
        satisfactory: it says what evidence exists, what is missing, and what a human must verify.
      </p>
    </>
  );
}

/** The 3D registre tile of the V1 board, rendered from the brand mark. */
function LoginVisual() {
  return (
    <div className="login-visual" aria-hidden="true">
      <div className="login-halo" />
      <div className="login-tile">
        <BrandMark size={360} />
      </div>
      <span className="login-folio">Folio 01 — evidence, attachments, states, pack</span>
    </div>
  );
}

interface Credentials {
  login: string;
  password: string;
}

function LoginForm({ accounts }: { accounts: readonly DemoAccount[] }) {
  const { signIn } = useApp();
  const [credentials, setCredentials] = useState<Credentials>({
    login: accounts[0]?.login ?? '',
    password: accounts[0]?.password ?? ''
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (): Promise<void> => {
    setBusy(true);
    setError(null);
    try {
      await signIn(credentials.login, credentials.password);
    } catch (cause) {
      setError(describeError(cause));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Sign in" subtitle="Demonstration accounts for the judges" />
      <CardBody>
        <div className="stack">
          <CredentialFields credentials={credentials} onChange={setCredentials} />
          {error ? <Notice>{error}</Notice> : null}
          <Button variant="primary" onClick={submit} disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

function CredentialFields({
  credentials,
  onChange
}: {
  credentials: Credentials;
  onChange: (update: (current: Credentials) => Credentials) => void;
}) {
  return (
    <>
      <Field label="Login">
        <TextInput
          value={credentials.login}
          onChange={(login) => onChange((current) => ({ ...current, login }))}
          ariaLabel="Login"
        />
      </Field>
      <Field label="Password">
        <TextInput
          value={credentials.password}
          onChange={(password) => onChange((current) => ({ ...current, password }))}
          ariaLabel="Password"
          type="password"
        />
      </Field>
    </>
  );
}

/** One-click accounts, so a judge can switch role in the recording. */
function DemoAccounts({ accounts }: { accounts: readonly DemoAccount[] }) {
  const { signIn } = useApp();
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="login-roles" aria-label="Demo roles">
      <span className="login-label">Demo roles · same data, filtered by rights · one click</span>
      <div className="login-role-grid">
        {accounts.map((account) => (
          <button
            key={account.principal.id}
            type="button"
            className="demo-account"
            onClick={() => {
              setError(null);
              signIn(account.login, account.password).catch((cause: unknown) =>
                setError(describeError(cause))
              );
            }}
          >
            <strong>{ROLE_LABEL[account.principal.role]}</strong>
            <span className="demo-hint">{ROLE_HINT[account.principal.role]}</span>
            <span className="demo-login">
              {account.login} / {account.password}
            </span>
          </button>
        ))}
      </div>
      {error ? <Notice>{error}</Notice> : null}
    </section>
  );
}
