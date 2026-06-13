1	# Pré-prompt: DssUploader
2	
3	**Status:** 🔒 Bloqueado (Aguardando selagem de DssButton, DssIcon, DssLinearProgress)
4	**Nível:** 2 (Composição de Primeiro Grau)
5	**Família:** Upload
6	
7	---
8	
9	## 1. CLASSIFICAÇÃO E CONTEXTO
10	
11	O `DssUploader` é um componente composto da Fase 2 que orquestra a seleção, visualização e envio de arquivos. Ele combina botões de ação, lista de arquivos, ícones de status e barras de progresso em uma interface unificada, proporcionando uma experiência robusta e acessível para o usuário final. Sua complexidade reside na integração de múltiplos elementos interativos e na gestão de estados assíncronos.
12	
13	- **Golden Reference:** `DssChip` (Componente interativo em sua raiz — a interatividade pertence aos botões filhos)
14	- **Golden Context:** `DssCard` (Container estrutural com borda, superfície e elevação, garantindo consistência visual e hierarquia clara no layout da aplicação)
15	
16	**Justificativa da Fase 2:** O `DssUploader` não é um componente atômico. Ele orquestra múltiplos componentes DSS internos (`DssButton`, `DssIcon`, `DssLinearProgress`) e gerencia estado complexo (lista de arquivos, progresso de upload, status de erro/sucesso). A natureza composta deste componente exige uma abordagem cuidadosa na sua construção para garantir que todos os subcomponentes funcionem em harmonia e sigam as diretrizes do Design System Sansys. A gestão de estado para múltiplos arquivos, incluindo o progresso individual e global, valida sua classificação como um componente de segundo grau de complexidade.
17	
18	## 2. RISCOS ARQUITETURAIS E GATES
19	
20	### Risco 1: Vazamento de Componentes Nativos
21	O `QUploader` do Quasar injeta botões nativos (`QBtn`), ícones nativos (`QIcon`) e barras de progresso nativas (`QLinearProgress`) em sua interface padrão. Se não for sobrescrito, o componente vazará elementos não governados para o produto final, comprometendo a integridade visual e funcional do Design System. Este é um risco crítico que deve ser mitigado proativamente.
22	**Mitigação:** O `DssUploader` deve utilizar obrigatoriamente os slots do `QUploader` (`header`, `list`) para reconstruir a interface utilizando `DssButton`, `DssIcon` e `DssLinearProgress`. Essa substituição deve ser completa e não deve deixar resquícios de componentes nativos do Quasar visíveis ou acessíveis no DOM final. A implementação deve prever a passagem de todas as propriedades e eventos relevantes para os componentes DSS internos.
23	
24	### Risco 2: Inconsistência de Superfície e Borda
25	O `QUploader` possui estilos próprios de borda e sombra que divergem do padrão DSS, o que pode levar a uma experiência visual fragmentada. A padronização da superfície é fundamental para a coesão do Design System.
26	**Mitigação:** Aplicar as classes e tokens de superfície do `DssCard` ao container principal do uploader. Isso inclui a aplicação de tokens para borda, raio de borda, sombra e cor de fundo, garantindo que o `DssUploader` se integre perfeitamente com outros componentes que utilizam o `DssCard` como contexto.
27	
28	### Gates Aplicáveis
29	- **Gate de Composição v2.4:** O componente deve repassar props visuais para seus filhos (ex: `disable` deve desabilitar os `DssButton` internos). Isso garante que o estado do componente pai seja corretamente propagado para os componentes aninhados, mantendo a interatividade consistente.
30	- **Gate de Responsabilidade:** O componente não deve reinventar a lógica de XHR/Fetch do Quasar, apenas envelopar a UI. Sua responsabilidade principal é a apresentação e orquestração visual, delegando as operações de rede ao `QUploader` subjacente. Isso evita duplicação de código e aproveita a funcionalidade existente do framework.
31	
32	## 3. MAPEAMENTO DE API (QUASAR → DSS)
33	
34	O mapeamento da API do `QUploader` para o `DssUploader` é crucial para manter a compatibilidade e, ao mesmo tempo, impor as diretrizes do DSS. As propriedades são categorizadas para clareza.
35	
36	### Props Mantidas (Pass-through)
37	Estas propriedades são passadas diretamente do `DssUploader` para o `QUploader` sem modificações, pois controlam a lógica fundamental de rede e validação que não deve ser alterada pelo DSS.
38	- `url`: Endpoint para onde os arquivos serão enviados.
39	- `method`: Método HTTP a ser usado (e.g., `POST`, `PUT`).
40	- `headers`: Cabeçalhos HTTP personalizados para a requisição.
41	- `form-fields`: Campos adicionais a serem enviados no formulário.
42	- `with-credentials`: Indica se credenciais (cookies, cabeçalhos de autorização) devem ser enviadas com a requisição.
43	- `send-raw`: Envia o arquivo como corpo da requisição sem encapsulamento de formulário.
44	- `multiple`: Permite a seleção de múltiplos arquivos.
45	- `accept`: Tipos de arquivo aceitos (e.g., `image/*`, `.pdf`).
46	- `max-files`: Número máximo de arquivos permitidos.
47	- `max-file-size`: Tamanho máximo de um único arquivo em bytes.
48	- `max-total-size`: Tamanho máximo total de todos os arquivos em bytes.
49	- `auto-upload`: Inicia o upload automaticamente após a seleção do arquivo.
50	- `batch`: Agrupa múltiplos arquivos em uma única requisição de upload.
51	- `factory`: Função customizada para manipular o processo de upload.
52	- `disable`: Desabilita o componente, impedindo interações.
53	- `readonly`: Torna o componente somente leitura, permitindo visualização, mas não modificação.
54	
55	### Props Bloqueadas (Omitidas da API DSS)
56	Estas propriedades do `QUploader` são explicitamente bloqueadas no `DssUploader` para garantir que o estilo e o comportamento sejam controlados exclusivamente pelo Design System.
57	- `color`, `text-color`: A cor do cabeçalho e do texto é governada por tokens de superfície e tipografia do DSS, respectivamente, para manter a consistência visual.
58	- `flat`, `bordered`, `square`: A aparência do container (borda, raio, elevação) é governada pelo Golden Context `DssCard`, eliminando a necessidade dessas propriedades no `DssUploader`.
59	- `hide-upload-btn`: O controle da visibilidade do botão de upload deve ser feito via slots, permitindo maior flexibilidade e aderência ao DSS.
60	
61	### Props Injetadas (Exclusivas DSS)
62	Estas propriedades são adicionadas ao `DssUploader` para estender sua funcionalidade e permitir a personalização de acordo com as diretrizes do Design System.
63	- `brand`: Aplica a cor da marca (`hub`, `water`, `waste`) aos botões de ação e barras de progresso internas, garantindo que o componente reflita a identidade visual da aplicação.
64	- `variant`: Define a aparência do container (`elevated`, `outline`, `subtle`), permitindo diferentes estilos visuais para o `DssUploader` conforme o contexto de uso.
65	
66	## 4. GOVERNANÇA DE TOKENS E CSS
67	
68	O componente deve utilizar estritamente os seguintes tokens do catálogo DSS para garantir a consistência visual e a manutenibilidade. A aderência a estes tokens é mandatório para evitar a proliferação de estilos customizados e garantir a escalabilidade do Design System.
69	
70	- **Superfície do Container:** `--dss-surface-default` (Define a cor de fundo padrão do container do uploader).
71	- **Borda do Container:** `--dss-border-width-thin` solid `--dss-border-gray-300` (Especifica a espessura, estilo e cor da borda do container, alinhando-se ao `DssCard`).
72	- **Raio da Borda:** `--dss-radius-card` (12px) (Define o arredondamento dos cantos do container, conforme o padrão de cartões do DSS).
73	- **Superfície de Dropzone (Hover/Drag):** `--dss-surface-hover` (Cor de fundo aplicada quando o usuário arrasta arquivos sobre a área de dropzone, fornecendo feedback visual claro).
74	- **Espaçamento Interno (Padding):** `--dss-spacing-4` (16px) (Define o espaçamento interno do container, utilizando o token de espaçamento padrão do DSS).
75	- **Espaçamento entre Itens (Gap):** `--dss-grid-gap-sm` (8px) (Define o espaçamento entre os itens da lista de arquivos, garantindo um layout organizado).
76	- **Tipografia (Títulos):** `--dss-text-body` (Token para o estilo de texto de títulos dentro do componente, como o cabeçalho da lista de arquivos).
77	- **Tipografia (Tamanhos/Status):** `--dss-text-subtle` (Token para o estilo de texto de informações secundárias ou status, como o nome do arquivo ou mensagens de erro/sucesso).
78	- **Feedback de Erro:** `--dss-feedback-error` (Cor utilizada para indicar erros, como arquivos rejeitados devido a tamanho ou tipo inválido).
79	- **Feedback de Sucesso:** `--dss-feedback-success` (Cor utilizada para indicar sucesso, como uploads concluídos com êxito).
80	- **Focus Ring:** `outline: 2px solid white` (Estilo de foco para elementos interativos, garantindo acessibilidade e visibilidade do estado de foco).
81	
82	> **Atenção:** Não invente tokens com sufixos semânticos (ex: `--dss-spacing-4`). Use exatamente os tokens listados acima, que foram verificados no `DSS_TOKEN_REFERENCE.md`. Qualquer desvio deve ser justificado e aprovado pela equipe de governança do Design System.
83	
84	## 5. ACESSIBILIDADE E ESTADOS
85	
86	A acessibilidade é um pilar fundamental do Design System Sansys. O `DssUploader` deve ser totalmente acessível, garantindo que usuários com diferentes necessidades possam interagir com o componente de forma eficaz. Os estados do componente devem ser claramente comunicados.
87	
88	- **Focus Ring:** O container principal (se for dropzone) deve receber `outline: 2px solid white` quando focado via teclado. Isso proporciona um indicador visual claro para usuários que navegam via teclado.
89	- **ARIA Labels:** Os botões internos reconstruídos via slot devem ter `aria-label` claros (ex: "Adicionar arquivos", "Fazer upload de todos", "Remover arquivo"). Essas labels fornecem contexto para tecnologias assistivas, como leitores de tela.
90	- **Anúncio de Status:** O status do upload (progresso, sucesso, erro) deve ser anunciado via `aria-live="polite"`. Isso garante que as mudanças de estado importantes sejam comunicadas aos usuários de leitores de tela de forma não intrusiva.
91	- **High Contrast:** Garantir que as bordas do container e dos itens da lista usem `forced-color-adjust: none` e `SystemColor` keywords em `@media (forced-colors: active)`. Isso assegura que o componente seja visualmente compreensível em modos de alto contraste, atendendo às diretrizes de acessibilidade.
92	- **Estados Visuais:** Além dos estados de foco, o componente deve ter estados visuais distintos para `disabled`, `hover`, `active` e `error`, comunicando claramente o status atual ao usuário.
93	
94	## 6. DEPENDÊNCIAS E COMPOSIÇÃO
95	
96	O `DssUploader` é um componente de composição que depende criticamente de outros componentes atômicos e moleculares do Design System Sansys. A correta integração dessas dependências é vital para o funcionamento e a consistência do `DssUploader`.
97	
98	O `DssUploader` depende criticamente de:
99	1. `DssButton` (para ações de adicionar, enviar, limpar): Utilizado para todas as interações de botão dentro do uploader, garantindo a padronização de estilo e comportamento.
100	2. `DssIcon` (para ícones de tipo de arquivo e status): Fornece os ícones visuais para representar tipos de arquivo, status de upload (sucesso, erro, pendente) e ações.
101	3. `DssLinearProgress` (para a barra de progresso individual e global): Exibe o progresso do upload de arquivos, tanto para arquivos individuais quanto para o progresso total, utilizando o componente de progresso linear padrão do DSS.
102	
103	**Regra de Ouro:** NENHUM componente nativo do Quasar (`QBtn`, `QIcon`, `QLinearProgress`) pode ser renderizado no DOM final. Tudo deve ser substituído via slots. Esta regra é inegociável para manter a pureza e a governança do Design System.
104	
105	## 7. EXCEÇÕES PREVISTAS
106	
107	As exceções a seguir são consideradas e justificadas para garantir a funcionalidade do `DssUploader` dentro do ecossistema Quasar, sem comprometer os princípios do Design System.
108	
109	### EXC-01: Uso de Slots Estruturais Obrigatórios
110	- **Justificativa:** Para evitar o vazamento de componentes nativos do Quasar, o `DssUploader` deve obrigatoriamente implementar os slots `header` e `list` internamente, não expondo a UI padrão do `QUploader`. Esta é uma medida preventiva para garantir que a renderização da interface seja totalmente controlada pelo DSS, mesmo quando utilizando um componente base de terceiros. A flexibilidade dos slots do Quasar é aproveitada para injetar os componentes DSS necessários.
111	
112	## 8. SUPERFÍCIE DE PLAYGROUND (Obrigatório)
113	
114	O playground do `DssUploader` deve ser tratado como um artefato de primeira classe para demonstrar a orquestração complexa do componente. Ele serve como uma documentação viva e um ambiente de teste interativo para desenvolvedores e designers. A clareza e a abrangência do playground são essenciais para a adoção e o uso correto do componente.
115	
116	### 8.1 Controles Obrigatórios
117	Os seguintes controles devem estar disponíveis no playground para permitir a exploração completa das capacidades do `DssUploader`:
118	- **Brand:** Alternar a cor de destaque dos botões e barras de progresso entre `hub`, `water` e `waste`. Isso demonstra como o componente se adapta às diferentes paletas de marca do sistema.
119	- **Variant:** Alternar entre `elevated`, `outline` e `subtle` (aparência do container). Isso permite visualizar as diferentes representações visuais do `DssUploader` em vários contextos de interface.
120	- **Multiple:** Alternar entre seleção única e múltipla de arquivos. Essencial para testar o comportamento do componente em diferentes cenários de uso.
121	- **Disable:** Desabilitar todo o componente para observar seu estado inativo e garantir que todos os elementos interativos respondam corretamente.
122	- **Auto-upload:** Demonstrar o envio automático vs. manual de arquivos, permitindo testar fluxos de usuário distintos.
123	
124	### 8.2 Composite Logic (Concreta, não genérica)
125	A lógica de simulação no playground deve ser concreta e refletir cenários de uso realistas, evitando abstrações genéricas que não demonstram o comportamento esperado do componente.
126	- O playground **deve** interceptar a prop `factory` ou `url` para simular um upload real (com delay de rede simulado via `setTimeout`). Por exemplo, um delay de 2 segundos para cada arquivo, com uma chance de 10% de falha para demonstrar o estado de erro.
127	- O playground **não deve** fazer requisições reais para URLs externas. Toda a simulação deve ser local para garantir a estabilidade e a reprodutibilidade dos testes.
128	- A simulação deve demonstrar claramente a transição de estados: Selecionado → Fazendo Upload (com progresso incremental) → Concluído (com feedback de sucesso) / Erro (com mensagem de erro específica). Isso inclui a atualização visual do `DssLinearProgress` e dos ícones de status.
129	- Deve haver um controle para simular diferentes tamanhos de arquivo e tipos (e.g., imagens, documentos, vídeos) para verificar a validação e a exibição de ícones.
130	
131	### 8.3 Estados a Expor (em tabela)
132	
133	| Estado | Descrição da Demonstração | Comportamento Esperado no Playground |
134	|--------|---------------------------|--------------------------------------|
135	| **Vazio (Dropzone)** | Estado inicial aguardando arquivos. | Exibir a área de dropzone com uma mensagem clara de "Arraste e solte arquivos aqui" ou um botão "Selecionar arquivos". |
136	| **Com Arquivos (Pendente)** | Arquivos selecionados, aguardando clique em "Upload". | Listar os arquivos selecionados com seus nomes, tamanhos e um botão individual para remover ou um botão global para iniciar o upload. |
137	| **Em Progresso** | Upload em andamento, demonstrando o `DssLinearProgress` interno. | Para cada arquivo em upload, exibir o `DssLinearProgress` com a porcentagem atual e um ícone de carregamento. O progresso global também deve ser visível. |
138	| **Concluído (Sucesso)** | Upload finalizado, demonstrando feedback visual de sucesso. | Após o upload bem-sucedido, exibir um ícone de sucesso (e.g., checkmark) e uma mensagem de "Upload Concluído" para cada arquivo. |
139	| **Erro de Validação** | Arquivo rejeitado (ex: tamanho excedido), demonstrando feedback de erro. | Exibir uma mensagem de erro clara (e.g., "Arquivo muito grande", "Tipo de arquivo inválido") e um ícone de erro (e.g., 'x') ao lado do arquivo. |
140	| **Erro de Upload** | Falha na requisição de upload. | Exibir uma mensagem de erro de rede ou servidor e um ícone de erro. Permitir a opção de tentar novamente o upload. |
141	| **Desabilitado** | Componente inteiro desabilitado, incluindo dropzone e botões. | Todos os elementos interativos devem estar visualmente desabilitados e não responder a eventos de mouse ou teclado. |
142	
143	---
144	**Nota para o Chat de Execução:** Este componente exige a reconstrução completa da UI do `QUploader` via slots. Estude a documentação do Quasar sobre os slots `header` e `list` antes de iniciar a implementação. A atenção aos detalhes na implementação dos slots e na gestão de estado é crucial para o sucesso deste componente. Garanta que a experiência do usuário seja fluida e que todos os estados sejam comunicados de forma eficaz, tanto visualmente quanto através de tecnologias assistivas.
