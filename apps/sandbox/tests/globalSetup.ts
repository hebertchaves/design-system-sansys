/**
 * Playwright global setup — pre-aquece o Vite antes dos testes paralelos.
 * Garante que a compilação SCSS inicial (pesada com @use module system) esteja
 * concluída antes que os workers comecem a navegar para a página.
 */
export default async function globalSetup() {
  const url = 'http://localhost:5173'
  const maxAttempts = 20
  const delayMs = 2000

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) })
      if (res.ok) {
        // Aguarda compilação SCSS/JS completa (Vite lazy-compila na 1ª requisição)
        await new Promise(r => setTimeout(r, 12000))
        return
      }
    } catch {
      // servidor ainda não está pronto
    }
    await new Promise(r => setTimeout(r, delayMs))
  }
}
