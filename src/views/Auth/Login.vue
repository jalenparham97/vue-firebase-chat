<template>
  <div class="login">
    <b-card class="login-card text-center">
      <h1 class="mb-3">Login to BizChat</h1>

      <p class="mb-5">
        Don't have an account?
        <b-link to="/signup">Sign Up</b-link>
      </p>

      <b-form class="login-form">
        <b-form-group>
          <b-form-input type="email" required placeholder="Email Address"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" required placeholder="Password"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">SUBMIT</b-button>
      </b-form>

      <p class="mt-3">OR</p>
      <b-button class="google-btn">LOGIN WITH GOOGLE</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
}

.login-card {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.google-btn {
  width: 100%;
}
</style>

