export function buildRenderArgs({entry, output, props, publicRoot}) {
  return ['render', entry, 'KnowledgeShare', output, `--props=${props}`,
    `--public-dir=${publicRoot}`, '--overwrite', '--log=error'];
}
