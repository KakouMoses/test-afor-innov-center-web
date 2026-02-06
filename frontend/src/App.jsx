import './App.css'

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Base URL de ton backend
const API_URL = "http://localhost:3000";

export default function App() {
  const [page, setPage] = useState("login"); // login | register | home
  const [token, setToken] = useState(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      {page === "login" && (
        <Login setPage={setPage} setToken={setToken} />
      )}

      {page === "register" && (
        <Register setPage={setPage} />
      )}

      {page === "home" && token && (
        <Home token={token} setPage={setPage} />
      )}
    </div>
  );
}

/* ---------------- LOGIN ---------------- */

function Login({ setPage, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      setToken(res.data.token);
      setPage("home");
    } catch (err) {
      setError("Identifiants incorrects");
    }
  };

  return (
    <Card className="w-full max-w-md bg-gray-900 shadow-xl rounded-2xl">
      <CardContent className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Writing on the Wall
        </h1>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button className="w-full" onClick={handleLogin}>
          Se connecter
        </Button>

        <p className="text-sm text-center text-gray-400">
          Pas encore de compte ?{" "}
          <span
            onClick={() => setPage("register")}
            className="text-blue-400 cursor-pointer"
          >
            S'inscrire
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

/* ---------------- REGISTER ---------------- */

function Register({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/register`, {
        email,
        password,
      });

      setMessage("Compte créé avec succès !");
      setTimeout(() => setPage("login"), 1500);
    } catch (err) {
      setMessage("Erreur lors de l'inscription");
    }
  };

  return (
    <Card className="w-full max-w-md bg-gray-900 shadow-xl rounded-2xl">
      <CardContent className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Inscription</h1>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && (
          <p className="text-sm text-center text-gray-300">{message}</p>
        )}

        <Button className="w-full" onClick={handleRegister}>
          Créer un compte
        </Button>

        <p className="text-sm text-center text-gray-400">
          Déjà inscrit ?{" "}
          <span
            onClick={() => setPage("login")}
            className="text-blue-400 cursor-pointer"
          >
            Se connecter
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

/* ---------------- HOME ---------------- */

function Home({ token, setPage }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(res.data);
    } catch (err) {
      console.error("Erreur récupération posts");
    }
  };

  const addPost = async () => {
    try {
      await axios.post(
        `${API_URL}/posts`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");
      fetchPosts();
    } catch (err) {
      console.error("Erreur ajout post");
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📝 Writing on the Wall</h1>

        <Button
          variant="destructive"
          onClick={() => {
            setPage("login");
          }}
        >
          Déconnexion
        </Button>
      </div>

      {/* Nouveau post */}
      <Card className="bg-gray-900 rounded-2xl">
        <CardContent className="p-4 space-y-3">
          <Input
            placeholder="Écris quelque chose..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button onClick={addPost}>Publier</Button>
        </CardContent>
      </Card>

      {/* Liste des posts */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-900 rounded-2xl shadow-md">
              <CardContent className="p-4">
                <p className="text-gray-200">{post.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

