<style scoped>
/* Títulos compactos y "arquitectónicos" */
.identity{
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.brand{
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

svg {
  width: clamp(180px, 20vw, 300px);
  height: clamp(80px, 10vw, 100px);
  transition: color 0.3s ease;
}

</style>

<template>
  <div class="identity">
    <router-link class="brand" to="/">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <circle cx="256" cy="256" r="256" fill="#0A1128"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
          font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="96px">
          <tspan fill="#f55139" class="neon">//</tspan><tspan fill="#F4F4F9">ACMA</tspan>
        </text>
      </svg>
    </router-link>
  </div>


</template>

