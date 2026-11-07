import { useState } from "react";
import "./App.css";

const recipes = [
  {
    name: "Classic Pancakes",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    description: "Soft and fluffy pancakes perfect for breakfast.",
    ingredients: "Flour, Milk, Eggs, Sugar, Baking Powder and Butter.",
    preparation: "Mix flour, sugar and baking powder. Add milk and eggs. Heat a pan with butter. Pour the batter and cook both sides until golden brown."
  },
  {
    name: "Chicken Curry",
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    description: "Delicious spicy chicken curry.",
    ingredients: "Chicken, Onion, Tomato, Ginger, Garlic and Spices.",
    preparation: "Cook onion, ginger and garlic. Add tomatoes and spices. Add chicken and cook until tender."
  },
  {
    name: "Chocolate Cake",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    description: "Rich and soft chocolate cake.",
    ingredients: "Flour, Cocoa Powder, Sugar, Eggs, Milk and Butter.",
    preparation: "Mix all ingredients into a smooth batter. Pour into a cake pan and bake until cooked."
  },
  {
    name: "Fruit Salad",
    category: "Healthy",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea",
    description: "Fresh and healthy mixed fruit salad.",
    ingredients: "Apple, Banana, Orange, Grapes and Pomegranate.",
    preparation: "Wash and cut all fruits. Mix them together and serve fresh."
  },
  {
    name: "Vegetable Pizza",
    category: "Main Dish",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    description: "Cheesy vegetable pizza for dinner.",
    ingredients: "Pizza Base, Tomato Sauce, Cheese, Onion, Capsicum and Tomato.",
    preparation: "Add sauce, vegetables and cheese to the pizza base. Bake until cheese melts."
  },
  {
    name: "Garlic Bread",
    category: "Sides",
    image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f",
    description: "Crispy garlic bread with butter.",
    ingredients: "Bread, Garlic, Butter, Cheese and Herbs.",
    preparation: "Mix garlic with butter and herbs. Spread on bread and bake until crispy."
  },
  {
    name: "Tomato Soup",
    category: "Soups",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    description: "Warm and delicious tomato soup.",
    ingredients: "Tomatoes, Onion, Garlic, Pepper and Salt.",
    preparation: "Cook tomatoes, onion and garlic. Blend and boil with salt and pepper."
  },
  {
    name: "Slow Cooker Chicken",
    category: "Slow Cooker",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b",
    description: "Tender chicken prepared in a slow cooker.",
    ingredients: "Chicken, Onion, Garlic, Tomato and Spices.",
    preparation: "Add all ingredients to a slow cooker. Cook until the chicken becomes tender."
  },
  {
    name: "Vegetable Appetizer",
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    description: "Tasty vegetable appetizer.",
    ingredients: "Vegetables, Flour, Spices and Oil.",
    preparation: "Mix vegetables with flour and spices. Shape into small pieces and cook until golden."
  }
];

const categories = [
  "Appetizers", "Breakfast", "Chicken", "Dessert",
  "Healthy", "Main Dish", "Sides", "Slow Cooker", "Soups"
];

function App() {
  const [page, setPage] = useState("login");
  const [signupMode, setSignupMode] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [email, setEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [search, setSearch] = useState("");

  const [pageTitle, setPageTitle] = useState("Delicious Recipes");
  const [sectionTitle, setSectionTitle] = useState("Latest Recipes");
  const [visibleRecipes, setVisibleRecipes] = useState(recipes);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [message, setMessage] = useState("");

  function signup() {
    if (!signupUsername || !email || !signupPassword || !confirmPassword) {
      setSignupError("Please fill all fields");
      return;
    }

    if (signupPassword !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    localStorage.setItem("recipeUsername", signupUsername);
    localStorage.setItem("recipePassword", signupPassword);

    alert("Sign Up successful! Please login.");

    setSignupUsername("");
    setEmail("");
    setSignupPassword("");
    setConfirmPassword("");
    setSignupError("");
    setSignupMode(false);
  }

  function login() {
    const savedUsername = localStorage.getItem("recipeUsername");
    const savedPassword = localStorage.getItem("recipePassword");

    if (!username || !password) {
      setError("Please enter username and password");
    } else if (savedUsername === null) {
      setError("Please sign up first");
    } else if (
      username === savedUsername &&
      password === savedPassword
    ) {
      setError("");
      setPage("recipes");
      showAll();
    } else {
      setError("Invalid username or password");
    }
  }

  function logout() {
    setPage("login");
    setUsername("");
    setPassword("");
    setSelectedRecipe(null);
  }

  function showAll() {
    setPageTitle("Delicious Recipes");
    setSectionTitle("Latest Recipes");
    setVisibleRecipes(recipes);
    setMessage("");
    setSearch("");
  }

  function filterCategory(category) {
    setPageTitle(category + " Recipes");
    setSectionTitle(category + " Recipes");

    setVisibleRecipes(
      recipes.filter(recipe => recipe.category === category)
    );

    setMessage("");
    setSearch("");
  }

  function searchRecipe(value = search) {
    setSectionTitle("Search Results");

    setVisibleRecipes(
      recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(value.toLowerCase())
      )
    );

    setMessage("");
  }

  function showMessage(name) {
    setPageTitle(name);
    setSectionTitle(name);
    setVisibleRecipes([]);
    setMessage(name + " section coming soon.");
  }

  if (page === "login") {
    return (
      <div className="login-page">
        <div className="login-box">

          <h1>Recipe Haven</h1>

          <h2>{signupMode ? "Sign Up" : "Login"}</h2>

          {signupMode ? (
            <>
              <input
                value={signupUsername}
                onChange={e => setSignupUsername(e.target.value)}
                placeholder="Create Username"
              />

              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
              />

              <input
                type="password"
                value={signupPassword}
                onChange={e => setSignupPassword(e.target.value)}
                placeholder="Create Password"
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />

              <button onClick={signup}>SIGN UP</button>

              <p className="error">{signupError}</p>

              <div className="switch">
                Already have an account?
                <span onClick={() => setSignupMode(false)}>
                  Login
                </span>
              </div>
            </>
          ) : (
            <>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
              />

              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
              />

              <button onClick={login}>LOGIN</button>

              <p className="error">{error}</p>

              <div className="switch">
                Don't have an account?
                <span onClick={() => setSignupMode(true)}>
                  Sign Up
                </span>
              </div>
            </>
          )}

        </div>
      </div>
    );
  }

  return (
    <>
      <header>
        <div className="logo">Recipe Haven</div>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </header>

      <div className="layout">

        <aside className="sidebar">

          <button onClick={showAll}>HOME</button>

          <div className="recipes-title">RECIPES</div>

          {categories.map(category => (
            <button
              key={category}
              onClick={() => filterCategory(category)}
            >
              {category.toUpperCase()}
            </button>
          ))}

          {["Videos", "About", "Subscribe", "Contact"].map(item => (
            <button key={item} onClick={() => showMessage(item)}>
              {item.toUpperCase()}
            </button>
          ))}

        </aside>

        <main className="content">

          <section className="hero">
            <h1>{pageTitle}</h1>
            <p>Simple recipes for every occasion</p>
          </section>

          <div className="search-area">
            <input
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                searchRecipe(e.target.value);
              }}
              placeholder="Find a recipe..."
            />

            <button onClick={() => searchRecipe()}>
              Search
            </button>
          </div>

          <section className="recipe-section">

            <h2>{sectionTitle}</h2>

            {message ? (
              <p className="empty-message">{message}</p>
            ) : (
              <div className="recipes-grid">

                {visibleRecipes.map(recipe => (
                  <div
                    className="card"
                    key={recipe.name}
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <img src={recipe.image} alt={recipe.name} />

                    <div className="card-content">
                      <div className="category">
                        {recipe.category}
                      </div>

                      <h3>{recipe.name}</h3>
                      <p>{recipe.description}</p>
                    </div>
                  </div>
                ))}

                {visibleRecipes.length === 0 && (
                  <p className="empty-message">No recipes found.</p>
                )}

              </div>
            )}

          </section>

          <footer>
            © 2026 Recipe Haven | Recipe Management System
          </footer>

        </main>
      </div>

      {selectedRecipe && (
        <div className="details">

          <button
            className="close"
            onClick={() => setSelectedRecipe(null)}
          >
            ✕ Close
          </button>

          <div className="details-container">

            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
            />

            <h1>{selectedRecipe.name}</h1>

            <p className="detail-category">
              Category: {selectedRecipe.category}
            </p>

            <h2>Ingredients</h2>
            <p>{selectedRecipe.ingredients}</p>

            <h2>Preparation</h2>
            <p>{selectedRecipe.preparation}</p>

          </div>
        </div>
      )}
    </>
  );
}

export default App;
