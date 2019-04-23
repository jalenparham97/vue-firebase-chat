<template>
  <div class="sidebar-container">
    <div class="workspaces">
      <h1>W</h1>
    </div>
    <div class="sidebar">
      <h1>Sidebar</h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100vh;
  overflow-y: scroll;
  display: flex;
}

.sidebar {
  background: #eee;
  width: 200px;
}

.workspaces {
  display: flex;
  flex-direction: column;
  background: #000;
  color: #fff;
  width: 50px;
}
</style>

