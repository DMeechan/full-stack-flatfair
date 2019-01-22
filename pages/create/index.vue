<script>
/**
 * Redirect all 404s to the Create page with a config_id of 1
 *
 * source:
 * https://github.com/nuxt/nuxt.js/issues/1691
 */
export default {
  asyncData({ redirect }) {
    return redirect('/create/1')
  }
}
</script>
