<script context="module">
    /** @type {import('@sveltejs/kit').Load} */ export function load({
        error,
        status,
    }) {
        return {
            props: {
                title: `${status}: ${error?.message}`,
            },
        };
    }
</script>

<script>
    export let title = "";
</script>

<h1>ERROR</h1>
<h1>{title}</h1>
