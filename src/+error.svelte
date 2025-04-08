<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    
    // Handle 301 redirects
    onMount(() => {
        if ($page.status === 301 && $page.error.location) {
            window.location.href = $page.error.location;
        }
    });
</script>

<div class="error-container">
    <div class="error-content">
        <h1>{$page.status}: {$page.error.message}</h1>
        
        {#if $page.status === 301}
            <p>Redirecting you to the new location...</p>
        {:else}
            <p>
                We're sorry, but something went wrong. Please try again or return to the home page.
            </p>
        {/if}
        
        <a href="/" class="home-link">Go back to the home page</a>
    </div>
</div>

<style>
    .error-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 2rem;
        /* The page will inherit any background from app.html */
    }
    
    .error-content {
        background: rgba(255, 255, 255, 0.9);
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 500px;
    }
    
    h1 {
        margin-top: 0;
        color: #d32f2f;
        font-size: 1.8rem;
    }
    
    p {
        margin: 1rem 0;
        line-height: 1.6;
    }
    
    .home-link {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #1976d2;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        transition: background 0.3s ease;
    }
    
    .home-link:hover {
        background: #1565c0;
    }
</style>