const {
  NaniError,
  fromArray,
  iterate
} = require('nani');

function isScalar(node) {
  const {
    type,
  } = node;

  return (
    type === 'BLOCK_FOLDED' ||
    type === 'BLOCK_LITERAL' ||
    type === 'PLAIN' ||
    type === 'QUOTE_DOUBLE' ||
    type === 'QUOTE_SINGLE'
  );
}

const colorsTransformer = (node, doc, map) => {
  // If the value is a quoted string, don't try to look it up anywhere.
  if (node.type === 'QUOTE_DOUBLE' ||
    node.type === 'QUOTE_SINGLE') {
    return identityTransformer(node);
  }

  const key = String(node.value);
  const keys = ['settings', 'colors', ...key.split('.')];

  const value = doc.getIn(keys);
  if (value === undefined) {
    throw map.errorForRange(
      `Could not resolve '${key}' in settings.colors`,
      node.range
    );
  }

  return value;
};

const identityTransformer = (node) => node.value;

function getScalarVisitor(path) {
  // You are here: ['settings', 'colors', ...]
  if (path.length > 2 && path[0] === 'settings' && path[1] === 'colors') {
    return colorsTransformer;
  }

  return identityTransformer;
}

function transform(parsed) {
  const map = parsed.map;
  const node = parsed.ast.contents;

  if (node.type !== 'MAP') {
    throw new NaniError('Root document not a YAML map');
  }

  const errors = [];

  const data = createDataObject(node, []);

  if (errors.length > 0) {
		const multiError = fromArray(errors);
		if (typeof multiError === 'object') {
			for (const err of iterate(multiError)) {
				// eslint-disable-next-line no-console
				console.error(err.message);
			}
			throw new NaniError('Failed to transform design tokens');
		} else {
			throw multiError;
		}
	}

  return {
    ...parsed,
    data,
  };

  function createDataObject(node, path) {
    if (isScalar(node)) {
      const visitor = getScalarVisitor(path);
      try {
        return visitor(node, parsed.ast, map);
      } catch (error) {
        if (!errors.some((err) => err.message === error.message)) {
					errors.push(error);
				}
				return node.value;
      }
    }

    if (node.type === 'MAP') {
      const data = Object.create(null);

      for (const item of node.items) {
        if (item.type !== 'PAIR') {
          errors.push(
            map.errorForRange(
              `Can't handle non-pair '${item.type}'`,
              item.range
            )
          );

          continue;
        }

        const keyNode = item.key;
        if (!isScalar(keyNode)) {
          errors.push(
            map.errorForRange(
              `Can't handle complex key of type '${keyNode.type}'`,
              keyNode.range
            )
          );

          continue;
        }

        const key = String(keyNode.value);

        data[key] = createDataObject(item.value, [...path, key]);
      }

      return data;
    }

    if (node.type === 'SEQ') {
      const data = [];

      for (const [index, item] of node.items.entries()) {
        data.push(createDataObject(item, [...path, index]));
      }

      return data;
    }

    errors.push(
      map.errorForRange(
        `Can't handle YAML node of type '${node.type}'`,
        node.range
      )
    );
  }
}

module.exports = transform;
