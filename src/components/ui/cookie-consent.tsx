import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useTheme } from "../providers/theme-provider";
import { Switch } from "./forms/switch";

type CookieKeys = "necessary" | "analytics" | "marketing" | "preferences";

type CookieConsentState = {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  accepted: boolean; // whether user clicked any explicit accept/reject
  updatedAt?: string;
};

const STORAGE_KEY = "gltz-cookie-consent";

function defaultConsent(): CookieConsentState {
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    accepted: false,
  };
}

function readStoredConsent(): CookieConsentState | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentState;
  } catch (e) {
    return null;
  }
}

function writeStoredConsent(state: CookieConsentState) {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
}

export default function CookieConsent() {
  const { actualTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState>(() => {
    const stored = readStoredConsent();
    return stored ?? defaultConsent();
  });
  const [announce, setAnnounce] = useState<string | null>(null);
  const mounted = useRef(false);

  // derived color styles from ThemeProvider using CSS variables
  const styles = useMemo(() => {
    return {
      cardBg: "hsl(var(--card))",
      cardFg: "hsl(var(--card-foreground))",
      border: "hsl(var(--border))",
      primary: "hsl(var(--primary))",
      primaryFg: "hsl(var(--primary-foreground))",
      muted: "hsl(var(--muted))",
    };
  }, [actualTheme]);

  useEffect(() => {
    // Show banner only if user hasn't accepted/rejected explicitly
    const stored = readStoredConsent();
    if (!stored || stored.accepted === false) {
      // small delay so it doesn't appear instantly on hydrate
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
    // if already accepted/rejected don't show
    setVisible(false);
  }, []);

  useEffect(() => {
    // ensure we don't announce on first render
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    writeStoredConsent({ ...consent, updatedAt: new Date().toISOString() });
  }, [consent]);

  const acceptAll = () => {
    const next: CookieConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      accepted: true,
      updatedAt: new Date().toISOString(),
    };
    setConsent(next);
    writeStoredConsent(next);
    setVisible(false);
    setModalOpen(false);
    setAnnounce("Cookies ativados: todos os cookies foram aceitos.");
  };

  const rejectAll = () => {
    const next: CookieConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      accepted: true,
      updatedAt: new Date().toISOString(),
    };
    setConsent(next);
    writeStoredConsent(next);
    setVisible(false);
    setModalOpen(false);
    setAnnounce("Cookies configurados: somente cookies necessários ativados.");
  };

  const savePreferences = (changes: Partial<CookieConsentState>) => {
    const next = {
      ...consent,
      ...changes,
      necessary: true,
      accepted: true,
      updatedAt: new Date().toISOString(),
    };
    setConsent(next);
    writeStoredConsent(next);
    setModalOpen(false);
    setVisible(false);
    setAnnounce("Preferências salvas.");
  };

  const toggleKey = (key: CookieKeys) => {
    if (key === "necessary") return;
    setConsent((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // small accessible toggle control
  function ToggleRow({
    k,
    label,
    description,
  }: {
    k: CookieKeys;
    label: string;
    description?: string;
  }) {
    const checked = consent[k];
    const disabled = k === "necessary";
    return (
      <div className="flex items-center justify-between gap-4 py-2">
        <div className="min-w-0">
          <div className="font-medium text-sm" style={{ color: styles.cardFg }}>
            {label}
          </div>
          {description ? (
            <div
              className="text-xs mt-1 opacity-80"
              style={{ color: styles.cardFg }}
            >
              {description}
            </div>
          ) : null}
        </div>
        <div>
          <Switch
            checked={checked}
            onCheckedChange={() => toggleKey(k)}
            aria-label={label}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }

  // (no floating reopen button by default)

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {announce}
      </div>

      {/* Banner (floating card) */}
      <AnimatePresence>
        {visible && (
          <motion.div
            role="region"
            aria-label="Consentimento de cookies"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="fixed z-[1000] right-6 bottom-6 md:right-8 md:bottom-8"
          >
            <div
              className="max-w-lg w-[min(94vw,520px)] rounded-2xl shadow-2xl border px-5 py-4 flex items-start gap-4"
              style={{
                background: styles.cardBg,
                color: styles.cardFg,
                borderColor: styles.border,
              }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: styles.primary }}
                >
                  <Cookie size={18} color={styles.primaryFg} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold text-sm"
                  style={{ color: styles.cardFg }}
                >
                  Usamos cookies
                </div>
                <div
                  className="text-sm mt-1 opacity-90"
                  style={{ color: styles.cardFg }}
                >
                  Usamos cookies para melhorar sua experiência, analisar tráfego
                  e personalizar conteúdo. Gerencie suas preferências.
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    className="text-sm font-semibold rounded-md px-4 py-2 shadow"
                    onClick={acceptAll}
                    style={{
                      background: styles.primary,
                      color: styles.primaryFg,
                    }}
                  >
                    Aceitar todos
                  </button>
                  <button
                    className="text-sm rounded-md px-3 py-2 border"
                    onClick={() => setModalOpen(true)}
                    style={{
                      borderColor: styles.border,
                      color: styles.cardFg,
                      background: "transparent",
                    }}
                  >
                    Personalizar
                  </button>
                  <button
                    className="ml-auto text-sm text-muted-foreground"
                    onClick={rejectAll}
                    style={{ color: styles.cardFg }}
                  >
                    Recusar
                  </button>
                </div>
              </div>

              <button
                aria-label="Fechar banner"
                onClick={() => setVisible(false)}
                className="ml-3 -mr-2 p-1 rounded-full hover:bg-gray-900/5"
              >
                <X size={16} color={styles.cardFg} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal / Panel (animated) */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Configurações de cookies"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-end md:items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setModalOpen(false)}
            />

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative max-w-2xl w-full rounded-2xl shadow-2xl border p-6 md:p-8"
              style={{
                background: styles.cardBg,
                color: styles.cardFg,
                borderColor: styles.border,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: styles.cardFg }}
                  >
                    Preferências de cookies
                  </h3>
                  <p
                    className="text-sm mt-1 opacity-90"
                    style={{ color: styles.cardFg }}
                  >
                    Escolha quais tipos de cookies você permite. Você pode
                    alterar isso a qualquer momento nas configurações.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    aria-label="Fechar"
                    onClick={() => setModalOpen(false)}
                    className="rounded-md px-2 py-1 text-sm"
                    style={{ color: styles.cardFg }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <ToggleRow
                  k="necessary"
                  label="Estritamente necessários"
                  description="Essenciais para o funcionamento do site."
                />
                <ToggleRow
                  k="analytics"
                  label="Análise"
                  description="Ajudam a entender o desempenho e melhorar o produto."
                />
                <ToggleRow
                  k="preferences"
                  label="Preferências"
                  description="Lembram suas preferências de exibição e idioma."
                />
                <ToggleRow
                  k="marketing"
                  label="Marketing"
                  description="Usados para entregar conteúdo relevante e anúncios."
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  className="text-sm rounded-md px-4 py-2 border"
                  onClick={rejectAll}
                  style={{
                    borderColor: styles.border,
                    color: styles.cardFg,
                    background: "transparent",
                  }}
                >
                  Recusar tudo
                </button>
                <button
                  className="text-sm font-medium rounded-md px-4 py-2"
                  onClick={() =>
                    savePreferences({
                      analytics: consent.analytics,
                      marketing: consent.marketing,
                      preferences: consent.preferences,
                    })
                  }
                  style={{
                    background: styles.primary,
                    color: styles.primaryFg,
                  }}
                >
                  Salvar preferências
                </button>
              </div>

              <div
                className="mt-4 text-xs opacity-80"
                style={{ color: styles.cardFg }}
              >
                <p>
                  Consulte nossa{" "}
                  <a
                    href="/privacy"
                    className="underline"
                    style={{ color: styles.primary }}
                  >
                    Política de Privacidade
                  </a>{" "}
                  para mais detalhes. Você pode gerenciar ou revogar seu
                  consentimento a qualquer momento.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* no floating reopen button */}
    </>
  );
}
