import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  AspectRatio,
} from "../../index";
import {
  Play,
  Image,
  Monitor,
  DeviceMobile,
  Camera,
  Square,
  Rectangle,
  Circle,
  CornersOut,
  Crop,
  FilmStrip,
  TrademarkRegistered,
} from "phosphor-react";

export function AspectRatioPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Aspect Ratio Component</h1>
        <p className="text-muted-foreground mt-2">
          Componente para manter proporções específicas de elementos.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Aspect Ratios Básicos */}
        <Card>
          <CardHeader>
            <CardTitle>Aspect Ratios Básicos</CardTitle>
            <CardDescription>
              Proporções mais comuns para diferentes tipos de conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 16:9 - Video */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Play size={16} />
                  16:9 - Vídeo
                </h4>
                <AspectRatio rounded ratio={16 / 9}>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center h-full border-2 border-dashed border-blue-300">
                    <div className="text-center">
                      <Play size={32} className="mx-auto text-blue-600 mb-2" />
                      <p className="text-sm text-blue-700 font-medium">
                        Vídeo Player
                      </p>
                      <p className="text-xs text-blue-600">1920x1080</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* 1:1 - Quadrado */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Square size={16} />
                  1:1 - Quadrado
                </h4>
                <AspectRatio rounded ratio={1}>
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center h-full border-2 border-dashed border-green-300">
                    <div className="text-center">
                      <Image
                        size={32}
                        className="mx-auto text-green-600 mb-2"
                      />
                      <p className="text-sm text-green-700 font-medium">
                        Instagram Post
                      </p>
                      <p className="text-xs text-green-600">1080x1080</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* 4:3 - Tradicional */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Monitor size={16} />
                  4:3 - Tradicional
                </h4>
                <AspectRatio rounded ratio={4 / 3}>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center h-full border-2 border-dashed border-purple-300">
                    <div className="text-center">
                      <Monitor
                        size={32}
                        className="mx-auto text-purple-600 mb-2"
                      />
                      <p className="text-sm text-purple-700 font-medium">
                        Monitor CRT
                      </p>
                      <p className="text-xs text-purple-600">1024x768</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* 3:2 - Fotografia */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Camera size={16} />
                  3:2 - Fotografia
                </h4>
                <AspectRatio rounded ratio={3 / 2}>
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center h-full border-2 border-dashed border-orange-300">
                    <div className="text-center">
                      <Camera
                        size={32}
                        className="mx-auto text-orange-600 mb-2"
                      />
                      <p className="text-sm text-orange-700 font-medium">
                        Foto DSLR
                      </p>
                      <p className="text-xs text-orange-600">3000x2000</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* 9:16 - Vertical */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <DeviceMobile size={16} />
                  9:16 - Vertical
                </h4>
                <AspectRatio rounded ratio={9 / 16}>
                  <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center h-full border-2 border-dashed border-pink-300">
                    <div className="text-center">
                      <DeviceMobile
                        size={32}
                        className="mx-auto text-pink-600 mb-2"
                      />
                      <p className="text-sm text-pink-700 font-medium">
                        Story/Reels
                      </p>
                      <p className="text-xs text-pink-600">1080x1920</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* 21:9 - Cinema */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <FilmStrip size={16} />
                  21:9 - Cinema
                </h4>
                <AspectRatio rounded ratio={21 / 9}>
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center h-full border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <FilmStrip
                        size={32}
                        className="mx-auto text-gray-600 mb-2"
                      />
                      <p className="text-sm text-gray-700 font-medium">
                        Ultrawide
                      </p>
                      <p className="text-xs text-gray-600">2560x1080</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aspect Ratios com Conteúdo Real */}
        <Card>
          <CardHeader>
            <CardTitle>Aspect Ratios com Conteúdo</CardTitle>
            <CardDescription>
              Exemplos práticos com imagens, vídeos e elementos reais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Galeria de Imagens */}
              <div className="space-y-4">
                <h4 className="font-medium">Galeria de Fotos</h4>
                <div className="grid grid-cols-2 gap-2">
                  <AspectRatio rounded ratio={1}>
                    <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <Badge className="bg-white/20 text-white text-xs">
                          Natureza
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CornersOut size={16} className="text-white" />
                      </div>
                    </div>
                  </AspectRatio>
                  <AspectRatio rounded ratio={1}>
                    <div className="bg-gradient-to-br from-green-400 to-blue-600 rounded-lg relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <Badge className="bg-white/20 text-white text-xs">
                          Paisagem
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CornersOut size={16} className="text-white" />
                      </div>
                    </div>
                  </AspectRatio>
                  <AspectRatio rounded ratio={1}>
                    <div className="bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <Badge className="bg-white/20 text-white text-xs">
                          Retrato
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CornersOut size={16} className="text-white" />
                      </div>
                    </div>
                  </AspectRatio>
                  <AspectRatio rounded ratio={1}>
                    <div className="bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <Badge className="bg-white/20 text-white text-xs">
                          Arte
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CornersOut size={16} className="text-white" />
                      </div>
                    </div>
                  </AspectRatio>
                </div>
              </div>

              {/* Player de Vídeo */}
              <div className="space-y-4">
                <h4 className="font-medium">Player de Vídeo</h4>
                <AspectRatio rounded ratio={16 / 9}>
                  <div className="bg-black rounded-lg relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Play
                          size={24}
                          className="text-white ml-1"
                          weight="fill"
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h5 className="text-white font-medium mb-1">
                        Tutorial: Aspect Ratios em CSS
                      </h5>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <span>12:34</span>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>HD</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-600 text-white">AO VIVO</Badge>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aspect Ratios Responsivos */}
        <Card>
          <CardHeader>
            <CardTitle>Aspect Ratios Responsivos</CardTitle>
            <CardDescription>
              Proporções que se adaptam a diferentes tamanhos de tela
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Desktop vs Mobile */}
              <div className="space-y-4">
                <h4 className="font-medium">Adaptativo Desktop/Mobile</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Desktop (16:9)
                    </p>
                    <div className="hidden lg:block">
                      <AspectRatio rounded ratio={16 / 9}>
                        <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center h-full border-2 border-dashed border-indigo-300">
                          <div className="text-center">
                            <Monitor
                              size={32}
                              className="mx-auto text-indigo-600 mb-2"
                            />
                            <p className="text-sm text-indigo-700 font-medium">
                              Versão Desktop
                            </p>
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                    <div className="lg:hidden">
                      <AspectRatio rounded ratio={4 / 3}>
                        <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center h-full border-2 border-dashed border-indigo-300">
                          <div className="text-center">
                            <DeviceMobile
                              size={32}
                              className="mx-auto text-indigo-600 mb-2"
                            />
                            <p className="text-sm text-indigo-700 font-medium">
                              Versão Mobile
                            </p>
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cards de Produto */}
              <div className="space-y-4">
                <h4 className="font-medium">Cards de Produto</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    {
                      name: "Smartphone",
                      color: "from-blue-400 to-blue-600",
                      price: "R$ 1.299",
                    },
                    {
                      name: "Laptop",
                      color: "from-green-400 to-green-600",
                      price: "R$ 2.899",
                    },
                    {
                      name: "Tablet",
                      color: "from-purple-400 to-purple-600",
                      price: "R$ 899",
                    },
                    {
                      name: "Smartwatch",
                      color: "from-orange-400 to-orange-600",
                      price: "R$ 599",
                    },
                  ].map((product, index) => (
                    <div key={index} className="space-y-2">
                      <AspectRatio rounded ratio={1}>
                        <div
                          className={`bg-gradient-to-br ${product.color} rounded-lg relative overflow-hidden group cursor-pointer`}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <Circle size={24} weight="fill" />
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              className="bg-white/20 text-white border-none hover:bg-white/30"
                            >
                              Ver
                            </Button>
                          </div>
                        </div>
                      </AspectRatio>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-lg font-bold text-green-600">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aspect Ratios Personalizados */}
        <Card>
          <CardHeader>
            <CardTitle>Aspect Ratios Personalizados</CardTitle>
            <CardDescription>
              Criando proporções específicas para necessidades únicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Banners */}
              <div className="space-y-4">
                <h4 className="font-medium">Banners Publicitários</h4>
                <div className="space-y-4">
                  {/* Banner Leaderboard */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Leaderboard (728x90)
                    </p>
                    <AspectRatio rounded ratio={728 / 90}>
                      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg flex items-center justify-center h-full text-white">
                        <div className="text-center">
                          <p className="font-bold text-lg">MEGA PROMOÇÃO!</p>
                          <p className="text-sm">
                            Até 70% OFF em todos os produtos
                          </p>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>

                  {/* Banner Medium Rectangle */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Medium Rectangle (300x250)
                      </p>
                      <AspectRatio rounded ratio={300 / 250}>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center h-full text-white relative overflow-hidden">
                          <div className="text-center z-10">
                            <h3 className="font-bold text-lg mb-2">
                              Black Friday
                            </h3>
                            <p className="text-sm mb-3">
                              Descontos imperdíveis
                            </p>
                            <Button
                              size="sm"
                              className="bg-white text-purple-600 hover:bg-gray-100"
                            >
                              Conferir
                            </Button>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-white/20 text-white">
                              HOT
                            </Badge>
                          </div>
                        </div>
                      </AspectRatio>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Skyscraper (160x600)
                      </p>
                      <AspectRatio rounded ratio={160 / 600}>
                        <div className="bg-gradient-to-b from-blue-500 to-teal-500 rounded-lg flex items-center justify-center h-full text-white">
                          <div className="text-center px-2">
                            <h4 className="font-bold text-sm mb-4">
                              Newsletter
                            </h4>
                            <p className="text-xs mb-4">
                              Receba as melhores ofertas
                            </p>
                            <Button
                              size="sm"
                              className="bg-white text-blue-600 hover:bg-gray-100 text-xs"
                            >
                              Assinar
                            </Button>
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aspect Ratios Extremos */}
              <div className="space-y-4">
                <h4 className="font-medium">Proporções Extremas</h4>
                <div className="space-y-4">
                  {/* Ultra Wide */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Ultra Wide (32:9)
                    </p>
                    <AspectRatio rounded ratio={32 / 9}>
                      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg flex items-center justify-center h-full text-white relative overflow-hidden">
                        <div className="text-center">
                          <Monitor size={32} className="mx-auto mb-2" />
                          <p className="font-medium">Monitor Ultra Wide</p>
                          <p className="text-sm text-gray-400">
                            Experiência imersiva
                          </p>
                        </div>
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-8 bg-white/20 rounded-full"></div>
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-8 bg-white/20 rounded-full"></div>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>

                  {/* Ultra Tall */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Ultra Tall (2:5)
                      </p>
                      <AspectRatio rounded ratio={2 / 5}>
                        <div className="bg-gradient-to-b from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center h-full text-white relative">
                          <div className="text-center px-2">
                            <DeviceMobile size={24} className="mx-auto mb-2" />
                            <p className="font-medium text-sm">
                              Story Vertical
                            </p>
                            <p className="text-xs text-indigo-200 mt-2">
                              Conteúdo mobile-first
                            </p>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ferramentas Interativas */}
        <Card>
          <CardHeader>
            <CardTitle>Ferramentas Interativas</CardTitle>
            <CardDescription>
              Exemplos de funcionalidades avançadas com aspect ratio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Crop Tool */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Crop size={16} />
                  Ferramenta de Recorte
                </h4>
                <div className="max-w-md">
                  <AspectRatio rounded ratio={4 / 3}>
                    <div className="bg-gradient-to-br from-cyan-100 to-blue-200 rounded-lg relative overflow-hidden group">
                      {/* Imagem base */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600"></div>

                      {/* Overlay de crop */}
                      <div className="absolute inset-4 border-2 border-white border-dashed bg-black/20 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Crop size={24} className="mx-auto mb-2" />
                          <p className="text-sm font-medium">Área de Recorte</p>
                          <p className="text-xs opacity-80">
                            Arraste para ajustar
                          </p>
                        </div>
                      </div>

                      {/* Handles de redimensionamento */}
                      <div className="absolute top-3 left-3 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-nw-resize"></div>
                      <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-ne-resize"></div>
                      <div className="absolute bottom-3 left-3 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-sw-resize"></div>
                      <div className="absolute bottom-3 right-3 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize"></div>
                    </div>
                  </AspectRatio>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <TrademarkRegistered size={14} className="mr-1" />
                      Redimensionar
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Crop size={14} className="mr-1" />
                      Aplicar Recorte
                    </Button>
                  </div>
                </div>
              </div>

              {/* Preview de Diferentes Aspectos */}
              <div className="space-y-4">
                <h4 className="font-medium">Preview Multi-formato</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { ratio: 16 / 9, name: "YouTube", icon: Play },
                    { ratio: 1, name: "Instagram", icon: Square },
                    { ratio: 9 / 16, name: "Stories", icon: DeviceMobile },
                    { ratio: 4 / 3, name: "Twitter", icon: Rectangle },
                  ].map((format, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <format.icon size={14} />
                        {format.name}
                      </div>
                      <AspectRatio rounded ratio={format.ratio}>
                        <div className="bg-gradient-to-br from-emerald-100 to-teal-200 rounded-lg flex items-center justify-center h-full border-2 border-emerald-300 relative">
                          <div className="text-center">
                            <Image
                              size={20}
                              className="mx-auto text-emerald-600 mb-1"
                            />
                            <p className="text-xs text-emerald-700 font-medium">
                              Preview
                            </p>
                          </div>
                          <div className="absolute top-1 right-1">
                            <Badge
                              variant="outline"
                              className="text-xs border-emerald-400 text-emerald-700"
                            >
                              {format.ratio > 1
                                ? "16:9"
                                : format.ratio === 1
                                  ? "1:1"
                                  : "9:16"}
                            </Badge>
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
