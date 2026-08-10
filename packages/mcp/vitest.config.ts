import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "mcp",
    environment: "node",
    // Só `*.spec.ts`. O `tests/validateGridLayout.test.ts` é anterior a este
    // runner: um script de console que se autoexecuta no import e imprime em
    // vez de asserir — sob vitest ele falharia por não declarar suíte alguma.
    // Ficou de fora DELIBERADAMENTE, não por esquecimento; convertê-lo (ou
    // aposentá-lo) é trabalho à parte, com critério próprio.
    include: ["tests/**/*.spec.ts"],
  },
});
