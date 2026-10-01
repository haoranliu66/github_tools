export function buildRenderArgs({entry, output, props, publicRoot}) {
  return ['render', entry, 'KnowledgeShare', output, `--props=${props}`,
    `--public-dir=${publicRoot}`, '--overwrite', '--concurrency=2', '--log=error'];
}
