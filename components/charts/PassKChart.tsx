import { LineChart } from "./LineChart";

const P = 0.7;
const KS = [1, 2, 3, 4, 5];
const K_MAX = KS[KS.length - 1];

const passAtK = (k: number) => 1 - Math.pow(1 - P, k);
const passHatK = (k: number) => Math.pow(P, k);
const percent = (v: number) => `${Math.round(v * 100)} %`;

/** Why the harness measures pass^k: the same agent, two very different stories. */
export function PassKChart() {
  return (
    <div className="@container">
      <div className="grid items-center gap-x-10 gap-y-6 @3xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <LineChart
          title="Chance of passing, for an agent that succeeds 70 % of the time"
          subtitle="Illustration (p = 0.7), not production results"
          xLabels={KS.map((k) => `k = ${k}`)}
          series={[
            { name: "pass@k, at least one success", values: KS.map(passAtK) },
            {
              name: "pass^k, all succeed",
              values: KS.map(passHatK),
              highlight: true,
            },
          ]}
        />

        <div className="grid gap-4 text-sm">
          <dl className="grid gap-4">
            <div>
              <dt className="font-mono text-[0.8125rem] font-medium">pass@k</dt>
              <dd className="mt-0.5 text-ink-2">
                At least one of k runs passes. It climbs fast: {percent(passAtK(K_MAX))} at k = {K_MAX}. That is what a
                demo shows.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.8125rem] font-medium text-ball-text">pass^k</dt>
              <dd className="mt-0.5 text-ink-2">
                All k runs pass. It falls just as fast: {percent(passHatK(K_MAX))} at k = {K_MAX}. That is what a
                policyholder who asks again expects.
              </dd>
            </div>
          </dl>
          <p className="meta text-[0.6875rem]">The harness runs each situation k times and reports both, per use case.</p>
        </div>
      </div>
    </div>
  );
}
