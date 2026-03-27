export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();
    
    const { email } = data;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Insert ignoring duplicates (in case someone signs up twice)
    const stmt = env.DB.prepare(
      `INSERT OR IGNORE INTO subscribers (email) VALUES (?)`
    ).bind(email);

    await stmt.run();

    return new Response(JSON.stringify({ success: true, message: "Subscribed successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
