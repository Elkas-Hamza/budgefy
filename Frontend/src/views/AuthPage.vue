<script setup>
import { computed, onBeforeUnmount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "../composables/useToast";

const router = useRouter();
const { showToast } = useToast();

const mode = ref("login");
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const forgotPasswordModalOpen = ref(false);
const forgotPasswordLoading = ref(false);
const forgotPasswordMessage = ref("");
const forgotPasswordError = ref("");
const forgotPasswordEmail = ref("");
const resendCooldownSeconds = ref(0);
const resendCooldownTimerId = ref(null);

const form = reactive({
  name: "",
  email: "",
  password: "",
  remember: true,
});

const registerImageFile = ref(null);

const submitLabel = computed(() => {
  return mode.value === "login" ? "Se connecter" : "Creer un compte";
});

const submitEndpoint = computed(() => {
  return mode.value === "login" ? "/api/auth/login" : "/api/auth/register";
});

const resendCooldownLabel = computed(() => {
  const minutes = Math.floor(resendCooldownSeconds.value / 60);
  const seconds = resendCooldownSeconds.value % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

const switchMode = (nextMode) => {
  mode.value = nextMode;
  errorMessage.value = "";
  successMessage.value = "";
};

const extractErrorMessage = (payload) => {
  if (!payload) {
    return "Une erreur est survenue.";
  }

  if (payload.errors) {
    const firstFieldErrors = Object.values(payload.errors)[0];

    if (Array.isArray(firstFieldErrors) && firstFieldErrors.length > 0) {
      return String(firstFieldErrors[0]);
    }
  }

  return payload.message ?? "Une erreur est survenue.";
};

const apiBaseUrl = () => {
  return (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
};

const clearResendCooldownTimer = () => {
  if (resendCooldownTimerId.value) {
    clearInterval(resendCooldownTimerId.value);
    resendCooldownTimerId.value = null;
  }
};

const startResendCooldown = (minutes) => {
  clearResendCooldownTimer();

  resendCooldownSeconds.value = Math.max(0, Math.floor(minutes * 60));

  if (resendCooldownSeconds.value === 0) {
    return;
  }

  resendCooldownTimerId.value = setInterval(() => {
    if (resendCooldownSeconds.value <= 1) {
      resendCooldownSeconds.value = 0;
      clearResendCooldownTimer();

      return;
    }

    resendCooldownSeconds.value -= 1;
  }, 1000);
};

const submitAuth = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  isLoading.value = true;

  const endpointUrl = `${apiBaseUrl()}${submitEndpoint.value}`;

  try {
    const requestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    };

    if (mode.value === "register") {
      const body = new FormData();
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("password", form.password);

      if (registerImageFile.value) {
        body.append("image", registerImageFile.value);
      }

      requestInit.body = body;
    } else {
      requestInit.headers["Content-Type"] = "application/json";
      requestInit.body = JSON.stringify({
        email: form.email,
        password: form.password,
        remember: form.remember,
      });
    }

    const response = await fetch(endpointUrl, requestInit);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(extractErrorMessage(data));
    }

    if (data?.token) {
      localStorage.setItem("auth_token", data.token);
    }

    if (data?.user) {
      localStorage.setItem("auth_user", JSON.stringify(data.user));
    }

    successMessage.value =
      mode.value === "login"
        ? "Connexion reussie. Redirection..."
        : "Compte cree avec succes. Redirection...";
    showToast(successMessage.value);

    await router.push("/dashboard");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Une erreur est survenue.";
    errorMessage.value = message;
    showToast(message, "error");
  } finally {
    isLoading.value = false;
  }
};

const socialNotImplemented = () => {
  const message = "Connexion sociale non implementee pour le moment.";
  errorMessage.value = message;
  showToast(message, "error");
};

const openForgotPasswordModal = () => {
  forgotPasswordModalOpen.value = true;
  forgotPasswordMessage.value = "";
  forgotPasswordError.value = "";
  forgotPasswordEmail.value = form.email;
};


const closeForgotPasswordModal = () => {
  forgotPasswordModalOpen.value = false;
  forgotPasswordMessage.value = "";
  forgotPasswordError.value = "";
};

const requestResetCode = async () => {
  if (forgotPasswordLoading.value || resendCooldownSeconds.value > 0) {
    return;
  }

  forgotPasswordMessage.value = "";
  forgotPasswordError.value = "";
  forgotPasswordLoading.value = true;

  try {
    const response = await fetch(`${apiBaseUrl()}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: forgotPasswordEmail.value,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 429) {
        const retryAfterMinutes = Number(data?.retry_after_minutes ?? 10);
        startResendCooldown(retryAfterMinutes);
      }

      throw new Error(extractErrorMessage(data));
    }

    forgotPasswordMessage.value = data?.message ?? "Code envoye par email.";
    showToast(forgotPasswordMessage.value);
    startResendCooldown(10);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Une erreur est survenue.";
    forgotPasswordError.value = message;
    showToast(message, "error");
  } finally {
    forgotPasswordLoading.value = false;
  }
};

const onRegisterImageChange = (event) => {
  registerImageFile.value = event?.target?.files?.[0] ?? null;
};

onBeforeUnmount(() => {
  clearResendCooldownTimer();
});

const dark_light = window.dark_light;
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-10 py-4 bg-background-light dark:bg-background-dark z-10"
    >
      <div class="flex items-center gap-3">
        <div class="text-primary flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl"
            >account_balance_wallet</span
          >
        </div>
        <h2
          class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]"
        >
          Budgefy
        </h2>
      </div>
      <div class="flex items-center gap-6">
        <div class="hidden md:flex items-center gap-8">
          <a
            class="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
            href="#"
            >Aide</a
          >
          <router-link
            class="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
            to="/"
            > <span> Home page</span>
          </router-link>
          <button @click="dark_light()"
  class="flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
  <span class="material-symbols-outlined dark:hidden">dark_mode</span>
  <span class="material-symbols-outlined hidden dark:block">light_mode</span>
</button>
        </div>
        <router-link
          class="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all"
          to="/login"
        >
          Se connecter
        </router-link>
      </div>
    </header>

    <main class="flex-1 flex items-stretch overflow-hidden">
      <div
        class="hidden lg:flex lg:w-1/2 flex-col justify-center items-center relative overflow-hidden bg-slate-100 dark:bg-slate-900 px-12"
      >
        <div
          class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        >
          <div
            class="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary rounded-full blur-[100px]"
          ></div>
          <div
            class="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full blur-[100px]"
          ></div>
        </div>
        <div class="relative z-10 max-w-xl text-center">
          <div
            class="mb-8 inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl"
          >
            <span class="material-symbols-outlined text-primary text-6xl"
              >insights</span
            >
          </div>
          <h1
            class="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-6"
          >
            Prenez le controle de vos finances
          </h1>
          <p
            class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8"
          >
            Gerez vos revenus, suivez vos depenses et atteignez vos objectifs
            financiers avec notre outil de gestion budgetaire personnelle.
          </p>
          <div class="grid grid-cols-2 gap-4 text-left">
            <div
              class="p-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <span class="material-symbols-outlined text-primary mb-2"
                >trending_up</span
              >
              <h3 class="font-bold text-slate-900 dark:text-white text-sm">
                Suivi de croissance
              </h3>
            </div>
            <div
              class="p-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <span class="material-symbols-outlined text-primary mb-2"
                >security</span
              >
              <h3 class="font-bold text-slate-900 dark:text-white text-sm">
                Donnees securisees
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div
        class="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 bg-background-light dark:bg-background-dark"
      >
        <div class="w-full max-w-md space-y-8">
          <div class="text-center lg:text-left">
            <h2
              class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2"
            >
              Bienvenue sur BudgetMaster
            </h2>
            <p class="text-slate-600 dark:text-slate-400">
              Gerez votre argent intelligemment.
            </p>
          </div>

          <div class="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl">
            <button
              :class="
                mode === 'login'
                  ? 'bg-white dark:bg-background-dark text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              "
              class="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all"
              type="button"
              @click="switchMode('login')"
            >
              Connexion
            </button>
            <button
              :class="
                mode === 'register'
                  ? 'bg-white dark:bg-background-dark text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              "
              class="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all"
              type="button"
              @click="switchMode('register')"
            >
              Inscription
            </button>
          </div>

          <form class="space-y-5" @submit.prevent="submitAuth">
            <div v-if="mode === 'register'">
              <label
                class="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-200"
                >Nom complet</label
              >
              <div class="relative">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >person</span
                >
                <input
                  v-model="form.name"
                  class="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                  placeholder="Jean Dupont"
                  required
                  type="text"
                />
              </div>
            </div>

            <div v-if="mode === 'register'">
              <label
                class="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-200"
                >Photo de profil</label
              >
              <div class="relative">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >image</span
                >
                <input
                  class="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  @change="onRegisterImageChange"
                />
              </div>
              <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Optionnel. Formats acceptes: PNG, JPG, JPEG, WEBP. Taille max: 4MB.
              </p>
            </div>

            <div>
              <label
                class="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-200"
                >Adresse e-mail</label
              >
              <div class="relative">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >mail</span
                >
                <input
                  v-model="form.email"
                  class="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                  placeholder="exemple@email.com"
                  required
                  type="email"
                />
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-2">
                <label
                  class="text-sm font-medium text-slate-900 dark:text-slate-200"
                  >Mot de passe</label
                >
                <button
                  v-if="mode === 'login'"
                  class="text-xs text-primary font-semibold hover:underline"
                  type="button"
                  @click="openForgotPasswordModal"
                  >Mot de passe oublie ?</button
                >
              </div>
              <div class="relative">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >lock</span
                >
                <input
                  v-model="form.password"
                  class="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white transition-all"
                  minlength="8"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </div>
            </div>

            <div v-if="mode === 'login'" class="flex items-center gap-2 py-2">
              <input
                id="remember"
                v-model="form.remember"
                class="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-white dark:bg-slate-900"
                type="checkbox"
              />
              <label
                class="text-sm text-slate-600 dark:text-slate-400"
                for="remember"
                >Se souvenir de moi</label
              >
            </div>

            <p v-if="errorMessage" class="text-sm text-red-400">
              {{ errorMessage }}
            </p>
            <p v-if="successMessage" class="text-sm text-emerald-400">
              {{ successMessage }}
            </p>

            <button
              :disabled="isLoading"
              class="w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              type="submit"
            >
              {{ isLoading ? "Veuillez patienter..." : submitLabel }}
            </button>

          </form>

          <div class="relative flex items-center py-4">
            <div
              class="flex-grow border-t border-slate-200 dark:border-slate-800"
            ></div>
            <span
              class="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase tracking-widest"
              >Ou continuer avec</span
            >
            <div
              class="flex-grow border-t border-slate-200 dark:border-slate-800"
            ></div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              class="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              type="button"
              @click="socialNotImplemented"
            >
              <span class="text-sm font-semibold text-slate-900 dark:text-white"
                >Google</span
              >
            </button>
            <button
              class="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              type="button"
              @click="socialNotImplemented"
            >
              <span class="text-sm font-semibold text-slate-900 dark:text-white"
                >Apple</span
              >
            </button>
          </div>

          <p
            class="text-center text-sm text-slate-500 dark:text-slate-400 mt-10"
          >
            En continuant, vous acceptez nos
            <a class="text-primary hover:underline" href="#"
              >Conditions d'utilisation</a
            >
            et notre
            <a class="text-primary hover:underline" href="#"
              >Politique de confidentialite</a
            >.
          </p>
        </div>
      </div>
    </main>

    <div
      v-if="forgotPasswordModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
      @click.self="closeForgotPasswordModal"
    >
      <div
        class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              Reinitialiser le mot de passe
            </h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Un code a 6 chiffres sera envoye et valable 10 minutes.
            </p>
          </div>
          <button
            type="button"
            class="rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            @click="closeForgotPasswordModal"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <label class="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-200"
          >Adresse e-mail</label
        >
        <input
          v-model="forgotPasswordEmail"
          type="email"
          placeholder="exemple@email.com"
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-950 dark:text-white"
        />

        <p v-if="forgotPasswordError" class="mt-3 text-sm text-red-400">
          {{ forgotPasswordError }}
        </p>
        <p v-if="forgotPasswordMessage" class="mt-3 text-sm text-emerald-400">
          {{ forgotPasswordMessage }}
        </p>

        <button
          type="button"
          :disabled="forgotPasswordLoading || resendCooldownSeconds > 0"
          class="mt-5 w-full rounded-xl bg-primary py-3 font-bold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          @click="requestResetCode"
        >
          <span v-if="forgotPasswordLoading">Envoi en cours...</span>
          <span v-else-if="resendCooldownSeconds > 0">
            Renvoyer dans {{ resendCooldownLabel }}
          </span>
          <span v-else>Envoyer le code</span>
        </button>
      </div>
    </div>

    <footer
      class="py-6 border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark"
    >
      <div
        class="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-slate-500 dark:text-slate-500 text-sm">
          © 2026 Gestion Budgetaire Personnelle. Tous droits reserves.
        </p>
        <div class="flex gap-6">
          <a
            class="text-slate-500 hover:text-primary transition-colors"
            href="#"
            ><span class="material-symbols-outlined text-xl">language</span></a
          >
          <a
            class="text-slate-500 hover:text-primary transition-colors text-sm font-medium"
            href="#"
            >Francais (FR)</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>
