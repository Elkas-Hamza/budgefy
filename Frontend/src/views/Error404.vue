<template>
  <div
    class="min-h-screen flex items-center justify-center px-6"
    style="background:#101922; font-family:Manrope, sans-serif; color:white;"
  >
    <!-- Glow background -->
    <div class="absolute w-[500px] h-[500px] bg-[#10b981]/10 blur-[140px] rounded-full"></div>

    <!-- Main Card -->
    <div class="relative text-center max-w-2xl w-full">

      <div class="glass-panel p-10 md:p-14 rounded-2xl border border-[#1e293b] backdrop-blur-xl">

        <!-- 404 -->
        <h1 class="text-[110px] md:text-[150px] font-extrabold text-white/10 leading-none">
          404
        </h1>
        <br/>
        <br/>
        
        <!-- IMAGE CENTERED -->
        <div class="flex justify-center -mt-10 mb-6">
          <img
            src="https://images.pexels.com/photos/6289171/pexels-photo-6289171.jpeg"
            class="w-32 h-32 md:w-44 md:h-44 object-cover rounded-2xl border border-[#1e293b] shadow-lg"
          />
        </div>

        <!-- Title -->
        <h2 class="text-3xl md:text-4xl font-bold mb-3">
          Oups ! Page introuvable
        </h2>

        <!-- Subtitle -->
        <p class="text-[#94a3b8] text-sm md:text-base">
          La ressource que vous recherchez a été déplacée ou n'existe plus.
        </p>

        <!-- Button -->
        <div class="mt-8">
          <button
            class="px-6 py-3 bg-[white] text-black font-semibold rounded-lg hover:opacity-90 transition"
          >
            Retour au dashboard
          </button>
        </div>

      </div>
    </div>

  
  </div>
</template>

<script setup>
// static page
</script>
  <style>
    .glass-panel {
      background: rgba(26, 38, 50, 0.35);
      backdrop-filter: blur(14px);
    }
    </style>