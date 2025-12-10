import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.get("/api/searches", async (req, res) => {
    const { data, error } = await supabase
        .from("searches")
        .select("*")
        .order("id", { ascending: false })
        .limit(10);

    if (error) return res.status(400).json({ error });

    res.json({ searches: data });
});

app.post("/api/searches", async (req, res) => {
    const { country } = req.body;

    const { data, error } = await supabase
        .from("searches")
        .insert([{ country }])
        .select();

    if (error) return res.status(400).json({ error });

    res.json({ inserted: data });
});


export default app;
