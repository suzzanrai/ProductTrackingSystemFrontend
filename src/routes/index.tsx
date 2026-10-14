import { createFileRoute } from "@tanstack/react-router";
import { env } from "@shared/config";

export const Route = createFileRoute("/")({
  component: TestPage,
});

const swatches = [
  "bg-primary text-white",
  "bg-primary-dark text-white",
  "bg-primary-light text-primary",
  "bg-accent text-accent-text",
  "bg-draft-bg text-draft-text",
  "bg-info-bg text-info-text",
  "bg-success-bg text-success-text",
  "bg-warning-bg text-warning-text",
  "bg-danger-bg text-danger-text",
];

function TestPage() {
  return (
    <div className="mx-auto max-w-content p-6">
      <h1 className="text-title font-semibold">{env.appName}</h1>
      <p className="text-body text-text-muted">
        Design test page. If you can see colors below, the setup works.
      </p>

      <p className="mt-4 text-heading font-semibold">
        नमस्ते, यो नेपाली फन्ट परीक्षण हो
      </p>
      <p className="text-small font-medium">Small text, weight 500</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {swatches.map((classes) => (
          <div
            key={classes}
            className={`rounded-card border p-4 text-small font-medium ${classes}`}
          >
            {classes}
          </div>
        ))}
      </div>

      <button className="mt-6 h-control rounded-control bg-primary px-6 text-body font-medium text-white hover:bg-primary-dark">
        Primary button
      </button>
    </div>
  );
}