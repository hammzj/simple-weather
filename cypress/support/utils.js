exports.clone = (original) =>
    Object.assign(Object.create(Object.getPrototypeOf(original)), original);
