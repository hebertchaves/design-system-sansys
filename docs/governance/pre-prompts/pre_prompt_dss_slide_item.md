# Pré-prompt: DssSlideItem

## 1. CLASSIFICAÇÃO E CONTEXTO

**Golden Reference:** DssBadge

**Golden Context:** O DssSlideItem é um componente fundamental para estruturar e exibir conteúdo dentro de um DssSlide. Ele atua como um contêiner flexível, permitindo a organização de diferentes tipos de informação de forma padronizada e responsiva, garantindo a consistência visual e funcionalidade em apresentações ou carrosséis.

**Justificativa:** A criação do DssSlideItem visa padronizar a composição interna dos slides, desacoplando a lógica de apresentação do conteúdo específico. Isso promove a reutilização, facilita a manutenção e garante uma experiência de usuário coesa em todas as instâncias de slides que utilizam o Design System.

## 2. RISCOS ARQUITETURAIS E GATES

**Riscos Arquiteturais:**
*   **Acoplamento excessivo:** Risco de o DssSlideItem se tornar excessivamente acoplado ao DssSlide, dificultando sua reutilização em outros contextos ou a evolução independente.
*   **Performance:** Conteúdo complexo ou grande número de DssSlideItems em um único slide pode impactar negativamente a performance de renderização e transição.
*   **Flexibilidade de Layout:** Dificuldade em acomodar layouts variados e requisitos de conteúdo dinâmico sem comprometer a simplicidade da API.

**Gates:**
*   **Gate 1 (Design Review):** Validação do design do componente para garantir que ele seja agnóstico ao seu pai (DssSlide) e que sua API permita flexibilidade de layout através de slots nomeados e props de alinhamento.
*   **Gate 2 (Performance Testing):** Testes de carga e performance para garantir que o componente mantenha um bom desempenho mesmo com conteúdo rico e em cenários de múltiplos itens.
*   **Gate 3 (Accessibility Audit):** Auditoria de acessibilidade para garantir que o DssSlideItem e seu conteúdo sejam navegáveis e compreensíveis por tecnologias assistivas, especialmente em relação à ordem de leitura e foco.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O Quasar não possui um componente diretamente equivalente a um 