<template>
  <div class="signup">
    <sui-segment class="signup-card text-center">
      <h1 class="mb-3">Sign up for BizChat</h1>

      <p class="mb-5">
        Already have an account?
        <router-link to="/login" id="login-link">Login</router-link>
      </p>

      <sui-message v-if="error" header="Retry signing up" :content="error.message" warning/>

      <sui-form @submit.prevent="handleSubmit">
        <sui-form-field :class="getValidationClass('displayName')">
          <sui-input
            v-model="user.displayName"
            placeholder="Display Name"
            icon="user"
            type="text"
            name="displayName"
          />
          <span v-if="!$v.user.displayName.required && submitForm">Your display name is required</span>
        </sui-form-field>
        <sui-form-field :class="getValidationClass('email')">
          <sui-input v-model="user.email" placeholder="Email" icon="mail" name="email" type="text"/>
          <span v-if="!$v.user.email.required && submitForm">The email is required</span>
          <span v-if="!$v.user.email && submitForm">Invalid email</span>
        </sui-form-field>
        <sui-form-field :class="getValidationClass('password')">
          <sui-input
            v-model="user.password"
            placeholder="Password"
            icon="lock"
            type="password"
            name="password"
          />
          <span v-if="!$v.user.password.required && submitForm">The password is required</span>
          <span
            v-else-if="!$v.user.password.minLength && submitForm"
          >Password must be between 6 and 20 charaters</span>
        </sui-form-field>
        <sui-form-field :class="confirmPassword !== user.password ? 'field error' : ''">
          <sui-input
            v-model="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            name="verifyPassword"
          />
          <span v-if="confirmPassword !== user.password">Passwords do not match</span>
        </sui-form-field>
        <sui-button type="submit" fluid>SUBMIT</sui-button>
      </sui-form>

      <p class="mt-3">OR</p>
      <sui-button class="google-btn" @click="googleSignIn" fluid>SIGN UP WITH GOOGLE</sui-button>
    </sui-segment>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  name: "Signup",
  mixins: [validationMixin],
  data: () => ({
    user: {
      displayName: "",
      email: "",
      password: ""
    },
    confirmPassword: "",
    submitForm: false,
    visible: true,
    authError: null
  }),
  validations: {
    user: {
      displayName: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      }
    }
  },
  computed: {
    ...mapGetters("auth", ["error"])
  },
  methods: {
    handleDismiss() {
      this.visible = false;
      this.authError = null;
    },
    getValidationClass(fieldName) {
      const field = this.$v.user[fieldName];
      if (field) {
        return {
          "field error": field.$invalid && field.$dirty
        };
      }
    },
    handleSubmit() {
      this.submitForm = true;
      this.$v.$touch();
      if (this.confirmPassword === this.user.password) {
        if (!this.$v.$invalid) {
          this.$store.dispatch("auth/signUpWithEmail", this.user);
          // this.submitForm = false;
        } else {
          this.submitForm = true;
        }
      }
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
  // width: 100%;
}
</style>