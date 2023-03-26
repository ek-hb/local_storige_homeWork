class User {
  constructor(firstName, lastName, date, email, password, confirmPassword) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.date = date;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  register() {
    const errors = this.validate();

    const previousValues = {
      firstName: this.firstName,
      lastName: this.lastName,
      date: this.date,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);

        const inputElement = error.inputElement;
        const errorMessage = error.message;
        inputElement.value = errorMessage;
        inputElement.classList.add("input-error");

        // Додавання попереднього значення до введених даних
        inputElement.addEventListener("mouseover", () => {
          inputElement.value = previousValues[inputElement.id];
          inputElement.style.background = "white";
          inputElement.style.color = "black";
        });
        // inputElement.addEventListener("mouseout", () => {
        //   inputElement.value = errorMessage;
        // });
      });
      return;
    }

    localStorage.setItem(this.email, JSON.stringify(this));
    alert("Успішна реєстрація");
  }

  validate() {
    //розрахунок дати -10 років
    const errors = [];
    function subtractYears(date, years) {
      date.setFullYear(date.getFullYear() - years);
      return date;
    }
    let currentDate = new Date();
    let tenYears = subtractYears(currentDate, 10);
    console.log(tenYears);

    if (new Date(this.date) >= tenYears) {
      errors.push({
        inputElement: document.getElementById("date"),
        a: (document.getElementById("date").type = "text"),
        message: "введіть коректну дату",
      });
    }

    if (this.firstName.trim().length < 1) {
      errors.push({
        inputElement: document.getElementById("firstName"),
        message: "Ім'я повинно містити хоча б один символ",
      });
    }

    if (this.lastName.trim().length === 0) {
      errors.push({
        inputElement: document.getElementById("lastName"),
        message: "Прізвище є обов'язковим полем",
      });
    }

    if (!this.validateEmail()) {
      errors.push({
        inputElement: document.getElementById("email"),
        message: "Невірний формат електронної пошти",
      });
    }

    if (this.password.length < 8) {
      errors.push({
        inputElement: document.getElementById("password"),
        b: (document.getElementById("password").type = "text"),
        message: "не коректний пароль",
      });
    }

    if (this.password !== this.confirmPassword) {
      errors.push({
        inputElement: document.getElementById("confirmPassword"),
        c: (document.getElementById("confirmPassword").type = "text"),
        message: "паролі не співпадають",
      });
    }

    return errors;
  }

  validateEmail() {
    const re = /\S+@\S+.\S+/;
    return re.test(this.email);
  }
}

const form = document.querySelector(".wrapper");
const loginForm = document.querySelector(".wrapperForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const date = document.getElementById("date").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const user = new User(
    firstName,
    lastName,
    date,
    email,
    password,
    confirmPassword
  );
  user.register();
});

const loginBtn = document.getElementById("logIn_btn");
loginBtn.addEventListener("click", () => {
  alert("Увійшли успішно!");
});

const registerBtn = document.getElementById("register_Btn");
registerBtn.addEventListener("click", () => {
  form.style.display = "none";
  loginForm.style.display = "block";
});
