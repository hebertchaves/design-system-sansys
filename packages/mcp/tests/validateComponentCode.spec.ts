/**
 * validate_component_code — escopo do Token First e regime de exceções.
 *
 * A tool nasceu sem teste. Os dois ajustes que a trouxeram até aqui (o regime
 * de exceções da Constituição #1 e o escopo por camada) foram medidos rodando
 * o validador contra componentes REAIS — verificação que não sobrevive à
 * próxima edição, porque o componente muda por motivo próprio. Esta fixture
 * congela o comportamento em código que só existe para isso.
 *
 * A fixture é um dssRoot inteiro em miniatura (tests/fixtures/dss-root), não um
 * diretório sob packages/core/components: componente-fantasma ali dentro entra
 * em catálogo, contrato e selo como se fosse produto.
 */

import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { validateComponentCode } from "../src/tools/validateComponentCode.js";

const aqui = dirname(fileURLToPath(import.meta.url));
const DSS_ROOT = resolve(aqui, "fixtures/dss-root");

const resultado = await validateComponentCode("DssScopeProbe", DSS_ROOT);

/** Achados cujo `file` termina no sufixo dado. */
const em = (sufixo: string) =>
  resultado.findings.filter((f) => (f.file ?? "").replace(/\\/g, "/").includes(sufixo));

describe("fixture", () => {
  it("resolve o componente e enxerga as 4 camadas", () => {
    expect(resultado.found).toBe(true);
    expect(resultado.layers.filter((l) => l.present)).toHaveLength(4);
  });

  it("não acusa dss.meta.json ausente nem camada faltando", () => {
    const estruturais = resultado.findings.filter(
      (f) => f.rule === "META_MISSING" || f.rule === "FOUR_LAYER_ARCHITECTURE"
    );
    expect(estruturais).toEqual([]);
  });
});

describe("Token First DENTRO das camadas de estilo", () => {
  it("2-composition: acusa hex cravado como erro e px cravado como warning", () => {
    const achados = em("/2-composition/_base.scss");
    const hex = achados.find((f) => f.severity === "error" && f.rule === "TOKEN_FIRST");
    const px = achados.find((f) => f.severity === "warning" && f.rule === "TOKEN_FIRST");

    expect(hex?.message).toContain("#ff00aa");
    expect(px?.message).toContain("37px");
    expect(achados).toHaveLength(2);
  });

  it("3-variants: fallback de var() e px em @media/@container não são violação", () => {
    // Exceções (a) e (b) da Constituição #1 — o arquivo é conforme de ponta a ponta.
    expect(em("/3-variants/_variant.scss")).toEqual([]);
  });

  it("4-output: cor absoluta dentro de forced-colors não é violação", () => {
    const achados = em("/4-output/_states.scss");
    // A exceção (c) vale para o BLOCO inteiro: `3px solid Highlight`, `#fff` e
    // `#000` estão sob a at-rule e calam juntos.
    expect(achados.filter((f) => /Highlight|#fff|#000/.test(f.message))).toEqual([]);
  });

  it("4-output: a exceção de contraste FECHA com as chaves do bloco", () => {
    // Mesma natureza de linha, fora do bloco: volta a ser violação. Sem isto o
    // teste passaria com uma implementação que simplesmente desliga o arquivo.
    const achados = em("/4-output/_states.scss");
    const depois = achados.find((f) => f.message.includes("#123123"));

    expect(depois?.severity).toBe("error");
    expect(achados).toHaveLength(1);
  });
});

describe("Token First FORA das camadas de estilo", () => {
  it("<style> de example.vue não gera achado de Token First", () => {
    // O escopo é o mesmo que o grep do DoD já define (2-composition, 3-variants,
    // 4-output). Antes disto, `max-width: 1200px` numa página de demo virava
    // warning — relatório gritando em cima de acerto.
    expect(em("DssScopeProbe.example.vue")).toEqual([]);
  });
});

describe("Gate de Composição não é escopado", () => {
  it("acusa :deep() no wrapper, e SÓ o :deep()", () => {
    const achados = em("DssScopeProbe.vue (<style>)");

    // Um achado, não dois: a linha tem `:deep()` E um hex cravado. O hex cala
    // (fora das camadas de estilo); o :deep() não, porque quebrar
    // encapsulamento é errado em qualquer arquivo. É esta assimetria que
    // separa "escopo do Token First" de "isenção do arquivo inteiro".
    expect(achados).toHaveLength(1);
    expect(achados[0].rule).toBe("GATE_COMPOSICAO_V2.4");
    expect(achados[0].severity).toBe("error");
  });
});
