<template>
  <nav class="navbar bg-light">
      <div class="container justify-content-evenly">
          <router-link to="/" class="nav-link active" aria-current="page" >
          <span class="material-icons-round">home</span>
          <a class="nav-link menu" href="#">Inicio</a>
          </router-link>  
          <router-link to="/titulares" class="nav-link">
          <span class="material-icons-round"> person </span>
          <a class="nav-link menu" href="#">Titulares</a>
          </router-link>
          <router-link to="/beneficiarios" class="nav-link"> 
          <span class="material-icons-round">groups</span>
          <a class="nav-link menu" href="#">Beneficiarios</a>
          </router-link>
      </div>
  </nav>
</template>
<script>
export default {
  name: 'NavComp'
}
</script>

<style scoped>
.material-icons-round {
  color:white;
  font-size: 1.4em;
  background-color: rga(218,218,0,158);
  padding: 0.3em;
  border-radius: 50%;
  margin:0.1em
}
.navbar {
  padding-bottom: 0;
  padding-top: 0;
}

.nav-link {
  padding: 0.2rem 1rem;
}
.menu {
font-size: 14px;
font-family: Arial, Helvetica, sans-serif;
color: aliceblue; 
}
</style>