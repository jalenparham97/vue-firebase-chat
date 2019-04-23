<template>
  <div class="signup">
    <b-card class="signup-card text-center">
      <h1 class="mb-3">Sign up for BizChat</h1>

      <p class="mb-5">
        Already have an account?
        <b-link to="/login">Login</b-link>
      </p>

      <b-form @submit.prevent="handleSubmit" class="signup-form">
        <b-form-group>
          <b-form-input v-model="user.email" type="email" required placeholder="Email Address"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="user.password" type="password" required placeholder="Password"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="confirmPassword"
            type="password"
            required
            placeholder="Confirm Password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">SUBMIT</b-button>
      </b-form>

      <p class="mt-3">OR</p>
      <b-button class="google-btn" @click="googleSignIn">SIGN UP WITH GOOGLE</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data: () => ({
    user: {
      email: "",
      password: ""
    },
    confirmPassword: ""
  }),
  methods: {
    handleSubmit() {
      console.log(this.user);
    },
    googleSignIn() {
      this.$store.dispatch("auth/googleAuth");
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
  width: 100%;
}
</style>