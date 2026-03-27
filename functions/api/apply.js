export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();
    
    const { name, email, githubUrl, socialUrl, description, type } = data;

    if (!name || !email || !type) {
      return new Response(JSON.stringify({ error: "Name, email, and type are required" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const stmt = env.DB.prepare(
      `INSERT INTO applications (type, name, email, github_url, social_url, description) 
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      type, 
      name, 
      email, 
      githubUrl || null, 
      socialUrl || null, 
      description || null
    );

    await stmt.run();

    return new Response(JSON.stringify({ success: true, message: "Application submitted successfully" }), {
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
