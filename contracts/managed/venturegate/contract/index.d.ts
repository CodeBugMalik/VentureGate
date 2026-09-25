import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  verify_and_register_investor(context: __compactRuntime.CircuitContext<PS>,
                               net_worth_0: bigint,
                               income_0: bigint,
                               joint_income_0: bigint,
                               qp_capital_0: bigint,
                               selected_pathway_0: bigint,
                               investor_commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  verify_accreditation(context: __compactRuntime.CircuitContext<PS>,
                       net_worth_0: bigint,
                       income_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  update_criteria(context: __compactRuntime.CircuitContext<PS>,
                  admin_sk_0: Uint8Array,
                  new_min_net_worth_0: bigint,
                  new_min_income_0: bigint,
                  new_min_joint_income_0: bigint,
                  new_min_qp_capital_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  set_paused(context: __compactRuntime.CircuitContext<PS>,
             admin_sk_0: Uint8Array,
             pause_state_0: boolean): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  verify_and_register_investor(context: __compactRuntime.CircuitContext<PS>,
                               net_worth_0: bigint,
                               income_0: bigint,
                               joint_income_0: bigint,
                               qp_capital_0: bigint,
                               selected_pathway_0: bigint,
                               investor_commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  verify_accreditation(context: __compactRuntime.CircuitContext<PS>,
                       net_worth_0: bigint,
                       income_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  update_criteria(context: __compactRuntime.CircuitContext<PS>,
                  admin_sk_0: Uint8Array,
                  new_min_net_worth_0: bigint,
                  new_min_income_0: bigint,
                  new_min_joint_income_0: bigint,
                  new_min_qp_capital_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  set_paused(context: __compactRuntime.CircuitContext<PS>,
             admin_sk_0: Uint8Array,
             pause_state_0: boolean): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  verify_and_register_investor(context: __compactRuntime.CircuitContext<PS>,
                               net_worth_0: bigint,
                               income_0: bigint,
                               joint_income_0: bigint,
                               qp_capital_0: bigint,
                               selected_pathway_0: bigint,
                               investor_commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  verify_accreditation(context: __compactRuntime.CircuitContext<PS>,
                       net_worth_0: bigint,
                       income_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  update_criteria(context: __compactRuntime.CircuitContext<PS>,
                  admin_sk_0: Uint8Array,
                  new_min_net_worth_0: bigint,
                  new_min_income_0: bigint,
                  new_min_joint_income_0: bigint,
                  new_min_qp_capital_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  set_paused(context: __compactRuntime.CircuitContext<PS>,
             admin_sk_0: Uint8Array,
             pause_state_0: boolean): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly min_net_worth: bigint;
  readonly min_income: bigint;
  readonly min_joint_income: bigint;
  readonly min_qp_capital: bigint;
  readonly verified_investors_count: bigint;
  attestation_registry: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  readonly admin_public_key: Uint8Array;
  readonly protocol_version: bigint;
  readonly is_paused: boolean;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               initial_min_net_worth_0: bigint,
               initial_min_income_0: bigint,
               initial_min_joint_income_0: bigint,
               initial_min_qp_capital_0: bigint,
               admin_pk_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
