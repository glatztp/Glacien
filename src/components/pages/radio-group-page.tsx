import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  RadioGroup,
  RadioGroupItem,
  Label,
} from "../../index";

export function RadioGroupPage() {
  const [value, setValue] = React.useState("option1");

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Radio Group Component</h1>
        <p className="text-muted-foreground mt-2">
          Componente de grupo de botões de rádio para seleção única.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Radio Group Básico</CardTitle>
            <CardDescription>
              Exemplo básico de grupo de radio buttons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RadioGroup value={value} onValueChange={setValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1">Opção 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2">Opção 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="option3" />
                  <Label htmlFor="option3">Opção 3</Label>
                </div>
              </RadioGroup>

              <p className="text-sm text-muted-foreground">
                Selecionado: {value}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Radio Group Básico</CardTitle>
                  <CardDescription>
                    Exemplo básico de grupo de radio buttons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RadioGroup value={value} onValueChange={setValue}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="option1" />
                        <Label htmlFor="option1">Opção 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="option2" />
                        <Label htmlFor="option2">Opção 2</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option3" id="option3" />
                        <Label htmlFor="option3">Opção 3</Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground">
                      Selecionado: {value}
                    </p>
                  </div>
                </CardContent>
              </Card>
      
              {/* Variante preenchida */}
              <Card>
                <CardHeader>
                  <CardTitle>Radio Group Preenchido</CardTitle>
                  <CardDescription>
                    Botões de rádio com fundo preenchido ao selecionar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RadioGroup value={value} onValueChange={setValue}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="filled1"
                          id="filled1"
                          className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                        />
                        <Label htmlFor="filled1">Preenchido 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="filled2"
                          id="filled2"
                          className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                        />
                        <Label htmlFor="filled2">Preenchido 2</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
      
              {/* Variante outline grande */}
              <Card>
                <CardHeader>
                  <CardTitle>Radio Group Outline Grande</CardTitle>
                  <CardDescription>
                    Botões de rádio com borda destacada e tamanho maior.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RadioGroup value={value} onValueChange={setValue}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="outline1"
                          id="outline1"
                          className="h-6 w-6 border-2 border-primary"
                        />
                        <Label htmlFor="outline1" className="text-lg">Outline 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="outline2"
                          id="outline2"
                          className="h-6 w-6 border-2 border-primary"
                        />
                        <Label htmlFor="outline2" className="text-lg">Outline 2</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
      
              {/* Variante com descrição */}
              <Card>
                <CardHeader>
                  <CardTitle>Radio Group com Descrição</CardTitle>
                  <CardDescription>
                    Cada opção possui uma descrição adicional.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RadioGroup value={value} onValueChange={setValue}>
                      <div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="desc1" id="desc1" />
                          <Label htmlFor="desc1">Com descrição 1</Label>
                        </div>
                        <span className="ml-6 text-xs text-muted-foreground">
                          Descrição extra para a opção 1.
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="desc2" id="desc2" />
                          <Label htmlFor="desc2">Com descrição 2</Label>
                        </div>
                        <span className="ml-6 text-xs text-muted-foreground">
                          Outra descrição para a opção 2.
                        </span>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
      
              {/* Variante desabilitada */}
              <Card>
                <CardHeader>
                  <CardTitle>Radio Group Desabilitado</CardTitle>
                  <CardDescription>
                    Grupo de radio buttons desabilitado.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RadioGroup value="disabled1" disabled>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="disabled1" id="disabled1" />
                        <Label htmlFor="disabled1">Desabilitado 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="disabled2" id="disabled2" />
                        <Label htmlFor="disabled2">Desabilitado 2</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </div>
    </div>
  );
}
