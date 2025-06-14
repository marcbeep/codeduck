import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "CodeDuck Problem";
  const difficulty = searchParams.get("difficulty") || "Medium";
  const category = searchParams.get("category") || "Algorithms";

  // Simple HTML-based Open Graph image
  const html = `
    <div style="
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: white;
      position: relative;
    ">
      <div style="
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-width: 800px;
      ">
        <div style="
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          opacity: 0.9;
        ">
          🦆 CodeDuck
        </div>
        <h1 style="
          font-size: 48px;
          font-weight: 700;
          margin: 0 0 30px 0;
          line-height: 1.2;
        ">
          ${title}
        </h1>
        <div style="
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          font-weight: 500;
        ">
          <span style="
            background: ${
              difficulty === "Easy"
                ? "#10b981"
                : difficulty === "Hard"
                ? "#ef4444"
                : "#f59e0b"
            };
            padding: 8px 16px;
            border-radius: 12px;
          ">
            ${difficulty}
          </span>
          <span style="opacity: 0.7;">•</span>
          <span style="opacity: 0.9;">${category}</span>
        </div>
      </div>
    </div>
  `;

  // For a simple implementation, return a basic response
  // In a production app, you'd want to use @vercel/og or similar
  return new Response(
    JSON.stringify({
      message: "Open Graph image endpoint",
      title,
      difficulty,
      category,
      html,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
