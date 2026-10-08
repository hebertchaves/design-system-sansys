import storyboard from './storyboard.json';

export const slideContent = [
  { headline: 'DSS', subtitle: 'Qualidade que se repete.\nEvolução que escala.', kind: 'cover', dark: true, points: ['Sansys Water', 'Sansys Waste', 'Sansys Hub'] },
  { headline: 'Mesma necessidade.\nSoluções diferentes.', subtitle: 'O custo de reinventar o que já existe', kind: 'divergence', points: ['Inconsistência para quem usa', 'Retrabalho para quem constrói', 'Mais esforço para manter'] },
  { headline: 'Ter componentes\nnão basta.', subtitle: 'É preciso preservar o modo de usá-los.', kind: 'compare', points: ['Consultar a fonte oficial', 'Compor dentro dos contratos', 'Conferir o resultado real'] },
  { headline: 'Da experiência\nà regra verificável.', subtitle: 'Aprendizados que protegem as próximas entregas.', kind: 'cycle', dark: true, points: ['Aprendizado', 'Regra', 'Ferramenta', 'Evidência'] },
  { headline: 'Quatro funções.\nUma qualidade compartilhada.', subtitle: 'As ferramentas se complementam ao longo da entrega.', kind: 'four', points: ['Orientar|Guias e MCP', 'Verificar|Validadores e testes', 'Controlar|Pre-commit e gates', 'Preservar|Contratos, registros e revisão'] },
  { headline: 'A IA consulta o DSS\nantes de construir.', subtitle: 'Referência institucional, não padrões genéricos.', kind: 'mcp', points: ['Componentes oficiais', 'Regras de composição', 'Retorno sobre desvios'] },
  { headline: 'Menos versões\nda verdade.', subtitle: 'Cada informação tem um dono.', kind: 'source', points: ['Visual · CSS/SCSS', 'API · tipos', 'Evidências · auditoria'] },
  { headline: 'Uma falha identificada\nantes de seguir.', subtitle: 'A regra precisa de uma verificação utilizável.', kind: 'validation', dark: true, points: ['Proposta', 'Desvio identificado', 'Correção', 'Nova verificação'] },
  { headline: 'Reutilizar estruturas.\nNão apenas peças.', subtitle: 'Adaptar uma base conhecida, em vez de reconstruí-la.', kind: 'patterns', points: ['Estrutura recorrente', 'Variações permitidas', 'Estados e limites explícitos'] },
  { headline: 'Quem decide o quê.', subtitle: 'Intenção e critérios humanos. Execução assistida.', kind: 'roles', points: ['Produto|Necessidade, regras e sucesso', 'UX/UI|Composição, estados e experiência', 'IA + engenharia|Implementação e verificação'] },
  { headline: 'Uma mudança pequena.\nUma evidência clara.', subtitle: 'O fluxo recomendado para criar interfaces.', kind: 'workflow', dark: true, points: ['Definir', 'Localizar', 'Compor', 'Adaptar', 'Validar', 'Revisar'] },
  { headline: 'Atender solicitações.', subtitle: 'Preservar a base. Resolver a tarefa.', kind: 'case', points: ['Estrutura compartilhada', 'Dados, ações e permissões', 'Estados relevantes'] },
  { headline: 'Checagens ajudam.\nJulgamento continua essencial.', subtitle: 'Maturidade inclui conhecer os limites das evidências.', kind: 'limits', points: ['Automação|Regras cobertas', 'Pessoas|Contexto e experiência', 'Uso real|Novas necessidades'] },
  { headline: 'Evoluir com prioridades\ne evidências.', subtitle: 'Governança deve reduzir atrito, não acumular documentos.', kind: 'priorities', points: ['Repertório|Ampliar patterns com base no uso', 'Confiança|Fortalecer verificações e integração', 'Adoção|Medir resultados e ajustar o processo'] },
  { headline: 'Reutilizar o que funciona.\nVerificar o que muda.\nEvoluir com evidências.', subtitle: 'DSS · Uma capacidade estratégica em evolução', kind: 'closing', dark: true, points: ['Produto', 'Design', 'Engenharia'] },
  { headline: 'Ferramentas, por função.', subtitle: 'MCP · Recursos encontrados na implementação', kind: 'tools', points: ['Consulta|query_component · query_token', 'Preparação|validate_pre_prompt · generate_pre_prompt_template · generate_component_scaffold', 'Verificação|validate_component_code · validate_composition · validate_spec_readiness · validate_grid_layout · validate_visual_contract', 'Correção e rastreabilidade|suggest_token_replacement · describe_grid_inspector · record_audit_event'] },
  { headline: 'Camadas de controle\nda mudança.', subtitle: 'Configuração ≠ execução comprovada ≠ bloqueio efetivo', kind: 'controls', points: ['Local|Pre-commit e propagação automática', 'Integração|Estrutura, tokens, API, testes e contratos', 'Revisão|Evidências e julgamento', 'Aceite|Resultado no contexto real'] },
  { headline: 'Fonte única:\ndonos e consumidores.', subtitle: 'O contrato é derivado. Nunca uma nova verdade autorada.', kind: 'owners', points: ['Visual|CSS/SCSS do componente', 'API|types/*.types.ts', 'Prosa normativa|Dss<Nome>.md', 'Auditoria|Registros e selos'] },
  { headline: 'Um briefing que\ndelimita a tarefa.', subtitle: 'Contexto específico para trabalho assistido por IA.', kind: 'brief', dark: true, points: ['Base e versão + tarefa e usuário', 'Estrutura preservada + dados e ações', 'Estados + permissões + exceções', 'Critérios observáveis + evidências'] },
  { headline: 'Medir para evoluir.', subtitle: 'Indicadores propostos · estabelecer primeiro a linha de base', kind: 'metrics', points: ['Reutilização|Patterns oficiais / entregas elegíveis', 'Retrabalho|Correções por divergência do DSS', 'Tempo até aceite|Comparar complexidades semelhantes', 'Falhas que escapam|Desvios após verificações e revisão'] },
] as const;

export const slides = storyboard.map((item, index) => ({ dark: false, ...item, ...slideContent[index] }));

export function readSlideIndex(search: string, total: number) {
  const parsed = Number(new URLSearchParams(search).get('slide') || 1);
  return Math.max(0, Math.min(total - 1, Number.isFinite(parsed) ? Math.floor(parsed) - 1 : 0));
}