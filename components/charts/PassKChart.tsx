import { LineChart } from "./LineChart";

const P = 0.7;
const KS = [1, 2, 3, 4, 5];

/** Why the harness measures pass^k: the same agent, two very different stories. */
export function PassKChart() {
  return (
    <LineChart
      title="Chance of passing, for an agent that succeeds 70 % of the time"
      subtitle="Illustration (p = 0.7), not production results"
      xLabels={KS.map((k) => `k = ${k}`)}
      series={[
        { name: "pass@k, at least one success", values: KS.map((k) => 1 - Math.pow(1 - P, k)) },
        { name: "pass^k, all succeed", values: KS.map((k) => Math.pow(P, k)), highlight: true },
      ]}
    />
  );
}
