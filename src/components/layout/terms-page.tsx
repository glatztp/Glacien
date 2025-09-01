import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TermsPage() {
  const navigate = useNavigate();

  const sections = [
    {
      id: "introduction",
      title: "1. Introdução",
      content: [
        "Estes Termos de Uso descrevem as regras e responsabilidades ao utilizar este site e quaisquer serviços relacionados. Ao acessar o site, você concorda com estes termos.",
      ],
    },
    {
      id: "access",
      title: "2. Acesso e disponibilidade",
      content: [
        "Fazemos esforços razoáveis para manter o serviço disponível, mas não garantimos disponibilidade ininterrupta. Podemos suspender o acesso por manutenção ou por motivos legais.",
      ],
    },
    {
      id: "user-obligations",
      title: "3. Obrigações do usuário",
      content: [
        "Você concorda em utilizar o serviço de forma lícita, não violar direitos de terceiros e não introduzir malware ou conteúdo abusivo. É sua responsabilidade proteger suas credenciais.",
      ],
    },
    {
      id: "content-license",
      title: "4. Licença de uso do conteúdo",
      content: [
        "O conteúdo público do projeto é disponibilizado sob a licença indicada no repositório. Respeite os termos da licença ao reutilizar código ou ativos.",
      ],
    },
    {
      id: "third-party",
      title: "5. Links e terceiros",
      content: [
        "Podemos incluir links para sites de terceiros. Não nos responsabilizamos por práticas de privacidade ou conteúdo desses sites.",
      ],
    },
    {
      id: "disclaimer",
      title: "6. Isenção de garantias",
      content: [
        "O serviço é fornecido 'como está' sem garantias expressas. Não garantimos que o serviço atenderá todas as suas necessidades.",
      ],
    },
    {
      id: "liability",
      title: "7. Limitação de responsabilidade",
      content: [
        "Na máxima extensão permitida por lei, não seremos responsáveis por danos diretos, indiretos, especiais ou consequenciais decorrentes do uso do serviço.",
      ],
    },
    {
      id: "modifications",
      title: "8. Alterações nos termos",
      content: [
        "Podemos atualizar estes termos a qualquer momento. Notificaremos mudanças relevantes no repositório ou por outros meios adequados.",
      ],
    },
    {
      id: "termination",
      title: "9. Rescisão",
      content: [
        "Reservamo-nos o direito de limitar, suspender ou encerrar o acesso de usuários que violem estes termos ou a lei.",
      ],
    },
    {
      id: "governing-law",
      title: "10. Legislação aplicável",
      content: [
        "Estes termos serão regidos e interpretados de acordo com a legislação aplicável ao proprietário do projeto, salvo disposição em contrário obrigatória.",
      ],
    },
    {
      id: "contact",
      title: "11. Contato",
      content: [
        "Para questões relacionadas a estes Termos, abra uma issue no repositório do projeto ou utilize os canais de contato indicados na página principal.",
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
                ← Voltar
              </button>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mt-2">
                  Termos de Uso
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Última atualização: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => navigate("/privacy")}
                aria-label="Política de Privacidade"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background/60 hover:bg-primary/5 transition text-sm shadow-sm"
              >
                Política de Privacidade
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
                  Leia atentamente estes Termos antes de usar o serviço. Leia com
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
                  <h3 className="text-lg font-semibold">Contato</h3>
                  <p className="leading-relaxed text-foreground/90">
                    Para dúvidas ou solicitações, abra uma issue no repositório
                    ou utilize os canais disponíveis na página principal.
                  </p>
                </footer>
              </motion.div>
            </article>
          </main>

          <aside className="order-2 md:order-2 hidden md:block">
            <nav
              aria-label="Sumário"
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
