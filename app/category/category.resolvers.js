const queries = {
  categories: (root, args, { db }) => db.Category.all(),
  category: async (root, { uuid, _id }, { db }) => {
    const category = await (uuid
      ? db.Category.where("uuid", uuid).first()
      : db.Category.find(_id));
    const items = await db.Category.where("_id", category._id).items();
    return {
      ...category,
      items,
    };
  },
};

const mutations = {
  createCategory: async (root, { title }, { db, uuidV4Generator }) => {
    const uuid = uuidV4Generator.generate();
    const [{ createdAt }] = await db.Category.create({ uuid, title });

    return {
      uuid,
      title,
      createdAt,
    };
  },
  deleteCategory: (root, { uuid }, { db }) =>
    db.Category.where("uuid", uuid).delete(),
  updateCategory: async (root, args, { db }) => {
    await db.Category.where("uuid", args.uuid).update({
      title: args.title,
    });
    const { title, updatedAt } = await db.Category.where(
      "uuid",
      args.uuid
    ).first();

    return {
      title,
      updatedAt,
    };
  },
};

export { queries, mutations };
