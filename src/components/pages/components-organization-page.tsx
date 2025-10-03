import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import { Badge } from "../ui";
import { Folder, FileText, Package } from "lucide-react";

export function ComponentsOrganizationPage() {
  const componentCategories = [
    {
      name: "Forms",
      path: "ui/forms/",
      icon: <FileText className="h-5 w-5" />,
      description: "Componentes de formulário e entrada de dados",
      components: [
        "Form",
        "Input",
        "Textarea",
        "Checkbox",
        "Radio Group",
        "Switch",
        "Label",
        "Input OTP",
        "Slider",
        "Date Picker",
        "Calendar",
      ],
      color: "bg-blue-500",
    },
    {
      name: "Selects",
      path: "ui/selects/",
      icon: <Package className="h-5 w-5" />,
      description: "Componentes de seleção e escolha",
      components: ["Select", "Combobox", "Command", "MultiCombo"],
      color: "bg-green-500",
    },
    {
      name: "Navigation",
      path: "ui/navigation/",
      icon: <Folder className="h-5 w-5" />,
      description: "Componentes de navegação",
      components: ["Navigation Menu", "Pagination", "Tabs", "Menubar"],
      color: "bg-purple-500",
    },
    {
      name: "Overlays",
      path: "ui/overlays/",
      icon: <Package className="h-5 w-5" />,
      description: "Modais, popovers e sobreposições",
      components: [
        "Popover",
        "Dialog",
        "Alert Dialog",
        "Sheet",
        "Drawer",
        "Tooltip",
        "Hover Card",
        "Context Menu",
        "Dropdown Menu",
      ],
      color: "bg-orange-500",
    },
    {
      name: "Feedback",
      path: "ui/feedback/",
      icon: <FileText className="h-5 w-5" />,
      description: "Componentes de feedback ao usuário",
      components: ["Alert", "Toast", "Sonner", "Progress", "Skeleton"],
      color: "bg-red-500",
    },
    {
      name: "Layout",
      path: "ui/layout/",
      icon: <Folder className="h-5 w-5" />,
      description: "Componentes de estrutura e layout",
      components: [
        "Card",
        "Separator",
        "Scroll Area",
        "Resizable",
        "Aspect Ratio",
        "Sidebar",
      ],
      color: "bg-cyan-500",
    },
    {
      name: "Data",
      path: "ui/data/",
      icon: <Package className="h-5 w-5" />,
      description: "Componentes para exibição de dados",
      components: ["Data Table"],
      color: "bg-pink-500",
    },
  ];

  const coreComponents = [
    "Button",
    "Badge",
    "Avatar",
    "Toggle",
    "Toggle Group",
    "Accordion",
    "Collapsible",
    "Theme Toggle",
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Organização dos Componentes
        </h1>
        <p className="text-muted-foreground">
          Os componentes foram reorganizados em categorias para melhor
          organização e facilidade de uso.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            Componentes Core
          </CardTitle>
          <CardDescription>
            Componentes fundamentais mantidos na raiz da pasta ui/
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {coreComponents.map((component) => (
              <Badge key={component} variant="outline" className="text-sm">
                {component}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {componentCategories.map((category) => (
          <Card key={category.name} className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                {category.name}
              </CardTitle>
              <CardDescription className="text-sm">
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  {category.path}
                </code>
              </CardDescription>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {category.components.map((component) => (
                    <Badge
                      key={component}
                      variant="secondary"
                      className="text-xs"
                    >
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exemplos de Importação</CardTitle>
          <CardDescription>
            Como importar componentes da nova estrutura organizacional
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Importação por categoria:</h4>
            <div className="bg-muted p-3 rounded-md text-sm font-mono">
              <div>{"// Todos os componentes de forms"}</div>
              <div>{"import { Input, Button, Form } from '../ui'"}</div>
              <div className="mt-2">{"// Todos os componentes de selects"}</div>
              <div>
                {"import { Select, Combobox, MultiCombo } from '../ui'"}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Importação geral (recomendado):</h4>
            <div className="bg-muted p-3 rounded-md text-sm font-mono">
              <div>{"// Importa de todas as categorias"}</div>
              <div>
                {
                  "import { Button, Input, Select, Dialog } from '@/components/ui'"
                }
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Novo componente MultiCombo:</h4>
            <div className="bg-muted p-3 rounded-md text-sm font-mono">
              <div>{"import { MultiCombo } from '../ui'"}</div>
              <div className="mt-2">{"// ou"}</div>
              <div>{"import { MultiCombo } from '@/components/ui'"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
