# DSS Observability Signals — v0.1

## Purpose

This document defines the canonical set of observability signals for the DSS (Design System Sansys).

Observability signals represent explicit, structured information emitted by DSS-aware tools to describe, explain and validate how the system is being used.

Signals do not introduce new decisions.
They make existing decisions visible, traceable and auditable.

This document is normative for signal naming, intent and scope, but intentionally non-prescriptive regarding implementation.

---

## Scope

Observability signals apply across all DSS layers, including:
- Tokens
- Components
- Layout and Grid systems
- Accessibility rules
- Governance and versioning

Signals may be:
- descriptive (what is happening)
- explanatory (why it is happening)
- evaluative (whether it complies with DSS rules)

Signals must never be:
- generative
- prescriptive
- mutative

---

## Signal Model

Each observability signal is defined by:

- **Signal Name** — canonical identifier
- **Category** — functional grouping
- **Intent** — what the signal represents
- **Emitted When** — triggering condition
- **Primary Consumers** — tools or agents that interpret the signal
- **Notes** — clarifications, limits or edge cases

---

## Signal Categories

The DSS defines the following high-level signal categories:

1. Token Usage
2. Component Resolution
3. Grid & Layout Compliance
4. Accessibility Validation
5. Governance & Versioning
6. System Integrity

---

## 1. Token Usage Signals

### token_resolution

**Category:** Token Usage  
**Intent:** Describe which token was resolved for a given usage context.  
**Emitted When:** A semantic token is mapped to a concrete value.  
**Primary Consumers:** MCP, documentation tools  

**Notes:**  
Used to explain why a specific color, spacing or typography value was applied.

---

### token_violation

**Category:** Token Usage  
**Intent:** Indicate usage of a value that violates DSS token rules.  
**Emitted When:** A hardcoded or non-approved value is detected.  
**Primary Consumers:** MCP, validators  

**Notes:**  
Does not block execution. Used for visibility and validation.

---

## 2. Component Resolution Signals

### component_variant_resolution

**Category:** Component Resolution  
**Intent:** Explain which component variant was selected and why.  
**Emitted When:** A component resolves size, state, or variant.  
**Primary Consumers:** MCP, Grid Inspector  

---

### component_out_of_contract

**Category:** Component Resolution  
**Intent:** Signal that a component is being used outside its documented contract.  
**Emitted When:** Props, states or combinations violate component rules.  
**Primary Consumers:** MCP  

---

## 3. Grid & Layout Compliance Signals

### grid_compliance_check

**Category:** Grid & Layout Compliance  
**Intent:** Validate alignment with documented grid rules.  
**Emitted When:** Layout is evaluated against column, gutter or container rules.  
**Primary Consumers:** Grid Inspector, MCP  

---

### grid_violation

**Category:** Grid & Layout Compliance  
**Intent:** Indicate structural misalignment or rule violation.  
**Emitted When:** Spacing, alignment or breakpoint rules are broken.  
**Primary Consumers:** Grid Inspector  

---

## 4. Accessibility Validation Signals

### accessibility_contrast_check

**Category:** Accessibility Validation  
**Intent:** Validate contrast ratios against WCAG rules.  
**Emitted When:** Text or interactive elements are evaluated.  
**Primary Consumers:** MCP  

---

### accessibility_interaction_violation

**Category:** Accessibility Validation  
**Intent:** Signal violation of interaction accessibility rules.  
**Emitted When:** Touch targets, focus states or semantics are invalid.  
**Primary Consumers:** MCP  

---

## 5. Governance & Versioning Signals

### dss_version_in_use

**Category:** Governance & Versioning  
**Intent:** Identify which DSS version a system or component uses.  
**Emitted When:** DSS context is initialized.  
**Primary Consumers:** MCP, governance tools  

---

### breaking_change_detected

**Category:** Governance & Versioning  
**Intent:** Indicate that a change may cause backward incompatibility.  
**Emitted When:** Token, component or rule changes affect dependents.  
**Primary Consumers:** MCP  

---

## 6. System Integrity Signals

### observability_gap_detected

**Category:** System Integrity  
**Intent:** Signal that a DSS rule cannot be observed or explained.  
**Emitted When:** Missing metadata, unclear mapping or undocumented behavior exists.  
**Primary Consumers:** MCP, governance reviewers  

---

## Signal Consumption Rules

- Signals are **informational by default**
- Signals may trigger warnings or reports
- Signals must never trigger automatic mutation
- Human review is always required for corrective action

---

## Relationship to Governance

This document operates under the authority of:

→ `Governance/DSS_OBSERVABILITY_BASELINE.md`

In case of conflict, the baseline document takes precedence.

---

## Versioning

- **v0.1** — Initial signal vocabulary definition  
- Future versions may add signals but must not change existing signal semantics without explicit governance approval
