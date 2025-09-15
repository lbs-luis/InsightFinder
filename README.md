
## Insight Finder
<div align="center"><img src="https://github.com/lbs-luis/InsightFinder/blob/main/media/white-logo.png?raw=true"  width="200" height="200" /></div>

<p align="center"><a href="https://github.com/lbs-luis/InsightFinder/blob/main/media/white-logo.png?raw=true">Frontend</a> | <a href="https://github.com/lbs-luis/InsightFinder/blob/main/media/white-logo.png?raw=true">Backend</a> </p>

### A Visão

Em um mundo de informação acelerada, a verificação de fatos e a apuração jornalística a longo prazo se tornaram tarefas complexas. O **Insight Finder AI** surge para resolver este problema, oferecendo aos jornalistas e criadores de conteúdo uma ferramenta inteligente que lhes permite encontrar e validar informações, declarações e fatos ao longo do tempo.

Nosso objetivo é transformar a maneira como a pesquisa é feita, proporcionando uma plataforma que garanta a continuidade e a fácil recuperação de dados jornalísticos, permitindo que o usuário manuseie e encontre rapidamente a confirmação de um fato ou a declaração de um entrevistado, independentemente de quando a notícia foi publicada.

##

### Roteiro do Projeto (Roadmap)

O desenvolvimento do Insight Finder AI está dividido em quatro etapas principais (MVPs), com foco em construir uma fundação sólida antes de introduzir funcionalidades mais complexas.

- ### MVP 1: Agregador de Notícias

**Objetivo**: Estabelecer a base do projeto.

-   Coleta e armazenamento de notícias de diversas fontes (G1, Le Monde) via feeds RSS.
    
-   Tratamento e normalização dos dados.
    
-   Interface web para exibição das notícias coletadas.
    

- ### MVP 2: Análise e Testes com IA

**Objetivo**: Iniciar a integração da inteligência artificial.

-   Testes iniciais com modelos de linguagem para processamento de texto.
    
-   Experimentos com a sumarização de conteúdos.
    
-   Começar a modelar a funcionalidade de extração de entidades (nomes, locais, etc.).
    

- ### MVP 3: Resumos Semanais de Tópicos

**Objetivo**: Entregar valor através da IA.

-   Implementação de um serviço que gera resumos semanais de notícias por categoria.
    
-   Esses resumos serão criados pela IA, dando ao usuário uma visão consolidada e resumida dos acontecimentos mais importantes.
    

 - ### MVP 4: Entrega Final

**Objetivo**: Conclusão do projeto com todas as funcionalidades-chave.

-   Integração total dos módulos (Coleta, Análise, Resumos).
    
-   Finalização do assistente de entrevista (transcrição de áudio e busca contextual).
    
-   Otimizações de performance, melhorias de UI/UX e entrega do produto final.

##

### Estrutura do Monorepo

O projeto está organizado como um monorepo para centralizar o gerenciamento de código.

```
/
├── apps/
│   ├── frontend/ (Aplicação Next.js)
│   └── backend/ (API NestJS)
├── docs/
├── media/ (Ícones e recursos visuais)
└── README.md (Este arquivo)

```
##
