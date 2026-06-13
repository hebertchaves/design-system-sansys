# DSS Observability Actors — v0.1

## Purpose

This document defines the official observability actors within the DSS (Design System Sansys) ecosystem.

Observability actors are tools or agents authorized to emit, interpret and consume DSS observability signals, according to explicitly defined roles and limits.

This document exists to:
- clarify responsibilities
- prevent role overlap
- enforce governance boundaries
- enable safe evolution of tooling and automation

---

## Scope

This document applies to all tools that interact with the DSS in an observability capacity, including but not limited to:
- Grid Inspector
- MCP
- Design and development tooling
- Documentation and audit systems

It does not define implementation details, interfaces or technical protocols.

---

## Actor Model

Each observability actor is defined by:
- **Actor Name**
- **Primary Role**
- **Capabilities**
- **Explicit Limits**
- **Signals Emitted**
- **Signals Consumed**

Actors may evolve over time, but role changes require governance review.

---

## Core Observability Actors

### 1. Grid Inspector

**Primary Role:**  
Structural and layout narrator.

**Description:**  
Grid Inspector is a DSS-aware tool focused on making layout, grid and structural decisions visible and explainable.

It observes how grid rules, spacing, containers and breakpoints are applied in practice.

**Capabilities:**
- Evaluate grid and layout compliance
- Narrate structural alignment decisions
- Visualize layout rules and overlays
- Emit grid-related observability signals

**Explicit Limits:**
- Does not define or change DSS rules
- Does not generate components or layouts
- Does not mutate tokens or configurations

**Signals Emitted:**
- grid_compliance_check
- grid_violation

**Signals Consumed:**
- token_resolution
- dss_version_in_use

---

### 2. MCP (Model Context Processor)

**Primary Role:**  
Semantic interpreter and architectural validator.

**Description:**  
MCP acts as the semantic layer between DSS governance and DSS-aware tools.

It interprets observability signals, explains architectural decisions and validates DSS compliance based on documented rules.

**Capabilities:**
- Answer DSS-related technical and architectural questions
- Interpret observability signals
- Validate compliance with tokens, components and governance
- Detect risks, violations and breaking changes

**Explicit Limits:**
- Does not generate design decisions autonomously
- Does not modify code, tokens or components
- Does not override DSS documentation
- Does not act without explicit human prompt

**Signals Emitted:**
- token_violation
- component_out_of_contract
- accessibility_interaction_violation
- breaking_change_detected
- observability_gap_detected

**Signals Consumed:**
- All defined DSS observability signals

---

## Supporting Actors

### 3. Documentation Systems

**Primary Role:**  
Living documentation and reporting.

**Description:**  
Documentation systems consume observability signals to reflect real DSS usage, coverage and evolution over time.

**Capabilities:**
- Generate usage reports
- Surface common patterns and violations
- Track adoption and migration

**Explicit Limits:**
- Do not validate or enforce rules
- Do not generate signals independently

**Signals Consumed:**
- token_resolution
- component_variant_resolution
- dss_version_in_use

---

### 4. Design & Development Tools

**Primary Role:**  
Signal producers.

**Description:**  
Design and development tools may emit observability signals when instrumented to do so, but do not interpret them semantically.

**Capabilities:**
- Emit raw usage signals
- Provide contextual metadata

**Explicit Limits:**
- Do not interpret DSS rules
- Do not validate compliance independently
- Do not enforce governance

**Signals Emitted:**
- token_resolution
- component_variant_resolution

**Signals Consumed:**
- None

---

## Actor Interaction Rules

- Actors must operate strictly within their defined roles
- No actor may assume another actor’s responsibilities
- Signals may be emitted by multiple actors, but interpretation authority is centralized
- Governance decisions always supersede actor behavior

---

## Governance Reference

This document operates under the authority of:

→ `Governance/DSS_OBSERVABILITY_BASELINE.md`

Actor definitions, roles and limits must remain consistent with the baseline principles.

---

## Versioning

- **v0.1** — Initial observability actor definitions  
- Future versions may introduce new actors or extend capabilities, but must not remove or redefine existing roles without explicit governance approval
