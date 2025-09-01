import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  const sections = [
    {
      id: "introduction",
      title: "1. Introdução",
      content: [
        "Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações pessoais quando você utiliza nossos serviços.",
      ],
    },
    {
      id: "data-we-collect",
      title: "2. Dados que coletamos",
      content: [
        "Coletamos dados que você fornece diretamente (por exemplo: nome, e‑mail) e dados de uso automaticamente gerados (logs, identificadores de dispositivo).",
      ],
    },
    {
      id: "how-we-use",
      title: "3. Finalidades do tratamento",
      content: [
        "Usamos os dados para prestar o serviço, melhorar a experiência, comunicar novidades e cumprir obrigações legais.",
      ],
    },
    {
      id: "cookies",
      title: "4. Cookies e similares",
      content: [
        "Utilizamos cookies para autenticar sessões, armazenar preferências e coletar métricas de uso. Você pode controlar cookies nas configurações do navegador.",
      ],
    },
    {
      id: "security",
      title: "5. Segurança",
      content: [
        "Adotamos controles técnicos e organizacionais proporcionais para proteger os dados, incluindo criptografia e políticas de acesso.",
      ],
    },
    {
      id: "retention",
      title: "6. Conservação",
      content: [
        "Reteremos dados somente pelo tempo necessário às finalidades informadas ou conforme exigido por lei; depois serão excluídos ou anonimizados.",
      ],
    },
    {
      id: "rights",
      title: "7. Direitos",
      content: [
        "Você pode solicitar acesso, correção, exclusão e portabilidade de seus dados quando aplicável; solicitações são tratadas conforme a legislação vigente.",
      ],
    },
    {
      id: "contact",
      title: "8. Contato",
      content: [
        "Abra uma issue no repositório do projeto ou use os canais indicados na página principal para questões sobre privacidade.",
      ],
    },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only p-2">
        Pular para o conteúdo
      </a>

      <div className="container mx-auto max-w-6xl p-6">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                aria-label="Voltar"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background/60 hover:bg-primary/5 transition text-sm shadow-sm"
              >
                <ArrowLeft /> Voltar
              </button>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  Política de Privacidade
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Última atualização: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => navigate("/terms")}
                aria-label="Termos de Uso"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background/60 hover:bg-primary/5 transition text-sm shadow-sm"
              >
                Termos de Uso
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_20rem] gap-8 items-start">
          <main id="main-content" className="order-1 md:order-1">
            <article className="prose prose-lg bg-gradient-to-t from-background/60 to-background/30 p-8 rounded-2xl shadow-lg border border-border max-w-none text-foreground">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <p className="lead text-muted-foreground">
                  Esta Política explica como tratamos dados pessoais. Leia com
                  atenção e use o sumário para navegar.
                </p>

                {sections.map((sec) => (
                  <section
                    key={sec.id}
                    id={sec.id}
                    aria-labelledby={`heading-${sec.id}`}
                    className="mt-12"
                  >
                    <h2
                      id={`heading-${sec.id}`}
                      className="text-2xl font-semibold scroll-mt-28"
                    >
                      {sec.title}
                    </h2>
                    <div className="mt-3 space-y-4">
                      {sec.content.map((node, i) => (
                        <p
                          key={i}
                          className="leading-relaxed text-foreground/90"
                        >
                          {node}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}

                <footer className="mt-14 border-t pt-6">
                  <h3 className="text-lg font-semibold">Como nos contatar</h3>
                  <p className="leading-relaxed text-foreground/90">
                    Para solicitações relacionadas a dados pessoais, abra uma
                    issue no repositório do projeto ou utilize os canais de
                    contato listados na página principal. Responderemos após a
                    verificação mínima necessária.
                  </p>
                </footer>
              </motion.div>
            </article>
          </main>
          <aside className="order-2 md:order-2 hidden md:block">
            <nav
              aria-label="Sumário da Política de Privacidade"
              className="sticky top-24 bg-background/5 p-4 rounded-lg shadow border border-border"
            >
              <h4 className="text-sm font-semibold mb-3">Sumário</h4>
              <ul className="space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className="w-full flex items-center justify-between gap-2 text-left text-muted-foreground hover:text-foreground transition-colors py-2 px-2 rounded-md hover:bg-primary/5"
                    >
                      <span className="truncate">{s.title}</span>
                      <span className="text-xs text-muted-foreground">Ir</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t pt-3 text-xs text-muted-foreground">
                <button
                  onClick={() => window.print()}
                  className="text-left w-full hover:underline"
                >
                  Imprimir esta página
                </button>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
