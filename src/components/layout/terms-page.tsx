import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TermsPage() {
  const navigate = useNavigate();

  const sections = [
    {
      id: "introduction",
      title: "1. Introdução",
      content: [
        "Estes Termos de Uso estabelecem os direitos e obrigações aplicáveis ao acesso e uso deste site, bem como quaisquer serviços ou recursos relacionados. Ao utilizar o site, você concorda em cumprir estes termos e todas as políticas referenciadas aqui.",
      ],
    },
    {
      id: "scope",
      title: "2. Escopo e aceitação",
      content: [
        "Estes termos regem o uso do site e de seus serviços; não criam relação de emprego, sociedade ou agência entre você e os mantenedores. Se você não concordar com algum dos termos, por favor não utilize o serviço.",
      ],
    },
    {
      id: "access",
      title: "3. Acesso e disponibilidade",
      content: [
        "Fazemos esforços razoáveis para manter o serviço disponível, mas não garantimos disponibilidade ininterrupta. Podemos suspender ou limitar o acesso temporariamente por motivos de manutenção, atualizações, segurança ou por exigência legal.",
      ],
    },
    {
      id: "user-obligations",
      title: "4. Obrigações do usuário",
      content: [
        "Você concorda em: usar o serviço de forma lícita; não violar direitos de terceiros; não praticar ataques, distribuir malware, ou comprometer a segurança do serviço; e proteger suas credenciais de acesso. Quaisquer ações realizadas a partir da sua conta são de sua responsabilidade.",
      ],
    },
    {
      id: "acceptable-use",
      title: "5. Uso aceitável",
      content: [
        "É proibido utilizar o site para fins que sejam ilegais, que promovam ódio, violência, fraude ou invasão de privacidade. Também é proibido uso que gere tráfego artificial, scraping massivo sem autorização, engenharia reversa dos serviços, ou qualquer atividade que prejudique a experiência de outros usuários.",
      ],
    },
    {
      id: "intellectual-property",
      title: "6. Propriedade intelectual",
      content: [
        "Todos os direitos de propriedade intelectual relacionados ao site, seu design, textos, imagens e código são detidos por nós ou por seus licenciadores. Quando o projeto disponibiliza código em repositórios públicos, ele é fornecido sob a licença especificada naquele repositório — respeite essa licença ao reutilizar o material.",
        "Você não pode remover avisos de direitos autorais ou marca registrada presentes no conteúdo, nem declarar propriedade sobre conteúdo que não seja seu.",
      ],
    },
    {
      id: "contributions",
      title: "7. Contribuições e feedback",
      content: [
        "Contribuições de código, ideias, relatórios de bugs ou sugestões submetidas ao repositório podem ser tratadas como não confidenciais. Ao enviar contribuições, você concorda que podemos usar, modificar e redistribuir o conteúdo sem obrigação de pagamento. Utilize as orientações do CONTRIBUTING.md ao contribuir.",
      ],
    },
    {
      id: "user-content",
      title: "8. Conteúdo gerado por usuários",
      content: [
        "Se usuários puderem postar conteúdo (ex.: comentários, exemplos, snippets), você garante que tem o direito de fazê-lo e que o conteúdo não infringe direitos de terceiros. Reservamo-nos o direito de moderar, editar, remover ou recusar qualquer conteúdo que viole estes Termos ou que seja, a nosso critério, inapropriado.",
      ],
    },
    {
      id: "dmca",
      title: "9. Notificação de violação de direitos autorais (DMCA)",
      content: [
        "Se você acredita que seu trabalho protegido por direitos autorais foi copiado e está acessível neste site de maneira que constitua infração, notifique-nos por escrito com as informações necessárias para a identificação do material protegido e da localização do material supostamente infrator. Forneceremos um procedimento razoável para tratar reclamações e contra-notificações, conforme exigido pela legislação aplicável.",
      ],
    },
    {
      id: "third-party",
      title: "10. Links e serviços de terceiros",
      content: [
        "O site pode conter links para produtos, serviços ou conteúdos mantidos por terceiros. Não nos responsabilizamos por esses produtos/serviços, suas políticas de privacidade ou práticas. Links não significam endosso.",
      ],
    },
    {
      id: "security",
      title: "11. Segurança e incidentes",
      content: [
        "Empregamos medidas razoáveis de segurança para proteger o serviço, mas nenhum sistema é invulnerável. Se você detectar um problema de segurança, notifique-nos com detalhes para que possamos investigar. Não realize testes intrusivos sem consentimento prévio.",
      ],
    },
    {
      id: "data-retention",
      title: "12. Retenção e uso de dados",
      content: [
        "Coletamos e processamos dados conforme descrito na nossa Política de Privacidade. Dados relacionados a contas, issues e contribuições podem ser mantidos por um período compatível com fins legais, administrativos e de melhoria do serviço. Para solicitações de exclusão, consulte a Política de Privacidade ou entre em contato.",
      ],
    },
    {
      id: "warranty",
      title: "13. Isenção de garantias",
      content: [
        "O serviço é fornecido 'no estado em que se encontra' e 'conforme disponível', sem garantias expressas ou implícitas. Não garantimos que o serviço será ininterrupto, livre de erros, seguro ou que atenderá às suas expectativas.",
      ],
    },
    {
      id: "liability",
      title: "14. Limitação de responsabilidade",
      content: [
        "Na máxima extensão permitida por lei, não seremos responsáveis por danos diretos, indiretos, especiais, incidentais ou consequenciais, perda de lucro, dados ou receitas decorrentes do uso ou incapacidade de usar o serviço. Em hipótese alguma nossa responsabilidade agregada excederá um valor razoável (por exemplo: R$ 1.000), salvo disposição legal em contrário.",
      ],
    },
    {
      id: "indemnification",
      title: "15. Indenização",
      content: [
        "Você concorda em indenizar e isentar os mantenedores de quaisquer reclamações, perdas, responsabilidades, danos, custos e despesas (incluindo honorários advocatícios razoáveis) decorrentes do seu uso do serviço ou de violação destes Termos.",
      ],
    },
    {
      id: "termination",
      title: "16. Suspensão e rescisão",
      content: [
        "Podemos, a nosso critério, suspender ou encerrar seu acesso ao serviço caso você viole estes Termos, prejudique a segurança do serviço, ou por exigência legal. Após rescisão, seu direito de usar o serviço cessará, mas obrigações que devam sobreviver à rescisão (ex.: cláusulas de propriedade, limitação de responsabilidade e indenização) permanecerão válidas.",
      ],
    },
    {
      id: "changes",
      title: "17. Alterações nestes Termos e nas ofertas",
      content: [
        "Podemos alterar estes Termos a qualquer momento. Quando houver alterações materiais, procuraremos notificar de maneira adequada (por exemplo, via changelog, repositório ou email se aplicável). O uso continuado após alterações implicará aceitação dos novos termos.",
      ],
    },
    {
      id: "export-compliance",
      title: "18. Conformidade com exportação",
      content: [
        "Você concorda em cumprir leis de controle de exportação e não utilizar o serviço em violação a tais leis. É proibida a exportação do software ou dados para países ou pessoas sancionadas sem a devida autorização.",
      ],
    },
    {
      id: "dispute",
      title: "19. Resolução de disputas",
      content: [
        "Quaisquer disputas decorrentes destes Termos deverão ser buscadas primeiramente por via amigável. Caso não seja possível, a disputa será resolvida conforme a legislação aplicável e jurisdição indicada na seção de legislação aplicável.",
      ],
    },
    {
      id: "severability",
      title: "20. Separabilidade",
      content: [
        "Se qualquer disposição destes Termos for considerada inválida ou inexequível, essa disposição será aplicada na máxima extensão possível e as demais permanecerão em vigor.",
      ],
    },
    {
      id: "entire-agreement",
      title: "21. Acordo integral",
      content: [
        "Estes Termos constituem o acordo integral entre você e os mantenedores com relação ao uso do serviço, substituindo quaisquer entendimentos anteriores.",
      ],
    },
    {
      id: "contact",
      title: "22. Contato",
      content: [
        "Para questões relacionadas a estes Termos, direitos autorais, solicitações legais ou pedidos de remoção, abra uma issue no repositório (https://github.com/glatztp/gltz) ou envie uma mensagem para contato@glacien.online se disponível.",
        "Inclua informações claras e completas: identificação do material, localização do conteúdo supostamente infrator, e um contato para resposta.",
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
                  Leia atentamente estes Termos antes de usar o serviço. Leia
                  com atenção e use o sumário para navegar.
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
