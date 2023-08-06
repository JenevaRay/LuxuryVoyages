const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#emailInput").value.trim();
  const password = document.querySelector("#passwordInput").value.trim();
  if (username && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const action = async () => {
    const username = document.querySelector("#signupEmail").value.trim();
    const password = document.querySelector("#signupPassword").value.trim();
    const passverif = document.querySelector("#verifyPassword").value.trim();
    try {
      if (username && password && passverif && password === passverif) {
        const response = await fetch("/api/user/new", {
          method: "POST",
          body: JSON.stringify({ username, password, passverif }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          document.location.replace("/");
        } else {
          alert("Failed to sign up.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  void action();
};

let newUserForm = document.getElementById("account-create");
if (newUserForm) {
  document
    .getElementById("submit")
    .addEventListener("click", signupFormHandler);
}
let loginForm = document.getElementById("account-login");
if (loginForm) {
  document.getElementById("submit").addEventListener("click", loginFormHandler);
}
