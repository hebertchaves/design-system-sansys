/**
 * PostCSS plugin — adds !important to every declaration inside any rule
 * whose selector starts with "#sansys-grid-inspector-root".
 *
 * This gives the inspector's Tailwind utilities higher priority than
 * Quasar/DSS !important rules (when specificity is equal, the later
 * stylesheet wins; when specificity differs, the ID-scoped !important
 * beats any plain !important from the host CSS).
 */
const plugin = () => ({
  postcssPlugin: 'postcss-important-scope',
  Rule(rule) {
    if (rule.selector && rule.selector.includes('#sansys-grid-inspector-root')) {
      rule.each((node) => {
        if (node.type === 'decl') {
          node.important = true;
        }
      });
    }
  },
});

plugin.postcss = true;
export default plugin;
