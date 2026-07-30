"use client";

import type {
  ProtocolCareModule,
  ProtocolFlowNode,
  ProviderLevel,
} from "../../lib/protocols/structured-content";
import ProviderLevelSelector, {
  clinicalLevelsFor,
  useProviderLevel,
} from "../provider/ProviderLevelSelector";
import { CareLevelModules, ProtocolQuickFlow } from "./ProtocolQuickFlow";

export default function ProviderProtocolView({
  nodes,
  modules,
}: {
  nodes: ProtocolFlowNode[];
  modules: ProtocolCareModule[];
}) {
  const { providerLevel, setProviderLevel } = useProviderLevel();
  const visibleLevels: ProviderLevel[] = [
    ...clinicalLevelsFor(providerLevel),
    "Medical Control",
  ];

  return (
    <div className="space-y-6">
      <ProviderLevelSelector
        value={providerLevel}
        onChange={setProviderLevel}
      />
      {nodes.length ? (
        <ProtocolQuickFlow
          nodes={nodes}
          visibleLevels={visibleLevels}
        />
      ) : null}
      {modules.length ? (
        <CareLevelModules
          modules={modules}
          visibleLevels={visibleLevels}
        />
      ) : null}
    </div>
  );
}
