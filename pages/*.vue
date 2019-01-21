<script>
/**
 * Redirect all 404s to the Create page
 *
 * source:
 * https://github.com/nuxt/nuxt.js/issues/1691
 */
export default {
  asyncData({ redirect }) {
    return redirect('/create')
  }
}
</script>
