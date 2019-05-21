<template>
  <div class="signup">
    <sui-segment class="signup-card text-center">
      <h1 class="mb-3">Sign up for BizChat</h1>

      <p class="mb-5">
        Already have an account?
        <router-link to="/login" id="login-link">Login</router-link>
      </p>

      <sui-form @submit.prevent="handleSubmit">
        <sui-form-field>
          <sui-input
            v-model="user.displayName"
            placeholder="Display Name"
            icon="user"
            type="text"
            name="displayName"
          />
        </sui-form-field>
        <sui-form-field>
          <sui-input
            v-model="user.email"
            placeholder="Email"
            icon="mail"
            type="email"
            name="email"
          />
        </sui-form-field>
        <sui-form-field>
          <sui-input
            v-model="user.password"
            placeholder="Password"
            icon="lock"
            type="password"
            name="password"
          />
        </sui-form-field>
        <sui-form-field>
          <sui-input
            v-model="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            name="verifyPassword"
          />
        </sui-form-field>
        <sui-button type="submit" fluid>SUBMIT</sui-button>
      </sui-form>

      <p class="mt-3">OR</p>
      <sui-button class="google-btn" @click="googleSignIn" fluid>SIGN UP WITH GOOGLE</sui-button>
    </sui-segment>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data: () => ({
    user: {
      displayName: "",
      email: "",
      password: ""
    },
    confirmPassword: ""
  }),
  computed: {
    passwordConfirm() {
      return this.user.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    }
  },
  methods: {
    handleSubmit() {
      if (this.isFormValid()) {
        this.$store.dispatch("auth/signUpWithEmail", this.user);
      }
    },
    googleSignIn() {
      this.$store.dispatch("auth/googleAuth");
    },
    isFormValid() {
      if (this.isFormEmpty(this.user, this.confirmPassword)) {
        console.log("Please fill in all fields");
        return false;
      } else {
        return true;
      }
    },
    isFormEmpty({ displayName, email, password }, confirmPassword) {
      return (
        !displayName.length ||
        !email.length ||
        !password.length ||
        !confirmPassword.length
      );
    },
    isPasswordValid({ password, confirmPassword }) {
      if (password.length < 6 || confirmPassword.length < 6) {
        return false;
      } else if (password !== confirmPassword) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.signup {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
}

.signup-card {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.signup-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.google-btn {
  // width: 100%;
}
</style>