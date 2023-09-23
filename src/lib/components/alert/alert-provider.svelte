<script lang="ts">
  import { flip } from "svelte/animate"
  import { fly } from "svelte/transition"
  import Alert from "./alert.svelte"

  import { alerts } from "./alert"

  const { notifications } = alerts
</script>

<div id="alert-provider" class="alert">
  {#each $notifications as alert (alert.id)}
    <div
      animate:flip
      transition:fly={{ y: 30 }}
      class="toast"
    >
      <Alert alert={alert} />
    </div>
  {/each}
</div>

<style>
  #alert-provider {
      position: fixed;
      top: 10px;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      pointer-events: none;
  }

  .toast {
      flex: 0 0 auto;
      margin-bottom: 10px;
  }
</style>
