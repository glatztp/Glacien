"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import { Badge } from "../ui";
import { Input } from "../ui";
import {
  Lightning,
  Palette,
  Code,
  Sparkle,
  Rocket,
  Heart,
  Download,
  GithubLogo,
  ArrowRight,
  DeviceMobile,
  Shield,
  Stack,
  Play,
} from "phosphor-react";

const HomePage = () => {
  const features = [
    {
      icon: <Palette size={24} />,
      title: "Design System Completo",
      description:
        "43+ componentes cuidadosamente projetados com paleta de cores moderna",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      icon: <Lightning size={24} />,
      title: "Performance Otimizada",
      description: "Componentes leves e otimizados para máxima performance",
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
    },
    {
      icon: <Code size={24} />,
      title: "TypeScript First",
      description: "Desenvolvido 100% em TypeScript com types seguros",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: <Sparkle size={24} />,
      title: "Animações Fluidas",
      description: "Micro-interações e animações com Framer Motion",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      icon: <DeviceMobile size={24} />,
      title: "Totalmente Responsivo",
      description: "Design adaptável para todos os dispositivos",
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
    },
    {
      icon: <Shield size={24} />,
      title: "Acessibilidade",
      description: "Componentes acessíveis seguindo padrões WCAG",
      color: "bg-gradient-to-br from-red-500 to-pink-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-12">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 px-6 text-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 animate-gradient"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="mb-8">
            <Badge className="mb-4 bg-gradient-primary text-white hover-glow">
              <Sparkle size={14} className="mr-1" />
              Nova versão disponível
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-7 text-gradient-primary "
          >
            glacien
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            O design system mais moderno e completo para React.
            <span className="text-gradient-rainbow font-semibold">
              Construa interfaces incríveis{" "}
            </span>
            com componentes premium e animações fluidas.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button size="lg" className="bg-gradient-primary hover-glow group">
              <Play
                size={20}
                className="mr-2 group-hover:scale-110 transition-transform"
              />
              Começar Agora
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover-lift group"
              onClick={() =>
                window.open("https://github.com/glatztp/Glacien", "_blank")
              }
            >
              <GithubLogo
                size={20}
                className="mr-2 group-hover:rotate-12 transition-transform"
              />
              Ver no GitHub
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground">
              <Rocket size={14} className="mr-1" />
              Recursos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Por que escolher
              <span className="text-gradient-primary"> glacien</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos pensados para desenvolvedores modernos que buscam
              qualidade e produtividade
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover-lift group cursor-pointer border-gradient">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-glow-primary`}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Component Showcase */}
      <motion.section
        className="py-20 px-6 bg-muted/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-accent">
              <Stack size={14} className="mr-1" />
              Componentes
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-rainbow">43+ Componentes</span>{" "}
              Premium
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Biblioteca completa de componentes modernos e customizáveis
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              "Button",
              "Card",
              "Input",
              "Alert",
              "Badge",
              "Avatar",
              "Calendar",
              "Dialog",
              "Dropdown",
              "Toast",
              "Slider",
              "Switch",
            ].map((component, index) => (
              <Card
                key={index}
                className="text-center hover-lift glass-effect group"
              >
                <CardContent className="pt-6">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Code size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {component}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Button className="bg-gradient-primary hover-glow">
              Ver Todos os Componentes
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-6 bg-gradient-cosmic"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div variants={itemVariants}>
            <Rocket size={48} className="mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de desenvolvedores que já estão criando
              interfaces incríveis
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2">
                <Input
                  placeholder="Digite seu email"
                  className="bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0"
                />
                <Button className="ml-2 bg-white text-gray-900 hover:bg-gray-100">
                  Inscrever
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 hover-lift"
              >
                <Download size={20} className="mr-2" />
                Baixar v2.0
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover-lift"
                onClick={() =>
                  window.open("https://github.com/glatztp/Glacien", "_blank")
                }
              >
                <GithubLogo size={20} className="mr-2" />
                Fork no GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-gradient-primary">
                glacienUI
              </h3>
              <p className="text-muted-foreground text-sm">
                Design system moderno para React. Construa interfaces incríveis
                com componentes premium.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Componentes</div>
                <div>Documentação</div>
                <div>Exemplos</div>
                <div>Templates</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Desenvolvedores</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>GitHub</div>
                <div>API Reference</div>
                <div>Changelog</div>
                <div>Roadmap</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Comunidade</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Discord</div>
                <div>Twitter</div>
                <div>Blog</div>
                <div>Newsletter</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2025 glacienUI. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Badge variant="outline">
                Feito com <Heart size={12} className="mx-1 text-red-500" /> no
                Brasil
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
