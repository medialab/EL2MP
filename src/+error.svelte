<script>
    import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error.message}</h1>

<p>
    <a href="/">Go back to the home page</a>
</p>