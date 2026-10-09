import { describe, it, expect } from 'vitest'
import { CHECKS, makeRows, verdict, counts, isStale } from '../../../src/patterns/nfag/checkin-model.js'
describe('NFAg revision 02 business rules',()=>{
 it('has exactly eleven checks including reading integration',()=>{expect(CHECKS).toHaveLength(11);expect(CHECKS[10].destination).toBe('Parametrização Sistema › Configuração da API de Leitura NFAg')})
 it('blocking integration failure makes environment not apt',()=>{const rows=makeRows('apt');rows[10].status='failure';rows[10].blocking=true;expect(verdict(rows)).toBe('Não apto para emissão')})
 it('no failures or alerts makes environment apt',()=>expect(verdict(makeRows('apt'))).toBe('Apto para emissão'))
 it('nonblocking failures remain apt with alerts',()=>{const rows=makeRows('apt');rows[6].status='failure';rows[6].blocking=false;expect(verdict(rows)).toBe('Apto com alertas')})
 it('incomplete verification counts as an alert and does not block',()=>{const rows=makeRows('timeout');expect(counts(rows).warning).toBe(1);expect(verdict(rows)).toBe('Apto com alertas')})
 it('results expire after 24 hours, not at the boundary',()=>{expect(isStale(0,86400000)).toBe(false);expect(isStale(0,86400001)).toBe(true)})
 it('monitored changes invalidate even recent results',()=>expect(isStale(1000,1001,true)).toBe(true))
})
