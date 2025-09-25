import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  // Policy metadata
  const POLICY_VERSION = "1.1";
  const EFFECTIVE_DATE = "2025-09-25"; // ISO

  const sections = [
    {
      id: "definitions",
      title: "1. Definições",
      content: [
        "Nesta Política, 'Serviço' refere-se ao site, software e quaisquer funcionalidades oferecidas pelo projeto Glacien; 'Nós' refere-se aos mantenedores; 'Você' ou 'Titular' refere-se à pessoa física cujos dados são tratados.",
      ],
    },
    {
      id: "introduction",
      title: "2. Introdução",
      content: [
        "Esta Política de Privacidade descreve como coletamos, usamos, divulgamos e protegemos informações pessoais quando você interage com o Serviço. Ao utilizar o Serviço, você concorda com as práticas aqui descritas.",
      ],
    },
    {
      id: "data-we-collect",
      title: "3. Quais dados coletamos",
      content: [
        "Coletamos diferentes tipos de informações dependendo de como você usa o Serviço. Exemplos de categorias:",
        "• Dados de identificação: nome, email, nome de usuário, dados de perfil quando fornecidos.",
        "• Conteúdo submetido: comentários, issues, snippets, contribuições de código.",
        "• Dados técnicos: endereços IP, identificadores de sessão, user-agent, dados de performance e logs de erro.",
        "• Dados de pagamento: apenas se você contratar serviços pagos (não armazenamos dados de cartão diretamente; usamos provedores de pagamento).",
      ],
    },
    {
      id: "legal-basis",
      title: "4. Base legal para o tratamento",
      content: [
        "Quando aplicável, tratamos dados com base em: consentimento, execução de contrato, cumprimento de obrigação legal, interesse legítimo (segurança, melhoria do serviço) ou proteção de direitos legais.",
      ],
    },
    {
      id: "how-we-use",
      title: "5. Finalidades do tratamento",
      content: [
        "Utilizamos dados para operar o Serviço; autenticar usuários; comunicar atualizações; prover suporte; medir e melhorar a experiência; prevenir abuso; e cumprir obrigações legais.",
      ],
    },
    {
      id: "sharing",
      title: "6. Compartilhamento e processadores (terceiros)",
      content: [
        "Podemos compartilhar dados com provedores de serviço que atuam como processadores (hospedagem, analytics, monitoramento). Exigimos contratos que limitem uso e obriguem a proteger os dados.",
        "Podemos divulgar informações para cumprir ordens legais, proteger direitos ou em resposta a solicitações governamentais válidas.",
      ],
    },
    {
      id: "international-transfers",
      title: "7. Transferências internacionais",
      content: [
        "Como operamos globalmente, seus dados podem ser transferidos para fora do seu país. Implementamos salvaguardas como cláusulas contratuais padrão quando necessário. Contate-nos para detalhes específicos de transferências.",
      ],
    },
    {
      id: "cookies",
      title: "8. Cookies, analytics e rastreamento",
      content: [
        "Utilizamos cookies e tecnologias similares para desempenho, analytics e funcionalidade. Categorias:",
        "• Essenciais: necessários para segurança e autenticação.",
        "• Analíticos: para medir uso e melhorar o Serviço (ex.: Google Analytics).",
        "Você pode controlar cookies pelo navegador; consulte as configurações de privacidade. Para desabilitar tracking analítico, siga as instruções do seu navegador ou use mecanismos de opt-out fornecidos pelos provedores.",
      ],
    },
    {
      id: "data-retention",
      title: "9. Retenção e eliminação de dados",
      content: [
        "Reteremos dados enquanto forem necessários às finalidades descritas ou conforme exigido por lei. Períodos típicos: dados de conta enquanto a conta existir; logs de sistema por período técnico (ex.: 90 dias); dados de cobrança conforme obrigações fiscais.",
        "Solicitações de exclusão serão avaliadas conforme obrigações legais e dependências técnicas (por exemplo: cópias de segurança).",
      ],
    },
    {
      id: "breach",
      title: "10. Notificação de violação de dados (Data Breach)",
      content: [
        "Em caso de violação de segurança que comprometa dados pessoais, nós investigaremos prontamente e, quando exigido por lei, notificaremos os titulares afetados e autoridades competentes sem atraso indevido.",
        "Relate incidentes imediatamente para security@glacien.online com o máximo de detalhes (o que aconteceu, quando, quais sistemas afetados, contatos para retorno).",
      ],
    },
    {
      id: "user-rights",
      title: "10. Direitos dos titulares (ex.: GDPR)",
      content: [
        "Você pode ter direitos como acesso, retificação, exclusão, limitação, oposição, portabilidade e revogação de consentimento. Para exercer direitos, abra uma issue no repositório ou contate-nos pelo email indicado. Responderemos conforme a legislação aplicável.",
        "Podemos solicitar informações para verificar sua identidade antes de atender pedidos sensíveis.",
      ],
    },
    {
      id: "how-to-request",
      title: "11. Como exercer seus direitos (passo a passo)",
      content: [
        "1) Abra uma issue no repositório ou envie email para contato@glacien.online identificando o direito que deseja exercer (ex.: acesso, exclusão).",
        "2) Forneça prova de identidade mínima (ex.: email cadastrado, captura de tela) quando necessário para evitar divulgações indevidas.",
        "3) Processaremos sua solicitação e responderemos no prazo legal aplicável; se precisar de informações adicionais, entraremos em contato.",
      ],
    },
    {
      id: "logging",
      title: "12. Logs, monitoramento e retenção técnica",
      content: [
        "Mantemos registros de logs e telemetria para diagnóstico, segurança e auditoria. Logs técnicos são retidos por períodos limitados (ex.: 30-90 dias) e utilizados para detecção e resposta a incidentes.",
      ],
    },
    {
      id: "third-parties",
      title: "13. Terceiros e serviços usados (exemplos)",
      content: [
        "Exemplos de categorias de terceiros que podem processar dados: provedores de hospedagem (ex.: Vercel, Netlify), provedores de analytics (ex.: Google Analytics), serviços de CI/CD, provedores de email e gateways de pagamento. Consulte a política para obter a lista atualizada.",
      ],
    },
    {
      id: "dpa",
      title: "14. Acordos de processamento de dados (DPA)",
      content: [
        "Para clientes empresariais que necessitem de garantias contratuais adicionais, podemos fornecer um Acordo de Processamento de Dados (DPA). Contate-nos para discutir termos e requisitos específicos.",
      ],
    },
    {
      id: "security",
      title: "12. Segurança dos dados",
      content: [
        "Adotamos medidas técnicas e organizacionais razoáveis (controle de acesso, encriptação em trânsito, revisões de segurança) para proteger dados. Infelizmente, nenhuma medida é 100% eficaz; relatórios de incidentes devem ser enviados para security@glacien.online.",
      ],
    },
    {
      id: "automated-decision",
      title: "13. Decisões automatizadas e perfilamento",
      content: [
        "Não realizamos decisões automatizadas com efeitos legais significativos sem intervenção humana. Utilizamos análise automatizada para métricas e detecção de abuso com salvaguardas apropriadas.",
      ],
    },
    {
      id: "children",
      title: "14. Privacidade de crianças",
      content: [
        "O Serviço não é destinado a crianças menores de 13 anos (ou idade equivalente). Se descobrirmos que coletamos dados de uma criança sem consentimento parental válido, tomaremos medidas para excluir tais dados.",
      ],
    },
    {
      id: "changes",
      title: "15. Alterações nesta Política",
      content: [
        "Podemos atualizar esta Política periodicamente. Quando houver mudanças materiais, procuraremos notificar por meio do repositório, changelog ou outros canais. Recomendamos revisar esta página regularmente.",
      ],
    },
    {
      id: "policy-meta",
      title: "Informações da política",
      content: [
        `Versão: ${POLICY_VERSION}`,
        `Data de vigência: ${new Date(EFFECTIVE_DATE).toLocaleDateString()}`,
        "Última revisão: consulte o changelog para histórico de alterações.",
      ],
    },
    {
      id: "contact",
      title: "16. Contato e DPO",
      content: [
        "Para questões sobre privacidade, solicitações de direitos, ou para solicitar um DPA, abra uma issue no repositório ou envie email para contato@glacien.online.",
        "Relatos de segurança e incidentes devem ser enviados para security@glacien.online. Para assuntos relacionados à proteção de dados pessoais, envie para dpo@glacien.online.",
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
