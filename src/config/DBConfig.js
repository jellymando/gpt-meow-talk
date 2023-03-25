export const DBConfig = {
  name: "ChatDB",
  version: 2,
  objectStoresMeta: [
    {
      store: "messages",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "role", keypath: "role", options: { unique: false } },
        { name: "content", keypath: "content", options: { unique: false } }
      ]
    }
  ]
};
