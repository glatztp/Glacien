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
        "Esta Política de Privacidade descreve como coletamos, usamos, divulgamos e protegemos informações pessoais quando você interage com o site e serviços relacionados. Leia atentamente; ao utilizar o serviço, você concorda com as práticas aqui descritas.",
      ],
    },
    {
      id: "data-we-collect",
      title: "2. Quais dados coletamos",
      content: [
        "Coletamos diferentes tipos de informações dependendo de como você usa o serviço, incluindo:",
        "• Dados fornecidos por você: nome, endereço de e‑mail, conteúdo que você submete (ex.: snippets, issues), e outras informações que optar por fornecer.",
        "• Dados de uso e diagnóstico: registros de acesso, endereços IP, identificadores de sessão, informações sobre dispositivo e navegador, dados de performance e erros.",
        "• Dados coletados por meio de cookies e tecnologias semelhantes (mais detalhes na seção de Cookies).",
      ],
    },
    {
      id: "legal-basis",
      title: "3. Base legal para o tratamento",
      content: [
        "Quando aplicável, tratamos seus dados com base em uma ou mais das seguintes bases legais: consentimento (quando solicitado), execução de contrato, cumprimento de obrigação legal, interesse legítimo (por exemplo: segurança, prevenção de fraude, melhoria do serviço) ou proteção de direitos legais.",
      ],
    },
    {
      id: "how-we-use",
      title: "4. Finalidades do tratamento",
      content: [
        "Utilizamos seus dados para: fornecer e operar o serviço; autenticar e gerenciar contas; comunicar atualizações e notificações; analisar e melhorar o produto; prevenir abuso e atividades fraudulentas; e cumprir obrigações legais.",
      ],
    },
    {
      id: "cookies",
      title: "5. Cookies e tecnologias semelhantes",
      content: [
        "Utilizamos cookies, pixels e outras tecnologias para fins técnicos e analíticos. Exemplos:",
        "• Cookies essenciais: necessários para autenticação e segurança da sessão.",
        "• Cookies de desempenho/analíticos: para medir uso e melhorar a experiência (ex.: Google Analytics ou similar).",
        "Você pode controlar o uso de cookies pelo navegador; no entanto, bloquear cookies essenciais pode impactar a funcionalidade do serviço.",
      ],
    },
    {
      id: "sharing",
      title: "6. Compartilhamento e terceiros",
      content: [
        "Podemos compartilhar dados com provedores de serviço que nos auxiliam na operação (ex.: hospedagem, monitoramento, análise), sempre sob contratos que exigem proteção e uso limitado. Também podemos divulgar informações em resposta a exigências legais, ordens judiciais ou para proteger direitos, propriedade ou segurança.",
      ],
    },
    {
      id: "international-transfers",
      title: "7. Transferências internacionais",
      content: [
        "Como operamos globalmente, seus dados podem ser transferidos e armazenados em servidores localizados fora do seu país. Tomamos medidas adequadas (cláusulas contratuais padrão ou garantias equivalentes) para proteger dados transferidos internacionalmente, conforme aplicável.",
      ],
    },
    {
      id: "data-retention",
      title: "8. Retenção e eliminação de dados",
      content: [
        "Reteremos dados pelo tempo necessário às finalidades informadas ou conforme exigido por lei. Quando não houver mais necessidade, os dados serão excluídos ou anonimizados. Para solicitações específicas de exclusão, consulte a seção de Direitos ou entre em contato.",
      ],
    },
    {
      id: "user-rights",
      title: "9. Seus direitos",
      content: [
        "Quando aplicável, você tem direitos sobre seus dados: acesso, correção, exclusão, limitação do tratamento, oposição, portabilidade e revogação do consentimento. Para exercer direitos, abra uma issue no repositório ou use o canal de contato indicado. Responderemos conforme exigido pela legislação aplicável.",
      ],
    },
    {
      id: "security",
      title: "10. Segurança",
      content: [
        "Adotamos medidas técnicas e administrativas razoáveis para proteger dados contra perda, uso indevido, acesso não autorizado, divulgação, alteração e destruição. Exemplos: controles de acesso, encriptação em trânsito, backups e revisões regulares de segurança. Apesar disso, nenhum método de transmissão ou armazenamento é 100% seguro.",
      ],
    },
    {
      id: "children",
      title: "11. Privacidade de crianças",
      content: [
        "O serviço não se destina a crianças menores de 13 anos (ou idade equivalente conforme a jurisdição). Não coletamos conscientemente dados pessoais de crianças. Se tomarmos conhecimento de coleta não autorizada, tomaremos medidas para excluir as informações.",
      ],
    },
    {
      id: "automated-decision",
      title: "12. Decisões automatizadas e perfilamento",
      content: [
        "Não realizamos decisões automatizadas que geram efeitos jurídicos sobre você sem intervenção humana relevante. Podemos empregar análise automatizada para fins de métricas e melhoria do serviço, sempre com salvaguardas apropriadas.",
      ],
    },
    {
      id: "changes",
      title: "13. Alterações nesta Política",
      content: [
        "Podemos atualizar esta Política de Privacidade periodicamente. Quando houver mudanças materiais, procuraremos notificar por meio do repositório, changelog ou outros canais aplicáveis. Recomendamos revisar esta página regularmente.",
      ],
    },
    {
      id: "contact",
      title: "14. Como nos contatar",
      content: [
        "Para questões sobre privacidade, solicitações de acesso ou exclusão, dúvidas legais ou relatos de incidentes, abra uma issue no repositório (https://github.com/glatztp/gltz) ou envie email para contato@glacien.online (se disponível).",
        "Inclua detalhes suficientes para identificar a solicitação (por exemplo, email usado, descrição do dado, URL afetada). Faremos o possível para responder prontamente.",
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
