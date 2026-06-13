# DSS Observability Baseline — v0.1

> **Status:** Active (Phase 1)
>
> **Scope:** Observability only (no validation, no decision-making)
>
> **Audience:** Humans, MCPs, Tools consuming DSS

---

## 1. Purpose

This document defines the **baseline rules for observability** within the DSS ecosystem.

Its purpose is to ensure that any usage of the DSS can be:
- **Seen** (observable)
- **Explained** (narrated)
- **Traced** (reconstructed over time)

This baseline does **not** define validation rules, scoring systems, or automated decisions.

> Observability answers **“what happened and why”**, never **“is this right or wrong”**.

---

## 2. Phase Declaration

The DSS is currently in **Phase 1 — Component Foundation**.

Implications:
- Tokens, grid, spacing, and architecture are mature
- Components are still being created and exercised
- Decisions are intentionally conservative

Observability in this phase must:
- Be lightweight
- Be explicit
- Avoid speculative or predictive logic

---

## 3. Observability Principles

### 3.1 Facts Over Judgement

Only **facts and direct causes** may be observed.

Allowed:
- "Token X was resolved because condition Y"
- "Grid configuration Z was selected by user action"

Not allowed:
- "This is bad"
- "This should be avoided"
- "This will break in the future"

---

### 3.2 Explicit Causality

Every observed event **must include a reason**.

Reason strings must:
- Be human-readable
- Reference DSS concepts (tokens, layers, grid, states)
- Avoid implementation details

---

### 3.3 Tool-Agnostic Language

Observability language must not depend on:
- UI structure
- Framework (React, Vue, etc.)
- Specific tools (Grid Inspector, Figma, IDE)

Any tool may emit DSS events **as long as it respects this baseline**.

---

### 3.4 No Silent Inference

If a reason cannot be clearly stated, the event **must not be emitted**.

Silence is preferred over ambiguous explanation.

---

## 4. Event Taxonomy (Phase 1)

The following event categories are allowed in Phase 1.

### 4.1 Token Resolution Events

Used when a DSS token is selected or applied.

**Event:** `DSS_TOKEN_RESOLVED`

Required fields:
- tokenName
- tokenCategory (color, spacing, elevation, etc.)
- semanticRole
- reason

---

### 4.2 Grid Configuration Events

Used when a grid-related configuration is selected or changed.

**Event:** `DSS_GRID_CONFIGURATION_SELECTED`

Required fields:
- gridType
- columnCount
- containerType
- breakpoint
- reason

---

### 4.3 Layer Interaction Events

Used when a DSS architectural layer is involved in a decision.

**Event:** `DSS_LAYER_INTERACTION`

Required fields:
- layer
- context
- reason

---

### 4.4 Violation Observation Events

Used to **record** a detected deviation without judging it.

**Event:** `DSS_POTENTIAL_VIOLATION_OBSERVED`

Required fields:
- ruleReference
- context
- reason

> Note: This event does not imply invalidity. Validation is handled in a later phase.

---

## 5. Reason String Guidelines

A reason string must answer:
- What happened?
- Which DSS concept was involved?
- Why was this choice made?

### Example

> "Token --dss-spacing-4 was resolved because the component requires medium vertical rhythm according to spacing scale rules."

---

## 6. What Is Explicitly Out of Scope (Phase 1)

The following are **not allowed** in this phase:

- Scoring systems
- Warnings or errors
- Automated fixes
- Predictive analysis
- Cross-component impact analysis
- Version migration logic

These capabilities depend on future layers of the MCP architecture.

---

## 7. Relationship With MCP

In Phase 1, the MCP acts strictly as:

> **A technical narrator of observed DSS events**

The MCP:
- Reads events
- Aggregates context
- Explains sequences

The MCP does **not**:
- Validate correctness
- Suggest alternatives
- Modify code or design

---

## 8. Relationship With Tools

### Grid Inspector
- Acts as a primary sensor
- Emits DSS events
- Does not interpret validity

### Documentation Systems (Lovable)
- May consume events for illustration
- Must not infer new rules

### Component Creation Tools
- May use event language
- Must not emit speculative events

---

## 9. Evolution Rules

Changes to this baseline:
- Must be explicit
- Must declare phase impact
- Must not retroactively reinterpret past events

Versioning must be semantic and conservative.

---

## 10. Closing Statement

This baseline exists to ensure that **all DSS consumers share a common observable reality**.

Before the DSS can judge or create, it must first **be understood**.

> Observability precedes authority.

