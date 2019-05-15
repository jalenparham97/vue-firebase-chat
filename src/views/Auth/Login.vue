<template>
  <div class="login">
    <sui-segment class="login-card text-center">
      <h1 class="mb-3">Login to BizChat</h1>

      <p class="mb-5">
        Don't have an account?
        <router-link to="/signup">Sign Up</router-link>
      </p>

      <sui-form @submit.prevent="handleSubmit">
        <sui-form-field>
          <sui-input v-model="user.email" placeholder="Email" icon="mail" type="email"/>
        </sui-form-field>
        <sui-form-field>
          <sui-input v-model="user.password" placeholder="Password" icon="lock" type="password"/>
        </sui-form-field>
        <sui-button type="submit" fluid>SUBMIT</sui-button>
      </sui-form>

      <p class="mt-3">OR</p>
      <sui-button class="google-btn" fluid>LOGIN WITH GOOGLE</sui-button>
    </sui-segment>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    user: {
      email: "",
      passsword: ""
    }
  }),
  methods: {}
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

.google-btn {
}
</style>

